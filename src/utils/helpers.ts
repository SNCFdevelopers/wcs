import { EventEmitter } from '@stencil/core';

export function isElement(element: any): element is Element {
    return 'clientWidth' in element
        && 'clientHeight' in element;
}

export function hasShadowDom(el: HTMLElement) {
    return !!el.shadowRoot && !!(el as any).attachShadow;
}

export const debounceEvent = (event: EventEmitter, wait: number): EventEmitter => {
    const original = (event as any)._original || event;
    return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait)
    } as EventEmitter;
};

export const debounce = (func: (...args: any[]) => void, wait = 0) => {
    let timer: any;
    return (...args: any[]): any => {
        clearTimeout(timer);
        timer = setTimeout(func, wait, ...args);
    };
};

/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. For example, the inner input in `wcs-input` should inherit
 * the `title` attribute that developers set directly on `wcs-input`. This
 * helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 */
export const inheritAttributes = (el: HTMLElement, attributes: string[] = []) => {
    const attributeObject: { [k: string]: any } = {};

    attributes.forEach(attr => {
        if (el.hasAttribute(attr)) {
            const value = el.getAttribute(attr);
            if (value !== null) {
                attributeObject[attr] = el.getAttribute(attr);
            }
            el.removeAttribute(attr);
        }
    });

    return attributeObject;
}

/**
 * List of available ARIA attributes + `role`.
 * Removed deprecated attributes.
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes
 */
const ariaAttributes = [
    'role',
    'aria-activedescendant',
    'aria-atomic',
    'aria-autocomplete',
    'aria-braillelabel',
    'aria-brailleroledescription',
    'aria-busy',
    'aria-checked',
    'aria-colcount',
    'aria-colindex',
    'aria-colindextext',
    'aria-colspan',
    'aria-controls',
    'aria-current',
    'aria-describedby',
    'aria-description',
    'aria-details',
    'aria-disabled',
    'aria-errormessage',
    'aria-expanded',
    'aria-flowto',
    'aria-haspopup',
    'aria-hidden',
    'aria-invalid',
    'aria-keyshortcuts',
    'aria-label',
    'aria-labelledby',
    'aria-level',
    'aria-live',
    'aria-multiline',
    'aria-multiselectable',
    'aria-orientation',
    'aria-owns',
    'aria-placeholder',
    'aria-posinset',
    'aria-pressed',
    'aria-readonly',
    'aria-relevant',
    'aria-required',
    'aria-roledescription',
    'aria-rowcount',
    'aria-rowindex',
    'aria-rowindextext',
    'aria-rowspan',
    'aria-selected',
    'aria-setsize',
    'aria-sort',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-valuetext',
];

/**
 * Returns an array of aria attributes that should be copied from
 * the shadow host element to a target within the light DOM.
 * @param el The element that the attributes should be copied from.
 * @param ignoreList The list of aria-attributes to ignore reflecting and removing from the host.
 * Use this in instances where we manually specify aria attributes on the `<Host>` element.
 */
export const inheritAriaAttributes = (el: HTMLElement, ignoreList?: string[]) => {
    let attributesToInherit = ariaAttributes;
    if (ignoreList && ignoreList.length > 0) {
        attributesToInherit = attributesToInherit.filter((attr) => !ignoreList.includes(attr));
    }
    return inheritAttributes(el, attributesToInherit);
};

export const findItemLabel = (componentEl: HTMLElement): HTMLWcsLabelElement | null => {
    const itemEl = componentEl.closest('wcs-form-field');
    if (itemEl) {
        return itemEl.querySelector('wcs-label');
    }
    return null;
};

declare const __zone_symbol__requestAnimationFrame: any;

/**
 * Patched version of requestAnimationFrame that avoids ngzone
 * Use only when you know ngzone should not run
 */
export const raf = (h: any) => {
    if (typeof __zone_symbol__requestAnimationFrame === 'function') {
        return __zone_symbol__requestAnimationFrame(h);
    }
    if (typeof requestAnimationFrame === 'function') {
        return requestAnimationFrame(h);
    }
    return setTimeout(h);
};

/**
 * Return true if the mouseEvent click is inside the given HTML element
 */
export const clickInsideElement = (event: MouseEvent, element: HTMLElement): boolean => {
    return event.x >= element.getBoundingClientRect().x && event.x <= element.getBoundingClientRect().x + element.getBoundingClientRect().width
        && event.y >= element.getBoundingClientRect().y && event.y <= element.getBoundingClientRect().y + element.getBoundingClientRect().height;
}


export const clickTargetIsElementOrChildren = (mouseEvent: MouseEvent, element: HTMLElement) => {
    return mouseEvent.target instanceof Node
        && element.contains(mouseEvent.target);
}

export function generateUniqueId(componentName: string): string {
    return componentName + "-" + Math.random().toString(36);
}

export function isKeyup(evt: KeyboardEvent) {
    return evt.code === 'ArrowUp';
}

export function isKeydown(evt: KeyboardEvent) {
    return evt.code === 'ArrowDown';
}

export function isEscapeKey(evt: KeyboardEvent) {
    return evt.code === 'Escape';
}

export function isSpaceKey(evt: KeyboardEvent) {
    return evt.code === 'Space';
}

export function isEnterKey(evt: KeyboardEvent) {
    return evt.key === 'Enter';
}

export function isHomeKey(evt: KeyboardEvent) {
    return evt.code === 'Home';
}

export function isEndKey(evt: KeyboardEvent) {
    return evt.code === 'End';
}

export function isUpArrowKey(evt: KeyboardEvent) {
    return evt.key === 'ArrowUp';
}

export function isDownArrowKey(evt: KeyboardEvent) {
    return evt.key === 'ArrowDown';
}

export function isLeftArrowKey(evt: KeyboardEvent) {
    return evt.key === 'ArrowLeft';
}

export function isRightArrowKey(evt: KeyboardEvent) {
    return evt.key === 'ArrowRight';
}

export function isPageDownKey(evt: KeyboardEvent) {
    return evt.key === 'PageDown';
}

export function isPageUpKey(evt: KeyboardEvent) {
    return evt.key === 'PageUp';
}

export function isTabKey(evt: KeyboardEvent) {
    return evt.key === 'Tab';
}

export function isCtrlA(evt: KeyboardEvent) {
    return evt.key === 'a' && evt.ctrlKey;
}