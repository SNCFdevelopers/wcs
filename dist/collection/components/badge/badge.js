import { h } from "@stencil/core";
export class Badge {
    render() {
        return (h("slot", null));
    }
    static get is() { return "wcs-badge"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["badge.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["badge.css"]
    }; }
}
