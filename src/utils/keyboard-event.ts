import {
    isEndKey,
    isEnterKey,
    isEscapeKey,
    isHomeKey,
    isPageDownKey,
    isPageUpKey,
    isSpaceKey,
    isTabKey
} from "./helpers";

type KeyboardShortcutCtrl = 'CTRL+A' | 'CTRL+HOME' | 'CTRL+END';
type KeyboardShortcutAlt = 'ALT+DOWN_ARROW' | 'ALT+UP_ARROW';
type KeyboardShortcutMaj = 'MAJ+TAB' | 'MAJ+SPACE';
type KeyboardShortcutDirectional = 'DOWN_ARROW' | 'UP_ARROW' | 'LEFT_ARROW' | 'RIGHT_ARROW';
type KeyboardShortcutOthers = 'HOME' | 'END' | 'PAGE_UP' | 'PAGE_DOWN' | 'ENTER' | 'SPACE' | 'TAB' | 'ESCAPE';

export type KeyboardShortcut = KeyboardShortcutCtrl | KeyboardShortcutAlt | KeyboardShortcutMaj | KeyboardShortcutDirectional | KeyboardShortcutOthers | 'UNKNOWN';

/**
 * Convert a {@link KeyboardEvent} into a {@link KeyboardShortcut}
 * @param event - KeyboardEvent
 * @returns The corresponding {@link KeyboardShortcut}
 */
export function keyboardShortcutFromKeyboardEvent(event: KeyboardEvent): KeyboardShortcut {
    const { key } = event;

    if (event.shiftKey) {
        switch (key) {
            case ' ':
                return 'MAJ+SPACE';
            case 'Tab':
                return 'MAJ+TAB';
        }
    } else if (event.altKey) {
        switch (key) {
            case 'ArrowDown':
                return 'ALT+DOWN_ARROW';
            case 'ArrowUp':
                return 'ALT+UP_ARROW';
        }
    } else if (event.ctrlKey) {
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
