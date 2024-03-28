import {
    isEndKey,
    isEnterKey, isEscapeKey,
    isHomeKey, isPageDownKey, isPageUpKey,
    isSpaceKey, isTabKey,
} from '../../utils/helpers';

export type KeyboardEventAssociatedAction = OpenSelect
    | CloseSelect
    | ClearAutocompleteInput
    | ClearHighlight
    | HighlightOption
    | FocusOption
    | MoveFocus
    | SelectOption;

type OpenSelect = {kind: 'OpenSelect'};
type CloseSelect = {kind: 'CloseSelect', shouldBlur: boolean};

type ClearAutocompleteInput = {kind: 'ClearAutocompleteInput'};

type ClearHighlight = {kind: 'ClearHighlight'};
type HighlightOption = {kind: 'HighlightOption', target: 'next' | 'previous' | 'first' | 'last'};

type SelectOption = {kind: 'SelectOption', target: 'next' | 'previous' | 'first' | 'last' | 'lastHighlighted'};

type MoveFocus = {kind: 'MoveFocus', target: 'previous'};

type FocusOption = {kind: 'FocusOption', target: 'next' | 'previous' | 'first' | 'last' | 'lastFocused'};

type SelectKeyboardShortcutAlt = 'ALT+DOWN_ARROW' | 'ALT+UP_ARROW';
type SelectKeyboardShortcutMaj = 'MAJ+TAB';
type SelectKeyboardShortcutDirectional = 'DOWN_ARROW' | 'UP_ARROW' | 'LEFT_ARROW' | 'RIGHT_ARROW';
type SelectKeyboardShortcutOthers = 'HOME' | 'END' | 'PAGE_UP' | 'PAGE_DOWN' | 'ENTER' | 'SPACE' | 'TAB' | 'ESCAPE';

type SelectKeyboardShortcut = SelectKeyboardShortcutAlt | SelectKeyboardShortcutMaj | SelectKeyboardShortcutDirectional | SelectKeyboardShortcutOthers | 'UNKNOWN';

/**
 * We follow this https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
 * @param event
 * @param currentState
 * @param type
 */
