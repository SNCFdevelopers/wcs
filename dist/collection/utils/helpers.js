export function hasShadowDom(el) {
    return !!el.shadowRoot && !!el.attachShadow;
}
