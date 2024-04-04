import { keyboardShortcutFromKeyboardEvent } from "../../utils/keyboard-event";


export type KeyboardEventAssociatedAction = FocusCell | SelectRow;

// Possibles Shortcut
// UP_ARROW : focus cell up
// DOWN_ARROW : focus cell down
// LEFT_ARROW : focus cell left
// RIGHT_ARROW : focus cell right

// HOME : focus first cell of the row
// END : focus last cell of the row

// CTRL+HOME : focus first cell of the grid
// CTRL+END : focus first cell of the grid

// IF SELECTION MULTIPLE OR SINGLE :
// MAJ+SPACE : select (check) the current row

// IF SELECTION MULTIPLE
// CTRL+A : select (check) all rows

type FocusCell = {kind: 'FocusCell', target: 'up' | 'down' | 'left' | 'right' | 'first_of_row' | 'last_of_row' | 'first_of_grid' | 'last_of_grid'};
type SelectRow = {kind: 'SelectRow', target: 'one' | 'all'}

/**
 * We follow this https://www.w3.org/WAI/ARIA/apg/patterns/grid/
 * @param event
 * @param type
 */
export function getActionForKeyboardEvent(event: KeyboardEvent, type: 'grid_no_selection' | 'grid_selection_single' | 'grid_selection_multiple'): KeyboardEventAssociatedAction[] {
    const keyboardShortcut = keyboardShortcutFromKeyboardEvent(event);

    if(keyboardShortcut === 'UNKNOWN') {
        return [];
    }

    switch (keyboardShortcut) {
        case "UP_ARROW":
            return [{kind: 'FocusCell', target: 'up'}];
        case "DOWN_ARROW":
            return [{kind: 'FocusCell', target: 'down'}];
        case "LEFT_ARROW":
            return [{kind: 'FocusCell', target: 'left'}];
        case "RIGHT_ARROW":
            return [{kind: 'FocusCell', target: 'right'}];
        case "HOME":
            return [{kind: 'FocusCell', target: 'first_of_row'}];
        case "END":
            return [{kind: 'FocusCell', target: 'last_of_row'}];
        case "MAJ+SPACE":
            switch (type) {
                case "grid_selection_single":
                case "grid_selection_multiple":
                    return [{kind: 'SelectRow', target: 'one'}];
                case "grid_no_selection":
                    break;
            }
            break;
        case "CTRL+A":
            switch (type) {
                case "grid_selection_multiple":
                    return [{kind: 'SelectRow', target: 'all'}];
                case "grid_selection_single":
                case "grid_no_selection":
                    break;
            }
            break;
        case "CTRL+HOME":
            return [{kind: 'FocusCell', target: 'first_of_grid'}];
        case "CTRL+END":
            return [{kind: 'FocusCell', target: 'last_of_grid'}];
        default:
            break;
    }

    return [];
}
