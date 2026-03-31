import {
    Component,
    ComponentInterface,
    EventEmitter,
    h,
    Prop,
    Event,
    State,
    Host,
    Element,
    Watch,
    Listen
} from '@stencil/core';

import {
    EditableComponentUpdateEvent,
    EditableFieldType,
    FormatFn,
    isWcsEditableFieldSize,
    ValidateFn,
    WcsEditableFieldSize,
    WcsEditableFieldSizeValues
} from './editable-field-interface';
import { clickInsideElement, isEnterKey, isEscapeKey, isMouseEvent } from '../../utils/helpers';

enum EditableComponentState {
    DISPLAY,
    EDIT,
    LOAD
}

/**
 * Aria-label of the display button
 */
const EDIT_ARIA_LABEL = "Éditer";

// We wait until the element is displayed on the page otherwise the focus does not work.
// 20ms is a little more than a 16ms frame at 60fps.
const DELAY_BEFORE_FOCUS = 20;

/**
 * The editable-field component can be used to simplify the user experience, avoiding the use of a redirection to a form
 * to edit the data of an entity. You can use it with these wrapped components : `wcs-input`, `wcs-textarea`, `wcs-select`. 
 *
 * This component is not present in the SNCF design system specifications, so we tried to build it in the most
 * "discoverable" way possible (for users who interact with), but it's a first version.
 * 
 * **How to use ❓**  
 * This component is mostly used with a server that returns a response to the input sent through the `wcsChange` event.
 * It has 3 internal states :
 * - DISPLAY = the default state of the editable-field
 * - EDIT = the editable-field is editable, the user should input the data
 * - LOADING = the data is submitted and the editable-field is waiting for a **response**
 *
 * A **response** is needed to get the component out of the LOADING state. You can either :
 * - Set the `value` property to a different value to tell the component to refresh and go back into DISPLAY state
 * - Use the `successHandler` callback through the `wcsChange` event (see interface [EditableComponentUpdateEvent](https://gitlab.com/SNCF/wcs/-/blob/develop/src/components/editable-field/editable-field-interface.tsx))
 * - Use the `errorHandler` callback through the `wcsChange` event (see interface [EditableComponentUpdateEvent](https://gitlab.com/SNCF/wcs/-/blob/develop/src/components/editable-field/editable-field-interface.tsx))
 * 
 * **Accessibility guidelines 💡**  
 * 
 * > - Aria attributes are put on the native component on the first rendering with the `label` and `errorMsg` you provided 
 * > - Additional aria attributes put on `<wcs-editable-field>` won't inherit onto the native component : you must use the `setAriaAttribute` method.
 * 
 * @cssprop --wcs-editable-field-label-color - Color of the label text
 * @cssprop --wcs-editable-field-label-font-weight - Font weight of the label text
 * @cssprop --wcs-editable-field-label-gap - Gap between the label and the field
 * @cssprop --wcs-editable-field-label-font-size - Font size of the label text
 *
 * @cssprop --wcs-editable-field-background-color - Background color of the editable field
 * @cssprop --wcs-editable-field-value-font-weight - Font weight of the field value text
 * @cssprop --wcs-editable-field-value-color-default - Default color of the field value text
 * @cssprop --wcs-editable-field-value-color-hover - Color of the field value text on hover
 * @cssprop --wcs-editable-field-value-color-readonly - Color of the field value text when readonly
 *
 * @cssprop --wcs-editable-field-height-m - Height of the editable field in medium size
 * @cssprop --wcs-editable-field-height-l - Height of the editable field in large size
 * @cssprop --wcs-editable-field-font-size-m - Font size of the field value text in medium size
 * @cssprop --wcs-editable-field-font-size-l - Font size of the field value text in large size
 *
 * @cssprop --wcs-editable-field-border-radius - Border radius of the editable field
 * @cssprop --wcs-editable-field-border-width - Border width of the editable field
 * @cssprop --wcs-editable-field-border-width-focus - Border width of the editable field when focused
 * @cssprop --wcs-editable-field-border-width-hover - Border width of the editable field on hover
 * @cssprop --wcs-editable-field-border-color-default - Default border color of the editable field
 * @cssprop --wcs-editable-field-border-color-hover - Border color of the editable field on hover
 * @cssprop --wcs-editable-field-border-color-focus - Border color of the editable field on focus
 * @cssprop --wcs-editable-field-border-style - Border style of the editable field
 *
 * @cssprop --wcs-editable-field-padding-vertical-m - Vertical padding of the editable field in medium size
 * @cssprop --wcs-editable-field-padding-vertical-l - Vertical padding of the editable field in large size
 * @cssprop --wcs-editable-field-padding-horizontal-m - Horizontal padding of the editable field in medium size
 * @cssprop --wcs-editable-field-padding-horizontal-l - Horizontal padding of the editable field in large size
 *
 * @cssprop --wcs-editable-field-icon-color-readonly - Color of the icon when the field is readonly
 */
