import { keyboardShortcutFromKeyboardEvent } from "../../utils/keyboard-event";

// Possible Shortcuts

// Dropdown button
// ENTER : open menu, move focus to first item
// SPACE : open menu, move focus to first item
// DOWN_ARROW : open menu, move focus to first item
// UP_ARROW : open menu, move focus to last item

// Dropdown item
// HOME : focus first item
// END : focus last item
// UP_ARROW : move focus to previous item
// DOWN_ARROW : move focus to previous item
// ESCAPE : close menu, set focus on the dropdown button
// ENTER : activate the item, close menu, set focus to menu button (already handled via the wcsDropdownItemClick event)

export type KeyboardEventAssociatedAction = OpenMenu
    | CloseMenu
    | ClearFocus
    | FocusItem;

type OpenMenu = {kind: 'OpenMenu'};
type CloseMenu = {kind: 'CloseMenu'};


type ClearFocus = {kind: 'ClearFocus'};
type FocusItem = {kind: 'FocusItem', target: 'next' | 'previous' | 'first' | 'last'};

/**
 * We follow this pattern https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions/
 * @param event
 * @param currentState
 * @param type
 */
export function getActionForKeyboardEvent(event: KeyboardEvent, currentState: 'closed' | 'opened'): KeyboardEventAssociatedAction[] {
    const keyboardShortcut = keyboardShortcutFromKeyboardEvent(event);

    if(keyboardShortcut === 'UNKNOWN') {
        return [];
    }

    switch (currentState) {
        case 'closed':
            // We handle every available shortcut for the closed state
            switch (keyboardShortcut) {
                case 'UP_ARROW':
                    return [{kind: 'OpenMenu'}, {kind: 'FocusItem', target: 'last'}];
                case 'DOWN_ARROW':
                    return [{kind: 'OpenMenu'}, {kind: 'FocusItem', target: 'first'}];
                case 'SPACE':
                case 'ENTER':
                    return [{kind: 'OpenMenu'}, {kind: 'FocusItem', target: 'first'}];
                default:
                    break;
            }
            break;
        case 'opened':
            // We handle every available shortcut for the opened state
            switch (keyboardShortcut) {
                case 'UP_ARROW':
                    return [{kind: 'FocusItem', target: 'previous'}];
                case 'DOWN_ARROW':
                    return [{kind: 'FocusItem', target: 'next'}];
                case 'HOME':
                    return [{kind: 'FocusItem', target: 'first'}];
                case 'END':
                    return [{kind: 'FocusItem', target: 'last'}];
                case 'ESCAPE':
                case 'MAJ+TAB':
                case 'TAB':
                    return [{kind: 'CloseMenu'}];
                default:
                    break;
            }
            break;
        default:
            throw Error('Unknown error');
    }
    return [];
}
