import { h } from "@stencil/core";
export class Icon {
    render() {
        const cssClass = {
            class: {
                [`icons-${this.icon}`]: true,
                [`icons-size-${this.size}`]: true
            }
        };
        return (h("i", Object.assign({}, cssClass)));
    }
    static get is() { return "wcs-icon"; }
    static get properties() { return {
        "icon": {
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
                "tags": [],
                "text": ""
            },
            "attribute": "icon",
            "reflect": false
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'x5' | 'x75' | '1x' | '1x2' | '1x5' | '1x7' | '2x' | '3x' | '30px' | '50px' | '66px' | '90px' | '96px' | '140px'",
                "resolved": "\"140px\" | \"1x\" | \"1x2\" | \"1x5\" | \"1x7\" | \"2x\" | \"30px\" | \"3x\" | \"50px\" | \"66px\" | \"90px\" | \"96px\" | \"x5\" | \"x75\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "size",
            "reflect": false
        }
    }; }
}