@Component({
    tag: 'wcs-editable-field',
    styleUrl: 'editable-field.scss',
    shadow: true
})
export class EditableField implements ComponentInterface {
    @Element() private el!: HTMLWcsEditableFieldElement;
    private spiedElement: HTMLElement = null;
    private editModeBtn: HTMLButtonElement;
    private onInputKeydownCallback: (event: KeyboardEvent) => void;
    private onWcsInputOrChangeCallback: (event: CustomEvent) => void;

    @State() private currentState: EditableComponentState = EditableComponentState.DISPLAY;
    /**
     * Specifies which component is used for editing
     */
    @Prop() type: EditableFieldType = 'input';
    /**
     * Label of the field.  
     * Will also be part of the edit button `aria-label`.
     */
    @Prop() label!: string;
    /**
     * Event called at each (valid) update of the field.
     */
    @Event() wcsChange!: EventEmitter<EditableComponentUpdateEvent>;
    /**
     * Specify whether the field is editable or not
     */
    @Prop({ reflect: true }) readonly: boolean = false;
    /**
     * Initial value of the field
     */
    @Prop({mutable: true}) value: any;
    /**
     * Function to customize the validation of the data during the update
     */
    @Prop() validateFn: ValidateFn<any>;
    /**
     * Function used to format the value
     */
    @Prop() formatFn: FormatFn<any>;
    /**
     * Error message displayed under the field if validation failed.
     */
    @Prop() errorMsg: string = null;
    /**
     * Specify the size (height) of the editable field.
     */
    @Prop({reflect: true}) size: WcsEditableFieldSize = 'm';

    @State() private isError: boolean = false;

    private currentValue: any = null;

    componentWillLoad(): Promise<void> | void {
        if(!isWcsEditableFieldSize(this.size)) {
            console.warn(`Invalid size value for wcs-editable-field : "${this.size}". Must be one of "${WcsEditableFieldSizeValues.join(', ')}"`);
            this.size = "m"; // Default fallback value
        }
        this.currentValue = this.value;
    }

    componentDidLoad() {
        const assignedElements = (this.el.shadowRoot.querySelector('slot') as HTMLSlotElement).assignedElements();
        switch (this.type) {
            case 'input':
                this.initWithInput(assignedElements);
                break;
            case 'textarea':
                this.initWithTextArea(assignedElements);
                break;
            case 'select':
                this.initWithSelect(assignedElements);
                break;
        }
    }


    disconnectedCallback(): void {
        this.cleanUpSpiedElementEventListeners();
    }

    private keyboardSubmitHandler(event: KeyboardEvent): void {
        const shouldValidateOnEnterKey = 
            (this.type === 'textarea' || this.type === 'select')
            ? (isEnterKey(event) && event.ctrlKey)
            : isEnterKey(event);

        if (shouldValidateOnEnterKey) {
            this.sendCurrentValue();
        }
        if (isEscapeKey(event)) {
            this.discardChanges();
        }
    }

    private onWcsInputOrChange(event: CustomEvent) {
        event.stopImmediatePropagation();
        const value = this.type === 'select' ? event.detail.value : event.detail.target.value;
        this.currentValue = value;
        if (this.validateFn) {
            this.isError = !this.validateFn(this.currentValue);
        }
    }

    private cleanUpSpiedElementEventListeners(): void {
        this.spiedElement?.removeEventListener('keydown', this.onInputKeydownCallback);
        this.spiedElement?.removeEventListener('wcsInput', this.onWcsInputOrChangeCallback);
        this.spiedElement?.removeEventListener('wcsChange', this.onWcsInputOrChangeCallback);
    }

    private initWithInput(assignedElements: Element[]) {
        const element = assignedElements.filter(x => {
            return x.tagName === 'WCS-INPUT'
        })[0];
        if (!element) throw new Error('You must provide a slotted input element to handle edition');
        this.spiedElement = element as HTMLElement;
        this.addWcsInputEventHandler(this.spiedElement);
        this.addKeyDownHandler(this.spiedElement);
    }

    private initWithTextArea(assignedElements: Element[]) {
        const element = assignedElements.filter(x => {
            return x.tagName === 'WCS-TEXTAREA'
        })[0];
        if (!element) throw new Error('You must provide a slotted textarea element to handle edition');
        this.spiedElement = element as HTMLElement;
        this.addWcsInputEventHandler(this.spiedElement);
        this.addKeyDownHandler(this.spiedElement);
    }

