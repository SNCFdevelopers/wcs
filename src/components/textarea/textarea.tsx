import {
    Component,
    ComponentInterface,
    Method,
    Prop,
    Watch,
    h,
    Host,
    EventEmitter,
    Element,
    Event,
    Build,
    readTask
} from '@stencil/core';
import {
    debounceEvent,
    inheritAriaAttributes,
    inheritAttributes,
    raf,
    setOrRemoveAttribute
} from '../../utils/helpers';
import { 
    TextareaChangeEventDetail,
    WcsTextareaInputMode, 
    WcsTextareaEnterKeyHint, 
    WcsTextareaResize, 
    WcsTextareaInputState,
    WcsTextareaWrap
} from './textarea-interface';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

const TEXTAREA_INHERITED_ATTRS = ['tabindex', 'title'];

/**
 * Mainly inspired from Ionic Textarea Component.
 * 
 * ## Accessibility guidelines 💡
 * > - If you use wcs-textarea outside a wcs-form-field, you have to manage the label and the error message yourself.
 * > You can use the `aria-label` attribute to provide a label for screen readers but adds no visual label.
 *
 * @cssprop --wcs-textarea-icon-color-default - Default icon color whe the textarea is not focused
 * @cssprop --wcs-textarea-icon-color-focus - Icon color when the textarea is focused 
 * @cssprop --wcs-textarea-icon-color-disabled - Icon color when the textarea is disabled
 * 
 * @cssprop --wcs-textarea-background-color - Background color of the textarea
 *
 * @cssprop --wcs-textarea-border-radius-left - Border radius of the left side of the textarea
 * @cssprop --wcs-textarea-border-radius-right - Border radius of the right side of the textarea
 * 
 * @cssprop --wcs-textarea-border-width - Border width of the textarea when not focused
 * @cssprop --wcs-textarea-border-width-focus - Border width of the textarea when focused
 * 
 * @cssprop --wcs-textarea-border-color-default - Default border color of the textarea when not focused
 * @cssprop --wcs-textarea-border-color-disabled - Border color of the textarea when disabled
 * @cssprop --wcs-textarea-border-color-error - Border color of the textarea when in error state
 * @cssprop --wcs-textarea-border-color-focus -  Border color of the textarea when focused
 * 
 * @cssprop --wcs-textarea-value-color - Color of the value when the textarea is not focused
 * @cssprop --wcs-textarea-value-font-weight - Font weight of the textarea value
 * 
 * @cssprop --wcs-textarea-placeholder-color - Color of the textarea placeholder
 * @cssprop --wcs-textarea-placeholder-font-weight - Font weight of the textarea placeholder
 * @cssprop --wcs-textarea-placeholder-font-style - Font style of the textarea placeholder
 * 
 * @cssprop --wcs-textarea-text-color-disabled - Color of the value when the textarea is disabled
 * 
 * @cssprop --wcs-textarea-border-style-default - Border style default of the textarea when not focused
 * @cssprop --wcs-textarea-border-style-error - Border style default of the textarea in error state
 * @cssprop --wcs-textarea-border-style-focus - Border style default of the textarea when focused
 * 
 * @cssprop --wcs-textarea-min-height - Min height of the textarea component
 * @cssprop --wcs-textarea-max-height - Max height of the textarea component
 * 
 * @cssprop --wcs-textarea-padding-top - Padding top of the textarea
 * @cssprop --wcs-textarea-padding-bottom - Padding bottom of the textarea
 * @cssprop --wcs-textarea-padding-left - Padding left of the textarea
 * @cssprop --wcs-textarea-padding-right - Padding right of the textarea
 * 
 * @cssprop --wcs-textarea-gap - Gap between textarea and icon (prefix/suffix)
 */
