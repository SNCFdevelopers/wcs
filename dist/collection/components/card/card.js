export class Card {
    render() {
        return (h("slot", null));
    }
    static get is() { return "wcs-card"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return "/**style-placeholder:wcs-card:**/"; }
}
