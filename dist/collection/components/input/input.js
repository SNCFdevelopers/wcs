import { h } from "@stencil/core";
/**
 *
 */
export class Input {
    constructor() {
        this.inputId = `ion-input-${inputIds++}`;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        this.background = 'normal';
        this.value = '';
        /**
         * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
         */
        this.autocapitalize = 'off';
        /**
         * Indicates whether the value of the control can be automatically completed by the browser.
         */
        this.autocomplete = 'off';
        /**
         * Whether auto correction should be enabled when the user is entering/editing the text value.
         */
        this.autocorrect = 'off';
        /**
         * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
         */
        this.autofocus = false;
        /**
         * If `true`, the user cannot interact with the input.
         */
        this.disabled = false;
        /**
         * If `true`, the user must fill in a value before submitting a form.
         */
        this.required = false;
        /**
         * If `true`, the element will have its spelling and grammar checked.
         */
        this.spellcheck = false;
        /**
         * The type of control to display. The default type is text.
         */
        this.type = 'text';
    }
    getValue() {
        return this.value || '';
    }
    valueChanged() {
        this.wcsChange.emit({ value: this.value });
        console.log(this.value);
    }
    onInput(ev) {
        const input = ev.target;
        if (input) {
            this.value = input.value || '';
        }
    }
    disabledChanged() {
        // TODO: implement
    }
    render() {
        const labelId = this.inputId + '-lbl';
        const value = this.getValue();
        return (h("input", { "aria-labelledby": labelId, name: this.name, class: this.background, value: value, onInput: this.onInput, ref: input => this.nativeInput = input, disabled: this.disabled, accept: this.accept, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, inputMode: this.inputmode, min: this.min, max: this.max, minLength: this.minlength, maxLength: this.maxlength, multiple: this.multiple, pattern: this.pattern, required: this.required, spellCheck: this.spellcheck, step: this.step, size: this.size, type: this.type }));
    }
    /**
     * Sets focus on the specified `wcs-input`. Use this method instead of the global
     * `input.focus()`.
     */
    async setFocus() {
        if (this.nativeInput) {
            this.nativeInput.focus();
        }
    }
    /**
     * Returns the native `<input>` element used under the hood.
     */
    getInputElement() {
        // tslint:disable-next-line:no-non-null-assertion
        return Promise.resolve(this.nativeInput);
    }
    static get is() { return "wcs-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["input.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["input.css"]
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
                "text": "The name of the control, which is submitted with the form data."
            },
            "attribute": "name",
            "reflect": false,
            "defaultValue": "this.inputId"
        },
        "background": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'normal' | 'white'",
                "resolved": "\"normal\" | \"white\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "background",
            "reflect": true,
            "defaultValue": "'normal'"
        },
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string | null",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "''"
        },
        "autocapitalize": {
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
                "text": "Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user."
            },
            "attribute": "autocapitalize",
            "reflect": false,
            "defaultValue": "'off'"
        },
        "autocomplete": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'on' | 'off'",
                "resolved": "\"off\" | \"on\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Indicates whether the value of the control can be automatically completed by the browser."
            },
            "attribute": "autocomplete",
            "reflect": false,
            "defaultValue": "'off'"
        },
        "autocorrect": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'on' | 'off'",
                "resolved": "\"off\" | \"on\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Whether auto correction should be enabled when the user is entering/editing the text value."
            },
            "attribute": "autocorrect",
            "reflect": false,
            "defaultValue": "'off'"
        },
        "autofocus": {
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
                "text": "This Boolean attribute lets you specify that a form control should have input focus when the page loads."
            },
            "attribute": "autofocus",
            "reflect": false,
            "defaultValue": "false"
        },
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
                "text": "If `true`, the user cannot interact with the input."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "accept": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "If the value of the type attribute is `\"file\"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers."
            },
            "attribute": "accept",
            "reflect": false
        },
        "inputmode": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "A hint to the browser for which keyboard to display.\r\nThis attribute applies when the value of the type attribute is `\"text\"`, `\"password\"`, `\"email\"`, or `\"url\"`. Possible values are: `\"verbatim\"`, `\"latin\"`, `\"latin-name\"`, `\"latin-prose\"`, `\"full-width-latin\"`, `\"kana\"`, `\"katakana\"`, `\"numeric\"`, `\"tel\"`, `\"email\"`, `\"url\"`."
            },
            "attribute": "inputmode",
            "reflect": false
        },
        "max": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The maximum value, which must not be less than its minimum (min attribute) value."
            },
            "attribute": "max",
            "reflect": false
        },
        "maxlength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter."
            },
            "attribute": "maxlength",
            "reflect": false
        },
        "min": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The minimum value, which must not be greater than its maximum (max attribute) value."
            },
            "attribute": "min",
            "reflect": false
        },
        "minlength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter."
            },
            "attribute": "minlength",
            "reflect": false
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
            "optional": true,
            "docs": {
                "tags": [],
                "text": "If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `\"email\"` or `\"file\"`, otherwise it is ignored."
            },
            "attribute": "multiple",
            "reflect": false
        },
        "pattern": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `\"text\"`, `\"search\"`, `\"tel\"`, `\"url\"`, `\"email\"`, or `\"password\"`, otherwise it is ignored."
            },
            "attribute": "pattern",
            "reflect": false
        },
        "required": {
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
                "text": "If `true`, the user must fill in a value before submitting a form."
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        },
        "spellcheck": {
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
                "text": "If `true`, the element will have its spelling and grammar checked."
            },
            "attribute": "spellcheck",
            "reflect": false,
            "defaultValue": "false"
        },
        "step": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Works with the min and max attributes to limit the increments at which a value can be set.\r\nPossible values are: `\"any\"` or a positive floating point number."
            },
            "attribute": "step",
            "reflect": false
        },
        "size": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The initial size of the control. This value is in pixels unless the value of the type attribute is `\"text\"` or `\"password\"`, in which case it is an integer number of characters. This attribute applies only when the `type` attribute is set to `\"text\"`, `\"search\"`, `\"tel\"`, `\"url\"`, `\"email\"`, or `\"password\"`, otherwise it is ignored."
            },
            "attribute": "size",
            "reflect": false
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "TextFieldTypes",
                "resolved": "\"date\" | \"email\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"time\" | \"url\"",
                "references": {
                    "TextFieldTypes": {
                        "location": "import",
                        "path": "./input-interface"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The type of control to display. The default type is text."
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'text'"
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
                "text": ""
            },
            "complexType": {
                "original": "InputChangeEventDetail",
                "resolved": "InputChangeEventDetail",
                "references": {
                    "InputChangeEventDetail": {
                        "location": "import",
                        "path": "./input-interface"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "setFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Sets focus on the specified `wcs-input`. Use this method instead of the global\r\n`input.focus()`.",
                "tags": []
            }
        },
        "getInputElement": {
            "complexType": {
                "signature": "() => Promise<HTMLInputElement>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLInputElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<HTMLInputElement>"
            },
            "docs": {
                "text": "Returns the native `<input>` element used under the hood.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "valueChanged"
        }, {
            "propName": "disabled",
            "methodName": "disabledChanged"
        }]; }
}
let inputIds = 0;