export function getActionForKeyboardEvent(event: KeyboardEvent, currentState: 'closed' | 'opened', type: 'autocomplete_unique' | 'autocomplete_multiple' | 'unique' | 'multiple'): KeyboardEventAssociatedAction[] {
    const keyboardShortcut = keyboardShortcutFromKeyboardEvent(event);

    if(keyboardShortcut === 'UNKNOWN') {
        return [];
    }

    switch (currentState) {
        case "closed":
            // We handle every available shortcut for the closed state
            switch (keyboardShortcut) {
                case "MAJ+TAB":
                    switch (type) {
                        case "unique":
                        case "multiple":
                            return [];
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            // We need to move focus to previous focusable element in order to ignore the wcs-select component
                            return [{kind: 'MoveFocus', target: 'previous'}];
                        default:
                            break;
                    }
                    break;
                case 'DOWN_ARROW':
                    switch (type) {
                        case "unique":
                            return [{kind: 'SelectOption', target: 'next'}];
                        case "autocomplete_multiple":
                        case "autocomplete_unique":
                            return [{kind: 'OpenSelect'}, {kind: 'HighlightOption', target: 'first'}];
                        case "multiple":
                            return [{kind: 'OpenSelect'}, {kind: 'FocusOption', target: 'first'}];
                        default:
                            break;
                    }
                    break;
                case 'RIGHT_ARROW':
                    switch (type) {
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            // Do nothing, we navigate between characters inside input field
                            return [];
                        case "unique":
                            return [{kind: 'SelectOption', target: 'next'}];
                        case "multiple":
                            return [{kind: 'OpenSelect'}, {kind: 'FocusOption', target: 'first'}];
                        default:
                            break;
                    }
                    break;
                case 'UP_ARROW':
                    switch (type) {
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            return [{kind: 'OpenSelect'}, {kind: 'HighlightOption', target: 'last'}];
                        case "multiple":
                            break;
                        case "unique":
                            return [{kind: 'SelectOption', target: 'previous'}];
                        default:
                            break;
                    }
                    break;
                case 'LEFT_ARROW':
                    switch (type) {
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            // Do nothing, we navigate between characters inside input field
                            return [];
                        case "unique":
                            return [{kind: 'SelectOption', target: 'previous'}];
                        case "multiple":
                            break;
                        default:
                            break;
                    }
                    break;
                case 'ALT+DOWN_ARROW':
                case 'ALT+UP_ARROW':
                    switch (type) {
                        case "unique":
                            return [{kind: 'OpenSelect'}, {kind: 'FocusOption', target: 'first'}]
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                        case "multiple":
                            return [{kind: 'OpenSelect'}];
                        default:
                            break;
                    }
                    break;
                case 'SPACE':
                case 'ENTER':
                    switch (type) {
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            return [];
                        case "unique":
                        case "multiple":
                            return [{kind: 'OpenSelect'}, {kind: 'FocusOption', target: 'lastFocused'}];
                        default:
                            break;
                    }
                    break;
                case 'ESCAPE':
                    switch (type) {
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            return [{kind: 'ClearAutocompleteInput'}];
                        case 'unique':
                        case 'multiple':
                            return [];
                        default:
                            break;
                    }
                    break;
                case 'PAGE_UP':
                    switch (type) {
                        case "autocomplete_unique":
                            return [];
                        case "autocomplete_multiple":
                            return [];
                        case "unique":
                            return [{kind: 'SelectOption', target: 'first'}];
                        case "multiple":
                            return [];
                        default:
                            break;
                    }
                    break;
                case 'PAGE_DOWN':
                    switch (type) {
                        case "autocomplete_unique":
                            return [];
                        case "autocomplete_multiple":
                            return [];
                        case "unique":
                            return [{kind: 'SelectOption', target: 'last'}];
                        case "multiple":
                            return [];
                        default:
                            break;
                    }
                    break;
            }
            break;
        case 'opened':
            // We handle every available shortcut for the opened state
            switch (keyboardShortcut) {
                case 'ESCAPE':
                    switch (type) {
                        case 'unique':
                        case 'multiple':
                        case 'autocomplete_unique':
                        case 'autocomplete_multiple':
                            return [{kind: 'CloseSelect', shouldBlur: false}];
                        default:
                            break;
                    }
                    break;
                case 'ALT+UP_ARROW':
                    switch (type) {
                        case 'unique':
                        case 'multiple':
                            return [{kind: 'CloseSelect', shouldBlur: false}];
                        case 'autocomplete_unique':
                        case 'autocomplete_multiple':
                            // We must keep select autocomplete opened
                            return [];
                        default:
                            break;
                    }
                    break;
                case 'TAB':
                    switch (type) {
                        case "autocomplete_unique":
                            return [{kind: 'SelectOption', target: 'lastHighlighted'}, {kind: 'CloseSelect', shouldBlur: false}];
                        case "autocomplete_multiple":
                            return [{kind: 'CloseSelect', shouldBlur: false}];
                        case "unique":
                        case "multiple":
                            return [{kind: 'CloseSelect', shouldBlur: true}];
                        default:
                            break;
                    }
                    break;
                case 'MAJ+TAB':
                    switch (type) {
                        case "autocomplete_unique":
                            // We don't blur the select when we close it because we move the focus manually just after closing it.
                            return [{kind: 'SelectOption', target: 'lastHighlighted'}, {kind: 'CloseSelect', shouldBlur: false}, {kind: 'MoveFocus', target: 'previous'}];
                        case "autocomplete_multiple":
                            // We don't blur the select when we close it because we move the focus manually just after closing it.
                            return [{kind: 'CloseSelect', shouldBlur: false}, {kind: 'MoveFocus', target: 'previous'}];
                        case "unique":
                        case "multiple":
                            return [{kind: 'CloseSelect', shouldBlur: true}];
                        default:
                            break;
                    }
                    break;
                case 'UP_ARROW':
                    switch (type) {
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            return [{kind: 'HighlightOption', target: 'previous'}]
                        case "unique":
                        case "multiple":
                            return [{kind: 'FocusOption', target: 'previous'}];
                        default:
                            break;
                    }
                    break;
                case 'LEFT_ARROW':
                    switch (type) {
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            // We do nothing (navigate between characters in input field)
                            return [];
                        case "unique":
                        case "multiple":
                            return [{kind: 'FocusOption', target: 'previous'}];
                        default:
                            break;
                    }
                    break;
                case 'DOWN_ARROW':
                    switch (type) {
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            return [{kind: 'HighlightOption', target: 'next'}]
                        case "unique":
                        case "multiple":
                            return [{kind: 'FocusOption', target: 'next'}];
                        default:
                            break;
                    }
                    break;
                case 'RIGHT_ARROW':
                    switch (type) {
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            // We do nothing (navigate between characters in input field)
                            return [];
                        case "unique":
                        case "multiple":
                            return [{kind: 'FocusOption', target: 'next'}];
                        default:
                            break;
                    }
                    break;
                case "PAGE_UP":
                    switch (type) {
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            return [{kind: 'HighlightOption', target: 'first'}];
                        case "unique":
                        case "multiple":
                            return [{kind: 'FocusOption', target: 'first'}];
                        default:
                            break;
                    }
                    break;
                case "PAGE_DOWN":
                    switch (type) {
                        case "autocomplete_unique":
                        case "autocomplete_multiple":
                            return [{kind: 'HighlightOption', target: 'last'}];
                        case "unique":
                        case "multiple":
                            return [{kind: 'FocusOption', target: 'last'}];
                        default:
                            break;
                    }
                    break;
                case "ENTER":
                    switch (type) {
                        case "autocomplete_unique":
                            return [{kind: 'SelectOption', target: 'lastHighlighted'}];
                        case "autocomplete_multiple":
                            return [{kind: 'SelectOption', target: 'lastHighlighted'}];
                        case "unique":
                        case "multiple":
                            // Do nothing, let's select option emit an event
                            break;
                        default:
                            break;
                    }
                    break;
            }
            break;
        default:
            throw Error('Unknown error');
    }
    return [];
}


/**
 * Convert a {@link KeyboardEvent} into a {@link SelectKeyboardShortcut}
 * @param event - KeyboardEvent
 * @returns The corresponding `SelectKeyboardShortcut`
 */
function keyboardShortcutFromKeyboardEvent(event: KeyboardEvent): SelectKeyboardShortcut {
    const { key } = event;

    if (event.shiftKey) {
        switch (key) {
            case 'Tab':
                return 'MAJ+TAB';
        }
    }

    if(event.altKey) {
        switch (key) {
            case 'ArrowDown':
                return 'ALT+DOWN_ARROW';
            case 'ArrowUp':
                return 'ALT+UP_ARROW';
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
        } else if(isPageUpKey(event)) {
            return 'PAGE_UP';
        } else if(isPageDownKey(event)) {
            return 'PAGE_DOWN';
        } else if(isEnterKey(event)) {
            return 'ENTER';
        } else if(isSpaceKey(event)) {
            return 'SPACE';
        } else if(isTabKey(event)) {
            return 'TAB';
        } else if (isEscapeKey(event)) {
            return 'ESCAPE';
        }
    }

    return 'UNKNOWN';
}
