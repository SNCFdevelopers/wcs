import { h } from "@stencil/core";
/**
 * Select option component, use in conjuction with wcs-select.
 */
export class SelectOption {
    constructor() {
        /** Wether this option can be selected. */
        this.disabled = false;
        /** Wether this option is selected. */
        this.selected = false;
        /**
         * This property should not be used,
         * it is only meant for internal use.
         * @internal
         * @ignore
         */
        this.slot = 'wcs-select-option';
    }
    componentWillLoad() {
        if (this.value === undefined) {
            // If no value was given we use the text content instead.
            this.value = this.el.textContent || '';
        }
    }
    componentDidLoad() {
        this.addClickEventListener();
    }
    addClickEventListener() {
        this.el.addEventListener('mousedown', () => {
            if (!this.disabled) {
                // We select inner HTML as it's what's passed into the slot.
                const displayText = this.el.getElementsByClassName('wcs-selection-option-container')[0].innerHTML;
                this.wcsSelectOptionClick.emit({
                    value: this.value,
                    displayText
                });
            }
        });
    }
    render() {
        const wrapperClasses = (this.disabled ? 'disabled ' : '') +
            (this.selected ? 'selected ' : '');
        return (
        // TODO: Try to remove this div
        h("div", { class: wrapperClasses + 'wcs-selection-option-container' },
            h("slot", null)));
    }
    static get is() { return "wcs-select-option"; }
    static get originalStyleUrls() { return {
        "$": ["select-option.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["select-option.css"]
    }; }
    static get properties() { return {
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Wether this option can be selected."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "selected": {
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
                "text": "Wether this option is selected."
            },
            "attribute": "selected",
            "reflect": false,
            "defaultValue": "false"
        },
        "value": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any | null",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The option value, not what's displayed, use inner text instead."
            },
            "attribute": "value",
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
            "defaultValue": "'wcs-select-option'"
        }
    }; }
    static get events() { return [{
            "method": "wcsSelectOptionClick",
            "name": "wcsSelectOptionClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "SelectOptionChosedEvent",
                "resolved": "SelectOptionChosedEvent",
                "references": {
                    "SelectOptionChosedEvent": {
                        "location": "import",
                        "path": "./select-option-interface"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
}