@Component({
    tag: 'wcs-textarea',
    styleUrl: 'textarea.scss',
    shadow: {
        delegatesFocus: true
    },
})
export class Textarea implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLElement;
    private nativeInput?: HTMLTextAreaElement;
    private inputId = `wcs-textarea-${textareaIds++}`;
    private inheritedAttributes: { [k: string]: any } = {};

    /**
     * This is required for a WebKit bug which requires us to
     * blur and focus an input to properly focus the input in
     * an item with delegatesFocus. It will no longer be needed
     * with iOS 14.
     *
     * @internal
     */
    @Prop() fireFocusEvents: boolean = true;

    /**
     * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
     */
    @Prop() autocapitalize = 'none';

    /**
     * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
     */
    @Prop() autofocus: boolean = false;

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
     * If `true`, the user cannot interact with the textarea.
     */
    @Prop({ reflect: true }) disabled: boolean = false;

    /**
     * Name of the material icon to add to the input
     */
    @Prop() icon: string;

    /**
     * A hint to the browser for which keyboard to display.
     */
    @Prop() inputmode?: WcsTextareaInputMode;

    /**
     * A hint to the browser for which enter key to display.
     */
    @Prop() enterkeyhint?: WcsTextareaEnterKeyHint;

    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
     */
    @Prop() maxlength?: number;

    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
     */
    @Prop() minlength?: number;

    /**
     * The name of the control, which is submitted with the form data.
     */
    @Prop() name: string = this.inputId;

    /**
     * Instructional text that shows before the input has a value.
     */
    @Prop() placeholder?: string | null;

    /**
     * If `true`, the user cannot modify the value.
     */
    @Prop({ reflect: true }) readonly: boolean = false;

    /**
     * If `true`, the user must fill in a value before submitting a form.
     */
    @Prop({ reflect: true }) required: boolean = false;

    /**
     * If `true`, the element will have its spelling and grammar checked.
     */
    @Prop() spellcheck: boolean = false;

    /**
     * Specifies the state of the input. By default the input is in an initial state but you can set it to 'error' state if the data given by the user is not valid.
     */
    @Prop({reflect: true}) state: WcsTextareaInputState = 'initial';

    /**
     * The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.  
     * Note : at the moment, modifying the width is only possible if you add some custom CSS to the component,
     * for example by overriding the `width` CSS property. See the Resize section for an example on how to do it.
     */
    @Prop() cols?: number;

    /**
     * The number of visible text lines for the control.
     */
    @Prop() rows?: number;

    /**
     * Indicates how the control wraps text.
     */
    @Prop() wrap?: WcsTextareaWrap;

    /**
     * If `true`, the element height will increase based on the value.
     */
    @Prop({ reflect: true }) autoGrow: boolean = false;

    /**
     * The value of the textarea.
     */
    @Prop({mutable: true}) value?: string | null = '';

    /**
     * Indicates how the textarea should be resizable.  
     * Note : at the moment horizontal resizing is only possible if you add custom CSS to the component,
     * see the Resize section for an example.
     */
    @Prop({reflect: true}) resize?: WcsTextareaResize;

    /**
     * Update the native input element when the value changes
     */
    @Watch('value')
    protected valueChanged() {
        const nativeInput = this.nativeInput;
        const value = this.getValue();
        if (nativeInput && nativeInput.value !== value) {
            nativeInput.value = value;
        }
        this.runAutoGrow();
    }

    /**
     * Emitted when the input value has changed.- See https://developer.mozilla.org/en-US/docs/Web/Events/change
     */
    @Event() wcsChange!: EventEmitter<TextareaChangeEventDetail>;

    /**
     * Emitted when a keyboard input occurred. See https://developer.mozilla.org/en-US/docs/Web/Events/input
     */
    @Event() wcsInput!: EventEmitter<KeyboardEvent>;

    /**
     * Emitted when the input loses focus.
     */
    @Event() wcsBlur!: EventEmitter<FocusEvent>;

    /**
     * Emitted when the input has focus.
     */
    @Event() wcsFocus!: EventEmitter<FocusEvent>;

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

    componentWillLoad() {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, TEXTAREA_INHERITED_ATTRS)
        };
    }

    componentDidLoad() {
        raf(() => this.runAutoGrow());
    }

    private runAutoGrow() {
        const nativeInput = this.nativeInput;
        if (nativeInput && this.autoGrow) {
            readTask(() => {
                nativeInput.style.height = 'auto';
                nativeInput.style.height = nativeInput.scrollHeight + 'px';
            });
        }
    }
    
    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeInput, attr, value);
    }

    /**
     * This method make the textarea automatically adopt the size of the content without a scroll bar
     */
    @Method()
    async fitContent() {
        raf(() => this.runAutoGrow());
    }

    /**
     * Sets blur on the native `textarea` in `wcs-textarea`. Use this method instead of the global
     * `textarea.blur()`.
     * @internal
     */
    @Method()
    async setBlur() {
        if (this.nativeInput) {
            this.nativeInput.blur();
        }
    }

    /**
     * Returns the native `<textarea>` element used under the hood.
     */
    @Method()
    getInputElement(): Promise<HTMLTextAreaElement> {
        // tslint:disable-next-line:no-non-null-assertion
        return Promise.resolve(this.nativeInput!);
    }

    private getValue(): string {
        return this.value || '';
    }

    private onInput = (ev: Event) => {
        if (this.nativeInput) {
            this.value = this.nativeInput.value;
        }
        this.wcsInput.emit(ev as KeyboardEvent);
    }
    
    private onChange = (_: Event) => {
        this.wcsChange.emit({value: this.nativeInput.value});
    }

    private onFocus = (ev: FocusEvent) => {
        if (this.fireFocusEvents) {
            this.wcsFocus.emit(ev);
        }
    }

    private onBlur = (ev: FocusEvent) => {
        if (this.fireFocusEvents) {
            this.wcsBlur.emit(ev);
        }
    }

    render() {
        const value = this.getValue();
        const style = {
            ...(this.resize && {'resize': this.resize})
        }

        return (
            <Host
                aria-disabled={this.disabled ? 'true' : null}
            >
                {this.icon ? (<wcs-mat-icon icon={this.icon} size="m"></wcs-mat-icon>) : null}
                <textarea
                    class="native-textarea"
                    ref={el => this.nativeInput = el}
                    autoCapitalize={this.autocapitalize}
                    autoFocus={this.autofocus}
                    enterKeyHint={this.enterkeyhint}
                    inputMode={this.inputmode}
                    disabled={this.disabled}
                    maxLength={this.maxlength}
                    minLength={this.minlength}
                    name={this.name}
                    placeholder={this.placeholder || ''}
                    readOnly={this.readonly}
                    required={this.required}
                    spellcheck={this.spellcheck}
                    cols={this.cols}
                    rows={this.rows}
                    wrap={this.wrap}
                    onInput={this.onInput}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    style={style}
                    {...this.inheritedAttributes}
                >
            {value}
          </textarea>
            </Host>
        );
    }
}

let textareaIds = 0;
