import { h } from "@stencil/core";
export class Card {
    render() {
        return (h("slot", null));
    }
    static get is() { return "wcs-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["card.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["card.css"]
    }; }
}
