import { h, Host } from "@stencil/core";
/**
 * Tab content component.
 * Use this component to specify the content of a component.
 */
export class Tab {
    componentDidLoad() {
        this.wcsTabDidLoad.emit();
    }
    render() {
        return (h(Host, { slot: "wcs-tab" },
            h("slot", null)));
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
