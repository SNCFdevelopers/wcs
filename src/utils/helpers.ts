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
 * the `title` attribute that developers set directly on `ion-input`. This
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
