import {
    Component,
    ComponentInterface,
    Method,
    Prop,
    State,
    Watch,
    h,
    Host,
    EventEmitter,
    Element,
    Event,
    Build,
    readTask
} from '@stencil/core';
import { debounceEvent, findItemLabel, inheritAttributes, raf } from '../../utils/helpers';
import { TextareaChangeEventDetail } from './textarea-interface';

/**
 * Mainly inspired from Ionic Textarea Component
 *
 * @cssprop --wcs-textarea-max-height - Max height of the text area component
 * @cssprop --wcs-textarea-padding-left - Padding left of the text area. Take in consideration the transparent border of 2px around the textarea.
 * @cssprop --wcs-textarea-padding-right - Padding right of the text area. Take in consideration the transparent border of 2px around the textarea.
 */
@Component({
    tag: 'wcs-textarea',
    styleUrl: 'textarea.scss',
    shadow: {
        delegatesFocus: true
    },
})
export class Textarea implements ComponentInterface {
    private nativeInput?: HTMLTextAreaElement;
    private inputId = `wcs-textarea-${textareaIds++}`;
    private didBlurAfterEdit = false;
    private inheritedAttributes: { [k: string]: any } = {};

    /**
     * This is required for a WebKit bug which requires us to
     * blur and focus an input to properly focus the input in
     * an item with delegatesFocus. It will no longer be needed
     * with iOS 14.
     *
     * @internal
     */
    @Prop() fireFocusEvents = true;

    @Element() private el!: HTMLElement;

    @State() private hasFocus = false;

    /**
     * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
     */
    @Prop() autocapitalize = 'none';

    /**
     * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
     */
    @Prop() autofocus = false;

    /**
     * If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.
     */
    @Prop({mutable: true}) clearOnEdit = false;

    /**
     * Set the amount of time, in milliseconds, to wait to trigger the `wcsChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
     */
    @Prop() debounce = 0;

    @Watch('debounce')
    protected debounceChanged() {
        this.wcsChange = debounceEvent(this.wcsChange, this.debounce);
    }

    /**
     * If `true`, the user cannot interact with the textarea.
     */
    @Prop() disabled = false;

    /**
     * Name of the material icon to add to the input
     */
    @Prop() icon: string;

    /**
     * A hint to the browser for which keyboard to display.
     * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
     * `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
     */
    @Prop() inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

    /**
     * A hint to the browser for which enter key to display.
     * Possible values: `"enter"`, `"done"`, `"go"`, `"next"`,
     * `"previous"`, `"search"`, and `"send"`.
     */
    @Prop() enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

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
     * Specifies the state of the input. By default the input is in an initial state but you can set it to 'error' state if the data given by the user is not valid.
     */
    @Prop({reflect: true}) state: 'initial' | 'error' = 'initial';

    /**
     * The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.
     */
    @Prop() cols?: number;

    /**
     * The number of visible text lines for the control.
     */
    @Prop() rows?: number;

    /**
     * Indicates how the control wraps text.
     */
    @Prop() wrap?: 'hard' | 'soft' | 'off';

    /**
     * If `true`, the element height will increase based on the value.
     */
    @Prop() autoGrow = false;

    /**
     * The value of the textarea.
     */
    @Prop({mutable: true}) value?: string | null = '';

    /**
     * Indicates how the textarea should be resizable.
     * Possible values 'both' | 'none' | 'vertical' | 'horizontal'
     */
    @Prop({reflect: true}) resize?: 'both' | 'none' | 'vertical' | 'horizontal';

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
        this.wcsChange.emit({value});
    }

    /**
     * Emitted when the input value has changed.
     */
    @Event() wcsChange!: EventEmitter<TextareaChangeEventDetail>;

    /**
     * Emitted when a keyboard input occurred.
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
        this.inheritedAttributes = inheritAttributes(this.el, ['title']);
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

    /**
     * This method make the textarea automatically adopt the size of the content without a scroll bar
     */
    @Method()
    async fitContent() {
        raf(() => this.runAutoGrow());
    }

    /**
     * @deprecated use the native focus method instead  
     * Sets focus on the native `textarea` in `wcs-textarea`.
     */
    @Method()
    async setFocus() {
        if (this.nativeInput) {
            this.nativeInput.focus();
        }
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

    /**
     * Check if we need to clear the text input if clearOnEdit is enabled
     */
    private checkClearOnEdit() {
        if (!this.clearOnEdit) {
            return;
        }

        // Did the input value change after it was blurred and edited?
        if (this.didBlurAfterEdit && this.hasValue()) {
            // Clear the input
            this.value = '';
        }

        // Reset the flag
        this.didBlurAfterEdit = false;
    }

    private focusChange() {
        // If clearOnEdit is enabled and the input blurred but has a value, set a flag
        if (this.clearOnEdit && !this.hasFocus && this.hasValue()) {
            this.didBlurAfterEdit = true;
        }
    }

    private hasValue(): boolean {
        return this.getValue() !== '';
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

    private onFocus = (ev: FocusEvent) => {
        this.hasFocus = true;
        this.focusChange();

        if (this.fireFocusEvents) {
            this.wcsFocus.emit(ev);
        }
    }

    private onBlur = (ev: FocusEvent) => {
        this.hasFocus = false;
        this.focusChange();

        if (this.fireFocusEvents) {
            this.wcsBlur.emit(ev);
        }
    }

    private onKeyDown = () => {
        this.checkClearOnEdit();
    }

    render() {
        const value = this.getValue();
        const labelId = this.inputId + '-lbl';
        const label = findItemLabel(this.el);
        if (label) {
            label.id = labelId;
        }
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
                    aria-labelledby={label ? labelId : null}
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
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onKeyDown={this.onKeyDown}
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
