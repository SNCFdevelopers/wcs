import { h, Host } from "@stencil/core";
import * as MDCRipple from '@material/ripple';
/**
 * Select option component, use in conjunction with wcs-select.
 */
export class SelectOption {
    constructor() {
        /** Wether this option can be selected. */
        this.disabled = false;
        /** Wether this option is selected. */
        this.selected = false;
        /**
         * This property musn't be set by hand, it is used by the `wcs-select` component.
         * If you want a multiple select, set `multiple` attribute on the parent select instead.
         * @internal
         * @ignore
         */
        this.multiple = false;
    }
    componentWillLoad() {
        if (this.value === undefined) {
            // If no value was given we use the text content instead.
            this.value = this.el.innerText || '';
        }
        const ripple = new MDCRipple.MDCRipple(this.el);
        ripple.unbounded = true;
    }
    onMouseDown(event) {
        if (!this.disabled) {
            event.stopPropagation();
            // We select inner HTML as it's what's passed into the slot.
            const displayText = this.el.innerText;
            this.wcsSelectOptionClick.emit({
                source: this.el,
                value: this.value,
                displayText
            });
        }
    }
    render() {
        return (h(Host, { slot: "wcs-select-option" },
            this.multiple &&
                h("wcs-checkbox", { checked: this.selected }),
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
                "text": "Wether this option can be selected."
            },
            "attribute": "disabled",
            "reflect": true,
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
            "reflect": true,
            "defaultValue": "false"
        },
        "value": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
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
        "multiple": {
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
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }],
                "text": "This property musn't be set by hand, it is used by the `wcs-select` component.\r\nIf you want a multiple select, set `multiple` attribute on the parent select instead."
            },
            "attribute": "multiple",
            "reflect": true,
            "defaultValue": "false"
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
    static get listeners() { return [{
            "name": "mousedown",
            "method": "onMouseDown",
            "target": undefined,
            "capture": false,
            "passive": true
        }]; }
}
