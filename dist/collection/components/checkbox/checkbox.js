import { h } from "@stencil/core";
export class Checkbox {
    constructor() {
        this.checkboxId = `wcs-checkbox-${checkboxIds++}`;
        this.name = this.checkboxId;
        /**
         * If `true`, the checkbox is selected.
         */
        this.checked = false;
    }
    handleChange(event) {
        this.indeterminate = false;
        this.checked = event.path[0].checked;
        this.wcsChange.emit({
            checked: this.checked,
            value: this.value
        });
    }
    render() {
        return (h("label", { htmlFor: this.name, class: "container" },
            h("input", { onChange: (evt) => this.handleChange(evt), checked: this.checked, class: "wcs-checkbox", type: "checkbox", name: this.name, id: this.name }),
            h("span", { class: 'checkmark ' + (this.indeterminate ? 'indeterminate' : '') }),
            h("span", { class: "text" },
                h("slot", null))));
    }
    static get is() { return "wcs-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["checkbox.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["checkbox.css"]
    }; }
    static get properties() { return {
        "name": {
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
            "attribute": "name",
            "reflect": false,
            "defaultValue": "this.checkboxId"
        },
        "value": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "value",
            "reflect": false
        },
        "indeterminate": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "false",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "indeterminate",
            "reflect": true
        },
        "checked": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If `true`, the checkbox is selected."
            },
            "attribute": "checked",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get events() { return [{
            "method": "wcsChange",
            "name": "wcsChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the checked property has changed."
            },
            "complexType": {
                "original": "CheckboxChangeEventDetail",
                "resolved": "CheckboxChangeEventDetail",
                "references": {
                    "CheckboxChangeEventDetail": {
                        "location": "import",
                        "path": "./checkbox-interface"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
}
let checkboxIds = 0;