    private initWithSelect(assignedElements: Element[]) {
        const element = assignedElements.filter(x => {
            return x.tagName === 'WCS-SELECT'
        })[0];
        if (!element) throw new Error('You must provide a slotted select element to handle edition');
        this.spiedElement = element as HTMLElement;
        this.addWcsChangeEventHandler(this.spiedElement);
        this.addKeyDownHandler(this.spiedElement);
    }

    /**
     * This method subscribes the component to the change events produced by the other WCS components
     * (provided by the user in slot)
     * @param elt the element to subscribe to
     * @private
     */
    private addWcsChangeEventHandler(elt: HTMLElement) {
        this.onWcsInputOrChangeCallback = this.onWcsInputOrChange.bind(this);
        elt.addEventListener('wcsChange', this.onWcsInputOrChangeCallback);
    }

    /**
     * This method subscribes the component to the input events produced by the other WCS components
     * @param elt the element to subscribe to
     * @private
     */
    private addWcsInputEventHandler(elt: HTMLElement) {
        this.onWcsInputOrChangeCallback = this.onWcsInputOrChange.bind(this);
        elt.addEventListener('wcsInput', this.onWcsInputOrChangeCallback);
    }

    /**
     * This method subscribes the component to the keydown events produced by the other WCS components 
     * @param elt the element to subscribe to
     * @private
     */
    private addKeyDownHandler(elt: HTMLElement) {
        this.onInputKeydownCallback = this.keyboardSubmitHandler.bind(this);
        elt.addEventListener('keydown', this.onInputKeydownCallback);
    }

    private focusEditModeBtn() {
        setTimeout(() => {
            this.editModeBtn?.focus();
        }, DELAY_BEFORE_FOCUS);
    }

    private sendCurrentValue() {
        if (this.currentState === EditableComponentState.EDIT) {
            if (this.value === this.currentValue) {
                this.currentState = EditableComponentState.DISPLAY;
                this.focusEditModeBtn();
            } else {
                this.isError = this.validateFn ? !this.validateFn(this.currentValue) : false;
                if (!this.isError) {
                    this.currentState = EditableComponentState.LOAD;
                    this.wcsChange.emit({
                        newValue: this.currentValue,
                        successHandler: () => this.forceDisplayStateAndValidate(),
                        errorHandler: () => this.errorHandler()
                    });
                }
            }
        }
    }

    private discardChanges() {
        this.currentValue = this.value;
        this.currentState = EditableComponentState.DISPLAY;
        this.isError = false;
        this.focusEditModeBtn();
    }

    forceDisplayStateAndValidate() {
        if (this.currentState === EditableComponentState.LOAD) {
            this.value = this.currentValue;
            this.currentState = EditableComponentState.DISPLAY;
            this.focusEditModeBtn();
        } else {
            throw new Error('You cannot set display state from ' + EditableComponentState[this.currentState] + ' state');
        }
    }

    // Process only mouse clicks, to avoid interfering with keyboard triggered button clicks. 
    // In some browsers, pressing "Enter" or "Space" while focused on a button generates a click event
    // with `event.detail` set to 0. It's a keyboard triggered click, not a real mouse click. 
    @Listen('click', {target: 'window'})
    onWindowClickEvent(event: MouseEvent | KeyboardEvent) {
        // Ensure only true mouse clicks are processed
        if (isMouseEvent(event) && event.detail !== 0 && !clickInsideElement(event, this.el)) {
            if (this.currentState === EditableComponentState.EDIT) {
                if (this.isError) {
                    this.discardChanges();
                } else {
                    this.sendCurrentValue();
                }
            }
        }
    }

    /**
     * discard changes and force component state to DISPLAY
     * <br/>
     * This method must be call when component is in LOAD state
     */
    errorHandler() {
        this.discardChanges();
    }

    @Watch('value')
    onValueChange(): void {
        this.currentState = EditableComponentState.DISPLAY;
        this.currentValue = this.value;
    }

    private onDisplayContainerClick(): void {
        if (this.currentState === EditableComponentState.DISPLAY && this.readonly === false) {
            this.currentState = EditableComponentState.EDIT;
            this.spiedElement['value'] = this.currentValue;
            if (this.validateFn) {
                this.isError = !this.validateFn(this.currentValue);
            }
            setTimeout(() => {
                if (this.type === 'input') {
                    (this.spiedElement as HTMLWcsInputElement).focus();
                } else if (this.type === 'textarea') {
                    (this.spiedElement as HTMLWcsTextareaElement).fitContent();
                    (this.spiedElement as HTMLWcsTextareaElement).focus();
                }
            }, DELAY_BEFORE_FOCUS)
        }
    }

