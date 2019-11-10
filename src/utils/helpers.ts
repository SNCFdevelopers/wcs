export function isElement(element: any): element is Element {
    return 'clientWidth' in element
        && 'clientHeight' in element;
}

export function hasShadowDom(el: HTMLElement) {
    return !!el.shadowRoot && !!(el as any).attachShadow;
}
