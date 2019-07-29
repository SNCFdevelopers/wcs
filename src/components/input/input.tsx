import { Component, Element, Event, EventEmitter, Method, Prop, Watch, h } from '@stencil/core';
import { InputChangeEventDetail, TextFieldTypes } from './input-interface';

/**
 *
 */
@Component({
    tag: 'wcs-input',
    styleUrl: 'input.scss',
    shadow: true,
})
export class Input {
    @Element() el: HTMLElement;

    private inputId = `ion-input-${inputIds++}`;

    private nativeInput?: HTMLInputElement;

    /**
     * The name of the control, which is submitted with the form data.
     */
    @Prop() name: string = this.inputId;

    @Prop({ reflectToAttr: true }) background: 'normal' | 'white' = 'normal';

    @Prop({ reflectToAttr: true, mutable: true }) value: string | null = '';

    /**
     * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
     */
    @Prop() autocapitalize = 'off';

    /**
     * Indicates whether the value of the control can be automatically completed by the browser.
     */
    @Prop() autocomplete: 'on' | 'off' = 'off';

    /**
     * Whether auto correction should be enabled when the user is entering/editing the text value.
     */
    @Prop() autocorrect: 'on' | 'off' = 'off';

    /**
     * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
     */
    @Prop() autofocus = false;

    /**
     * If `true`, the user cannot interact with the input.
     */
    @Prop() disabled = false;


    /**
     * If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.
     */
    @Prop() accept?: string;


    /**
     * A hint to the browser for which keyboard to display.
     * This attribute applies when the value of the type attribute is `"text"`, `"password"`, `"email"`, or `"url"`. Possible values are: `"verbatim"`, `"latin"`, `"latin-name"`, `"latin-prose"`, `"full-width-latin"`, `"kana"`, `"katakana"`, `"numeric"`, `"tel"`, `"email"`, `"url"`.
     */
    @Prop() inputmode?: string;

    /**
     * The maximum value, which must not be less than its minimum (min attribute) value.
     */
    @Prop() max?: string;

    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
     */
    @Prop() maxlength?: number;

    /**
     * The minimum value, which must not be greater than its maximum (max attribute) value.
     */
    @Prop() min?: string;

    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
     */
    @Prop() minlength?: number;

    /**
     * If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored.
     */
    @Prop() multiple?: boolean;

    /**
     * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
     */
    @Prop() pattern?: string;

    /**
     * If `true`, the user must fill in a value before submitting a form.
     */
    @Prop() required = false;

    /**
     * If `true`, the element will have its spelling and grammar checked.
     */
    @Prop() spellcheck = false;

    /**
     * Works with the min and max attributes to limit the increments at which a value can be set.
     * Possible values are: `"any"` or a positive floating point number.
     */
    @Prop() step?: string;

    /**
     * The initial size of the control. This value is in pixels unless the value of the type attribute is `"text"` or `"password"`, in which case it is an integer number of characters. This attribute applies only when the `type` attribute is set to `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
     */
    @Prop() size?: number;

    /**
     * The type of control to display. The default type is text.
     */
    @Prop() type: TextFieldTypes = 'text';

    @Event() wcsChange!: EventEmitter<InputChangeEventDetail>;

    private getValue(): string {
        return this.value || '';
    }

    @Watch('value')
    protected valueChanged() {
        this.wcsChange.emit({ value: this.value });
        console.log(this.value);
    }

    private onInput(ev: Event) {
        const input = ev.target as HTMLInputElement | null;
        if (input) {
            this.value = input.value || '';
        }
    }

    @Watch('disabled')
    protected disabledChanged() {
        // TODO: implement
    }

    render() {
        const labelId = this.inputId + '-lbl';
        const value = this.getValue();
        return (
            <input
                aria-labelledby={labelId}
                name={this.name}
                class={this.background}
                value={value}
                onInput={this.onInput}
                ref={input => this.nativeInput = input}
                disabled={this.disabled}
                accept={this.accept}
                autoCapitalize={this.autocapitalize}
                autoComplete={this.autocomplete}
                autoCorrect={this.autocorrect}
                autoFocus={this.autofocus}
                inputMode={this.inputmode}
                min={this.min}
                max={this.max}
                minLength={this.minlength}
                maxLength={this.maxlength}
                multiple={this.multiple}
                pattern={this.pattern}
                required={this.required}
                spellCheck={this.spellcheck}
                step={this.step}
                size={this.size}
                type={this.type}
            />
        );
    }


    /**
     * Sets focus on the specified `wcs-input`. Use this method instead of the global
     * `input.focus()`.
     */
    @Method()
    async setFocus() {
        if (this.nativeInput) {
            this.nativeInput.focus();
        }
    }

    /**
     * Returns the native `<input>` element used under the hood.
     */
    @Method()
    getInputElement(): Promise<HTMLInputElement> {
        // tslint:disable-next-line:no-non-null-assertion
        return Promise.resolve(this.nativeInput!);
    }
}

let inputIds = 0;