    private getReadonlySvgIcon() {
        return <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 27 25"
                    class="readonly-icon">
            <path d="M26.79,25.05H1.21a.73.73,0,0,0,0,1.45H26.79a.73.73,0,0,0,0-1.45Z"
                  transform="translate(-0.5 -1.5)"/>
            <path
                d="M19.8,8.87h-.61V6.73a5.23,5.23,0,0,0-10.46,0V8.87H8.2a1.63,1.63,0,0,0-1.63,1.62V21.32A1.62,1.62,0,0,0,8.2,22.94H19.8a1.62,1.62,0,0,0,1.63-1.62V10.49A1.63,1.63,0,0,0,19.8,8.87ZM10.93,6.73a3,3,0,1,1,6.06,0V8.87H10.93Zm3,14.15a5,5,0,1,1,5-5A5,5,0,0,1,14,20.88Z"
                transform="translate(-0.5 -1.5)"/>
            <path
                d="M14,12.62a3.29,3.29,0,1,0,3.29,3.29A3.29,3.29,0,0,0,14,12.62Zm0,4.75a1.47,1.47,0,1,1,1.47-1.46A1.46,1.46,0,0,1,14,17.37Z"
                transform="translate(-0.5 -1.5)"/>
        </svg>;
    }

    private getSelectElement(): HTMLWcsSelectElement {
        return (this.spiedElement ?? this.el.querySelector('wcs-select')) as HTMLWcsSelectElement;
    }
    
    private computeSelectDisplayTextFromSlottedSelectOptions(value: any): string {
        const selectElement = this.getSelectElement();
        
        // in server mode, selected options could be not found in the DOM so we could not find innerText of option
        // so we fall back on the value 
        if (selectElement.serverMode) {
            return value;
        }
        
        const options = Array.from(selectElement?.querySelectorAll('wcs-select-option') ?? []);
        const compareWith = selectElement?.compareWith ?? ((optionValue: any, selectedValue: any) => optionValue === selectedValue);

        if (Array.isArray(value)) {
            return value
                .map(selectedValue => options.find(option => compareWith(option.value, selectedValue))?.innerText ?? selectedValue)
                .join(', ');
        }

        return options.find(option => compareWith(option.value, value))?.innerText ?? value;
    }
    
    private getDisplayValue(value: any) {
        if (this.formatFn) {
            return this.formatFn(value);
        }

        if (this.type === 'select') {
            return this.computeSelectDisplayTextFromSlottedSelectOptions(value);
        }

        if (Array.isArray(value)) {
            return value.join(', ');
        }

        return value;
    }

    private formatValues() {
        const formattedValue = this.getDisplayValue(this.value);
        const formattedCurrentValue = this.getDisplayValue(this.currentValue);

        return {
            formattedValue: (formattedValue ? (<span>{formattedValue}</span>) : (<span></span>)),
            formattedValueText: formattedValue,
            formattedCurrentValue: (formattedCurrentValue ? (<span>{formattedCurrentValue}</span>) : (<span></span>))
        };
    }
    
    render(): any {
        const {formattedValue, formattedValueText, formattedCurrentValue} = this.formatValues();
        return (
            <Host>
                <div class="label">{this.label}</div>
                <button
                    type="button"
                    class={'display-container ' + (this.currentState !== EditableComponentState.DISPLAY ? 'display-none' : '')}
                    onClick={() => this.onDisplayContainerClick()}
                    ref={(el) => this.editModeBtn = el}
                    aria-label={`${EDIT_ARIA_LABEL} ${this.label} ${formattedValueText}`}
                >
                    {formattedValue}
                    <wcs-mat-icon icon="edit" size="s"></wcs-mat-icon>
                    {this.readonly ? this.getReadonlySvgIcon() : null}
                </button>
                <div
                    class={'load-container ' + (this.currentState !== EditableComponentState.LOAD ? 'display-none' : '')}>
                    {formattedCurrentValue}
                    <wcs-spinner></wcs-spinner>
                </div>
                <wcs-form-field is-error={this.isError}
                                class={'edit-container ' + (this.currentState !== EditableComponentState.EDIT ? 'display-none' : '')}
                >
                    <wcs-label class="visually-hidden">{this.label}</wcs-label>
                    <slot/>
                    {
                        this.isError && this.errorMsg
                            ? <wcs-error>{this.errorMsg}</wcs-error>
                            : null
                    }
                </wcs-form-field>
            </Host>
        );
    }
}
