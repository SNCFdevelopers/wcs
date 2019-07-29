import { EventEmitter } from '../../stencil.core';
import { InputChangeEventDetail, TextFieldTypes } from './input-interface';
/**
 *
 */
export declare class Input {
    el: HTMLElement;
    private inputId;
    private nativeInput?;
    /**
     * The name of the control, which is submitted with the form data.
     */
    name: string;
    background: 'normal' | 'white';
    value: string | null;
    /**
     * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
     */
    autocapitalize: string;
    /**
     * Indicates whether the value of the control can be automatically completed by the browser.
     */
    autocomplete: 'on' | 'off';
    /**
     * Whether auto correction should be enabled when the user is entering/editing the text value.
     */
    autocorrect: 'on' | 'off';
    /**
     * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
     */
    autofocus: boolean;
    /**
     * If `true`, the user cannot interact with the input.
     */
    disabled: boolean;
    /**
     * If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.
     */
    accept?: string;
    /**
     * A hint to the browser for which keyboard to display.
     * This attribute applies when the value of the type attribute is `"text"`, `"password"`, `"email"`, or `"url"`. Possible values are: `"verbatim"`, `"latin"`, `"latin-name"`, `"latin-prose"`, `"full-width-latin"`, `"kana"`, `"katakana"`, `"numeric"`, `"tel"`, `"email"`, `"url"`.
     */
    inputmode?: string;
    /**
     * The maximum value, which must not be less than its minimum (min attribute) value.
     */
    max?: string;
    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
     */
    maxlength?: number;
    /**
     * The minimum value, which must not be greater than its maximum (max attribute) value.
     */
    min?: string;
    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
     */
    minlength?: number;
    /**
     * If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored.
     */
    multiple?: boolean;
    /**
     * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
     */
    pattern?: string;
    /**
     * If `true`, the user must fill in a value before submitting a form.
     */
    required: boolean;
    /**
     * If `true`, the element will have its spelling and grammar checked.
     */
    spellcheck: boolean;
    /**
     * Works with the min and max attributes to limit the increments at which a value can be set.
     * Possible values are: `"any"` or a positive floating point number.
     */
    step?: string;
    /**
     * The initial size of the control. This value is in pixels unless the value of the type attribute is `"text"` or `"password"`, in which case it is an integer number of characters. This attribute applies only when the `type` attribute is set to `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
     */
    size?: number;
    /**
     * The type of control to display. The default type is text.
     */
    type: TextFieldTypes;
    wcsChange: EventEmitter<InputChangeEventDetail>;
    private getValue;
    protected valueChanged(): void;
    private onInput;
    protected disabledChanged(): void;
    render(): any;
    /**
     * Sets focus on the specified `wcs-input`. Use this method instead of the global
     * `input.focus()`.
     */
    setFocus(): Promise<void>;
    /**
     * Returns the native `<input>` element used under the hood.
     */
    getInputElement(): Promise<HTMLInputElement>;
}
