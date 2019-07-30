import { h } from "@stencil/core";
export class Badge {
    constructor() {
        /**
         * Select the badge color.
         * @default 'primary'
         */
        this.color = 'primary';
    }
    createColorClass(color) {
        return {
            [`wcs-background-${color}`]: true,
            [`wcs-color-${color}`]: true
        };
    }
    hostData() {
        return {
            class: Object.assign({}, this.createColorClass(this.color))
        };
    }
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
    static get properties() { return {
        "color": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "Color",
                "resolved": "string",
                "references": {
                    "Color": {
                        "location": "import",
                        "path": "../../interface"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "'primary'",
                        "name": "default"
                    }],
                "text": "Select the badge color."
            },
            "attribute": "color",
            "reflect": false,
            "defaultValue": "'primary'"
        }
    }; }
}
