import {
    Build,
    Component,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Method,
    Prop,
    State,
    Watch
} from '@stencil/core';
import { debounceEvent, findItemLabel, inheritAriaAttributes, inheritAttributes } from '../../utils/helpers';
import {
    AutocompleteTypes,
    InputChangeEventDetail,
    isWcsInputSize,
    TextFieldTypes,
    WcsInputSize,
    WcsInputSizeValues,
    WcsInputAutocorrect,
    WcsInputEnterKeyHint,
    WcsInputInputMode,
    WcsInputState
} from './input-interface';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

/**
 * The input component is a form control that accepts a single line of text.
 * Implementation mainly inspired from Ionic Input Component.
 *
 * ## Accessibility guidelines 💡
 * > `wcs-input` is a wrapper around the native input element which is located inside its shadow DOM. All the
 * > **aria attributes** you set on `wcs-input` are passed to the **native input** element **during the first render of the component**.
 * > If you need to use them as you would with a native input, you can do so.
 *
 * > If you need to **dynamically change the aria attributes after the first render**, you can use the `setAriaAttribute` 
 * > JS method of `wcs-input`.
 *
 * > ```javascript
 * > const wcsInput = document.querySelector('wcs-input');
 * > await wcsInput.setAriaAttribute('aria-label', 'new label');
 * > ```
 * 
 * > If you use wcs-input outside a wcs-form-field, you have to manage the label and the error message yourself.
 * > You can use the `aria-label` attribute to provide a label for screen readers but adds no visual label.
 */
@Component({
    tag: 'wcs-input',
    styleUrl: 'input.scss',
    shadow: { delegatesFocus: true },
})
export class Input implements ComponentInterface, MutableAriaAttribute {
    private nativeInput?: HTMLInputElement;
    private inputId = `wcs-input-${inputIds++}`;
    private inheritedAttributes: { [k: string]: any } = {};
    private iconPassword = "visibility";

    /**
     * This is required for a WebKit bug which requires us to
     * blur and focus an input to properly focus the input in
     * an item with delegatesFocus. It will no longer be needed
     * with iOS 14.
     *
     * @internal
     */
    @Prop() fireFocusEvents = true;

    @State() private passwordReveal = false;

    @Element() private el!: HTMLElement;

    /**
     * If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the
     * server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.
     */
    @Prop() accept?: string;

    /**
     * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
     * Available options: `"off"`, `"none"`, `"on"`, `"sentences"`, `"words"`, `"characters"`.
     */
    @Prop() autocapitalize = 'off';

    /**
     * Indicates whether the value of the control can be automatically completed by the browser.
     */
    @Prop() autocomplete: AutocompleteTypes = 'off';

    /**
     * Whether auto correction should be enabled when the user is entering/editing the text value.
     */
    @Prop() autocorrect: WcsInputAutocorrect = 'off';

    /**
     * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
     */
    @Prop() autofocus = false;

    /**
     * Set the amount of time, in milliseconds, to wait to trigger the `wcsInput` event after each keystroke.
     * This also impacts form bindings such as `ngModel` or `v-model`.
     */
    @Prop() debounce = 0;

    @Watch('debounce')
    protected debounceChanged() {
        this.wcsInput = debounceEvent(this.wcsInput, this.debounce);
    }

    /**
     * Prefix displayed before the text field contents. This is not included in the value.
     */
    @Prop() prefixLabel: string;

    /**
     * Suffix displayed after the text field contents. This is not included in the value.
     */
    @Prop() suffixLabel: string;

    /**
     * If `true`, the user cannot interact with the input.
     */
    @Prop() disabled = false;

    /**
     * A hint to the browser for which enter key to display.
     */
    @Prop() enterkeyhint?: WcsInputEnterKeyHint;

    /**
     * Specify the size (height) of the input.
     */
    @Prop({reflect: true}) size: WcsInputSize = 'm';

    /**
     * Name of the material icon to add to the input
     */
    @Prop() icon: string;

    /**
     * A hint to the browser for which keyboard to display.
     */
    @Prop() inputmode?: WcsInputInputMode;

    /**
     * The maximum value, which must not be less than its minimum (min attribute) value.
     */
    @Prop() max?: string;

    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute
     * specifies the maximum number of characters that the user can enter.
     */
    @Prop() maxlength?: number;

    /**
     * The minimum value, which must not be greater than its maximum (max attribute) value.
     */
    @Prop() min?: string;

    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute
     * specifies the minimum number of characters that the user can enter.
     */
    @Prop() minlength?: number;

    /**
     * If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to
     * `"email"` or `"file"`, otherwise it is ignored.
     */
    @Prop() multiple?: boolean;

    /**
     * The name of the control, which is submitted with the form data.
     */
    @Prop() name: string = this.inputId;

    /**
     * A regular expression that the value is checked against. The pattern must match the entire value, not just some
     * subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value
     * of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, `"date"`, or `"password"`, otherwise
     * it is ignored. When the type attribute is `"date"`, `pattern` will only be used in browsers that do not support
     * the `"date"` input type natively. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for
     * more information.
     */
    @Prop() pattern?: string;

    /**
     * Instructional text that shows before the input has a value.
     */
    @Prop() placeholder?: string | null;

    /**
     * If `true`, the user cannot modify the value.
     */
    @Prop() readonly = false;

    /**
     * If `true`, the user must fill in a value before submitting a form.
     */
    @Prop() required = false;

    /**
     * If `true`, the element will have its spelling and grammar checked.
     */
    @Prop() spellcheck = false;

    /**
     * Specifies the state of the input. By default the input is in an normal state but you can to set it to 'error'
     * state if the data given by the user is not valid.
     */
    @Prop({reflect: true}) state: WcsInputState = 'initial';

