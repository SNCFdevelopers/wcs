import { r as registerInstance, c as createEvent, h, d as getElement } from './chunk-2b7d6005.js';

/**
 *
 */
class Input {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.wcsChange = createEvent(this, "wcsChange", 7);
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "value": ["valueChanged"],
        "disabled": ["disabledChanged"]
    }; }
    static get style() { return ".wcs-background-primary {\n  background-color: #0088ce;\n}\n\n.wcs-color-primary {\n  color: #fff;\n}\n\n.wcs-background-primary-hover {\n  background-color: #0088ce;\n}\n.wcs-background-primary-hover:hover {\n  background-color: #00a1f4;\n  border-color: #02a9ff;\n}\n\n.wcs-background-secondary {\n  background-color: #4d4f53;\n}\n\n.wcs-color-secondary {\n  color: #fff;\n}\n\n.wcs-background-secondary-hover {\n  background-color: #4d4f53;\n}\n.wcs-background-secondary-hover:hover {\n  background-color: #5f6267;\n  border-color: #66686d;\n}\n\n.wcs-background-success {\n  background-color: #82be00;\n}\n\n.wcs-color-success {\n  color: #212529;\n}\n\n.wcs-background-success-hover {\n  background-color: #82be00;\n}\n.wcs-background-success-hover:hover {\n  background-color: #9ce400;\n  border-color: #a5f100;\n}\n\n.wcs-background-info {\n  background-color: #009aa6;\n}\n\n.wcs-color-info {\n  color: #fff;\n}\n\n.wcs-background-info-hover {\n  background-color: #009aa6;\n}\n.wcs-background-info-hover:hover {\n  background-color: #00bdcc;\n  border-color: #00c9d9;\n}\n\n.wcs-background-danger {\n  background-color: #cd0037;\n}\n\n.wcs-color-danger {\n  color: #fff;\n}\n\n.wcs-background-danger-hover {\n  background-color: #cd0037;\n}\n.wcs-background-danger-hover:hover {\n  background-color: #f30041;\n  border-color: #ff0145;\n}\n\n.wcs-background-warning {\n  background-color: #ffb612;\n}\n\n.wcs-color-warning {\n  color: #212529;\n}\n\n.wcs-background-warning-hover {\n  background-color: #ffb612;\n}\n.wcs-background-warning-hover:hover {\n  background-color: #ffc238;\n  border-color: #ffc645;\n}\n\n.wcs-background-light {\n  background-color: #f2f2f2;\n}\n\n.wcs-color-light {\n  color: #212529;\n}\n\n.wcs-background-light-hover {\n  background-color: #f2f2f2;\n}\n.wcs-background-light-hover:hover {\n  background-color: white;\n  border-color: white;\n}\n\n.wcs-background-dark {\n  background-color: #343a40;\n}\n\n.wcs-color-dark {\n  color: #fff;\n}\n\n.wcs-background-dark-hover {\n  background-color: #343a40;\n}\n.wcs-background-dark-hover:hover {\n  background-color: #454d55;\n  border-color: #4b545c;\n}\n\ninput {\n  display: block;\n  padding: 0.65625rem 1.25rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #0088ce;\n  background-color: #f2f2f2;\n  background-clip: padding-box;\n  border: 1px solid #f2f2f2;\n  border-radius: 0.4375rem;\n}\n\ninput:focus {\n  outline: 0;\n  border: solid 1px #0088ce;\n}\n\n.white {\n  background-color: #fff;\n}"; }
}
let inputIds = 0;

export { Input as wcs_input };
