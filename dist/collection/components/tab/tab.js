import { h } from "@stencil/core";
/**
 *
 */
export class Tab {
    constructor() {
        /**
         * This property should not be used,
         * it is only meant for internal use.
         * @internal
         * @ignore
         */
        this.slot = 'wcs-tab';
    }
    componentDidLoad() {
        this.wcsTabDidLoad.emit();
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "wcs-tab"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "header": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The header you want to be displayed for this tab."
            },
            "attribute": "header",
            "reflect": true
        },
        "slot": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }],
                "text": "This property should not be used,\r\nit is only meant for internal use."
            },
            "attribute": "slot",
            "reflect": true,
            "defaultValue": "'wcs-tab'"
        }
    }; }
    static get events() { return [{
            "method": "wcsTabDidLoad",
            "name": "wcsTabDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }],
                "text": "XXX: Temporary fix, see tabs component"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
}