    /**
     * Works with the min and max attributes to limit the increments at which a value can be set.
     * Possible values are: `"any"` or a positive floating point number.
     */
    @Prop() step?: string;

    /**
     * The type of control to display. The default type is text.
     */
    @Prop() type: TextFieldTypes = 'text';

    /**
     * The value of the input.
     */
    @Prop({mutable: true}) value?: string | number | null = '';

    /**
     * Emitted when a keyboard input occurred. See https://developer.mozilla.org/en-US/docs/Web/Events/input
     */
    @Event() wcsInput!: EventEmitter<KeyboardEvent>;

    /**
     * Emitted when the value has changed. See https://developer.mozilla.org/en-US/docs/Web/Events/change
     */
    @Event() wcsChange!: EventEmitter<InputChangeEventDetail>;

    /**
     * Emitted when the input loses focus.
     */
    @Event() wcsBlur!: EventEmitter<FocusEvent>;

    /**
     * Emitted when the input has focus.
     */
    @Event() wcsFocus!: EventEmitter<FocusEvent>;

    componentWillLoad() {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, ['tabindex', 'title'])
        };

        if (!isWcsInputSize(this.size)) {
            console.error(`Invalid size value for wcs-input : "${this.size}". Must be one of "${WcsInputSizeValues.join(', ')}"`);
            this.size = "m"; // Default fallback value
        }
    }

    connectedCallback() {
        this.debounceChanged();
        if (Build.isBrowser) {
            document.dispatchEvent(new CustomEvent('wcsInputDidLoad', {
                detail: this.el
            }));
        }
    }

    disconnectedCallback() {
        if (Build.isBrowser) {
            document.dispatchEvent(new CustomEvent('wcsInputDidUnload', {
                detail: this.el
            }));
        }
    }

    /**
     * @deprecated use the native focus method instead
     * Sets focus on the native `input` in `wcs-input`.
     */
    @Method()
    async setFocus() {
        if (this.nativeInput) {
            this.nativeInput.focus();
        }
    }

    /**
     * Sets blur on the native `input` in `wcs-input`. Use this method instead of the global
     * `input.blur()`.
     * @internal
     */
    @Method()
    async setBlur() {
        if (this.nativeInput) {
            this.nativeInput.blur();
        }
    }

    /**
     * Returns the native `<input>` element used under the hood.
     */
    @Method()
    getInputElement(): Promise<HTMLInputElement> {
        return Promise.resolve(this.nativeInput!);
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string) {
        if (this.nativeInput) {
            this.nativeInput.setAttribute(attr, value);
        }
    }
    
    private getValueAsString(): string {
        return typeof this.value === 'number' ? this.value.toString() :
            (this.value || '').toString();
    }

    private onInput = (ev: Event) => {
        const input = ev.target as HTMLInputElement | null;
        if (input) {
            this.value = input.value || '';
        }
        this.wcsInput.emit(ev as KeyboardEvent);
    }

    private onChange = (_: Event) => {
        this.wcsChange.emit({value: this.nativeInput.value});
    }

    private onBlur = (ev: FocusEvent) => {
        if (this.fireFocusEvents) {
            this.wcsBlur.emit(ev);
        }
    }

    private onFocus = (ev: FocusEvent) => {
        if (this.fireFocusEvents) {
            this.wcsFocus.emit(ev);
        }
    }

    private passwordRevealIconClick(): void {
        this.passwordReveal = !this.passwordReveal;
    }

    @Watch('passwordReveal')
    onPasswordRevealChange(): void {
        this.iconPassword = this.passwordReveal ? 'visibility_off' : 'visibility';
    }

    render() {
        const value = this.getValueAsString();
        const labelId = this.inputId + '-lbl';
        const label = findItemLabel(this.el);
        if (label) {
            label.id = labelId;
        }

        return (
            <Host
                aria-disabled={this.disabled ? 'true' : null}
                data-has-prefix={!!this.prefixLabel}
                data-has-suffix={!!this.suffixLabel}
            >
                {this.prefixLabel ? (<span class="prefix" part="prefix">{this.prefixLabel}</span>) : null}
                {this.icon ? (<wcs-mat-icon icon={this.icon} size="m"></wcs-mat-icon>) : null}
                <input
                    class="native-input"
                    ref={input => this.nativeInput = input}
                    aria-labelledby={label ? labelId : null}
                    disabled={this.disabled}
                    accept={this.accept}
                    autoCapitalize={this.autocapitalize}
                    autoComplete={this.autocomplete}
                    autoCorrect={this.autocorrect}
                    autoFocus={this.autofocus}
                    enterKeyHint={this.enterkeyhint}
                    inputMode={this.inputmode}
                    min={this.min}
                    max={this.max}
                    minLength={this.minlength}
                    maxLength={this.maxlength}
                    multiple={this.multiple}
                    name={this.name}
                    pattern={this.pattern}
                    placeholder={this.placeholder || ''}
                    readOnly={this.readonly}
                    required={this.required}
                    spellcheck={this.spellcheck}
                    step={this.step}
                    type={this.passwordReveal ? 'text' : this.type}
                    value={value}
                    onInput={this.onInput}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    {...this.inheritedAttributes}
                />
                {this.type === "password" ? (<wcs-mat-icon class="toggle_password" icon={this.iconPassword} size="m"  onClick={() => this.passwordRevealIconClick()}></wcs-mat-icon>) : null}
                {this.suffixLabel ? (<span class="suffix" part="suffix">{this.suffixLabel}</span>) : null}
            </Host>
        );
    }
}

let inputIds = 0;
