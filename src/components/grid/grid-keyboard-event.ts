import { isEndKey, isHomeKey } from "../../utils/helpers";


export type KeyboardEventAssociatedAction = FocusCell | SelectRow;


// Up Arrow : cellule d'en haut
// Down Arrow : cellule d'en bas
// Left Arrow : cellule à gauche
// Right Arrow : cellule à droite

// Home : première cellule de la ligne
// End : dernière cellule de la ligne

// Ctrl + Home : première cellule du TABLEAU
// Ctrl + End : dernière cellule du TABLEAU

// SI SELECTION MULTIPLE OU SINGLE :
// Shift + Espace : sélectionne la ligne courante (cocher)

// SI SELECTION MULTIPLE
// Ctrl + A : select all lines (cocher)

type FocusCell = {kind: 'FocusCell', target: 'up' | 'down' | 'left' | 'right' | 'first_of_row' | 'last_of_row' | 'first_of_grid' | 'last_of_grid'};
type SelectRow = {kind: 'SelectRow', target: 'one' | 'all'}

type GridKeyboardShortcutDirectional = 'DOWN_ARROW' | 'UP_ARROW' | 'LEFT_ARROW' | 'RIGHT_ARROW';
type GridKeyboardShortcutOthers = 'HOME' | 'END';
type GridKeyboardShortcutMaj = 'MAJ+SPACE';
type GridKeyboardShortcutCtrl = 'CTRL+A' | 'CTRL+HOME' | 'CTRL+END';


type GridKeyboardShortcut = GridKeyboardShortcutDirectional | GridKeyboardShortcutOthers | GridKeyboardShortcutMaj | GridKeyboardShortcutCtrl | 'UNKNOWN';

/**
 * We follow this https://www.w3.org/WAI/ARIA/apg/patterns/grid/
 * @param event
 * @param currentState
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
    }

    return [];
}

/**
 * Convert a {@link KeyboardEvent} into a {@link GridKeyboardShortcut}
 * @param event - KeyboardEvent
 * @returns The corresponding `GridKeyboardShortcut`
 */
function keyboardShortcutFromKeyboardEvent(event: KeyboardEvent): GridKeyboardShortcut {
    const { key } = event;

    if (event.shiftKey) {
        switch (key) {
            case 'Space':
                return 'MAJ+SPACE';
        }
    } // Pas de else ?

    if (event.ctrlKey) {
        if(isHomeKey(event)) {
            return 'CTRL+HOME';
        } else if(isEndKey(event)) {
            return 'CTRL+END';
        } else if (key === 'a') {
            return 'CTRL+A';
        }
    } else {
        switch (key) {
            case 'ArrowDown':
                return 'DOWN_ARROW';
            case 'ArrowUp':
                return 'UP_ARROW';
            case 'ArrowLeft':
                return 'LEFT_ARROW';
            case 'ArrowRight':
                return 'RIGHT_ARROW';
        }

        if(isHomeKey(event)) {
            return 'HOME';
        } else if (isEndKey(event)) {
            return 'END';
        }
    }

    return 'UNKNOWN';
}
