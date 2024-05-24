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
    Watch, Listen
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

enum EditableComponentState {
    DISPLAY,
    EDIT,
    LOAD
}

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
 */
@Component({
    tag: 'wcs-editable-field',
    styleUrl: 'editable-field.scss',
    shadow: true
})
export class EditableField implements ComponentInterface {
    @Element() private el!: HTMLWcsEditableFieldElement;

    @State() private currentState: EditableComponentState = EditableComponentState.DISPLAY;
    /**
     * Specifies which component is used for editing
     */
    @Prop() type: EditableFieldType = 'input';
    /**
     * Label of the field
     */
    @Prop() label!: string;
    /**
     * Event called at each (valid) update of the field.
     */
    @Event() wcsChange!: EventEmitter<EditableComponentUpdateEvent>;
    /**
     * Specify whether the field is editable or not
     */
    @Prop() readonly: boolean = false;
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

    // fixme: why this attr is never read?
    // ignoreNextChangeEvent: boolean = false;
    private spiedElement: HTMLElement = null;
    private currentValue: any = null;

    componentWillLoad(): Promise<void> | void {
        if(!isWcsEditableFieldSize(this.size)) {
            console.error(`Invalid size value for wcs-editable-field : "${this.size}". Must be one of "${WcsEditableFieldSizeValues.join(', ')}"`);
            this.size = "m"; // Default fallback value
        }
        this.currentValue = this.value;
    }

    componentDidRender() {
        const assignedElements = (this.el.shadowRoot.querySelector('slot') as HTMLSlotElement).assignedElements();
        switch (this.type) {
            case 'input':
                this.initWithInput(assignedElements);
                break;
            case 'textarea':
                this.initWithTextArea(assignedElements);
                break;
            case 'select':
                this.initWithSelect(assignedElements)
                break;
        }
    }

    private initWithInput(assignedElements: Element[]) {
        const element = assignedElements.filter(x => {
            return x.tagName === 'WCS-INPUT'
        })[0];
        if (!element) throw new Error('You must provide a slotted input element to handle edition');
        this.spiedElement = element as HTMLElement;
        this.addInputHandlerForWcsComponents(this.spiedElement);
        this.spiedElement.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                this.sendCurrentValue();
            }
            if (event.key === 'Escape') {
                this.discardChanges();
            }
        })
    }

    private initWithTextArea(assignedElements: Element[]) {
        const element = assignedElements.filter(x => {
            return x.tagName === 'WCS-TEXTAREA'
        })[0];
        if (!element) throw new Error('You must provide a slotted textarea element to handle edition');
        this.spiedElement = element as HTMLElement;
        this.addInputHandlerForWcsComponents(this.spiedElement);
        this.spiedElement.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Enter' && event.ctrlKey) {
                this.sendCurrentValue();
            }
            if (event.key === 'Escape') {
                this.discardChanges();
            }
        })
    }

    private initWithSelect(assignedElements: Element[]) {
        const element = assignedElements.filter(x => {
            return x.tagName === 'WCS-SELECT'
        })[0];
        if (!element) throw new Error('You must provide a slotted select element to handle edition');
        this.spiedElement = element as HTMLElement;
        this.addChangeHandlerForWcsComponents(this.spiedElement);
    }

    /**
     * This method subscribes the component to the change events produced by the other WCS components
     * (provided by the user in slot)
     * @param elt the element to subscribe to
     * @private
     */
    private addChangeHandlerForWcsComponents(elt: HTMLElement) {
        elt.addEventListener('wcsChange', (event: CustomEvent) => {
            event.stopImmediatePropagation();
            this.currentValue = event.detail.value;
            if (this.validateFn) {
                this.isError = !this.validateFn(this.currentValue);
            }
        });
    }

    /**
     * This method subscribes the component to the input events produced by the other WCS components
     * @param elt the element to subscribe to
     * @private
     */
    private addInputHandlerForWcsComponents(elt: HTMLElement) {
        elt.addEventListener('wcsInput', (event: CustomEvent) => {
            event.stopImmediatePropagation();
            this.currentValue = event.detail.target.value;
            if (this.validateFn) {
                this.isError = !this.validateFn(this.currentValue);
            }
        });
    }

    private sendCurrentValue() {
        if (this.currentState === EditableComponentState.EDIT) {
            if (this.value === this.currentValue) {
                this.currentState = EditableComponentState.DISPLAY
            } else {
                this.isError = this.validateFn ? !this.validateFn(this.currentValue) : false;
                if (!this.isError) {
                    this.currentState = EditableComponentState.LOAD;
                    this.wcsChange.emit({
                        newValue: this.currentValue,
                        successHandler: () => this.forceDisplayStateAndValidate(),
                        errorhandler: () => this.errorHandler()
                    });
                }
            }
        }
    }

    private discardChanges() {
        this.currentValue = this.value;
        this.currentState = EditableComponentState.DISPLAY;
        this.isError = false;
    }


    forceDisplayStateAndValidate() {
        if (this.currentState === EditableComponentState.LOAD) {
            this.value = this.currentValue;
            this.currentState = EditableComponentState.DISPLAY;
        } else {
            throw new Error('You cannot set display state from ' + EditableComponentState[this.currentState] + ' state');
        }
    }

    @Listen('click', {target: 'window'})
    onWindowClickEvent(event: MouseEvent) {
        if (!this.clickInsideComponent(event)) {
            if (this.currentState === EditableComponentState.EDIT) {
                if (this.isError) {
                    this.discardChanges();
                } else {
                    this.sendCurrentValue();
                }
            }
        }
    }

    private clickInsideComponent(event: MouseEvent) {
        return event.x >= this.el.getBoundingClientRect().x && event.x <= this.el.getBoundingClientRect().x + this.el.getBoundingClientRect().width
            && event.y >= this.el.getBoundingClientRect().y && event.y <= this.el.getBoundingClientRect().y + this.el.getBoundingClientRect().height;
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
    }

    private onDisplayContainerClick() {
        if (this.currentState === EditableComponentState.DISPLAY && this.readonly === false) {
            this.currentState = EditableComponentState.EDIT;
            // fixme: why this attr is never read?
            // this.ignoreNextChangeEvent = true;
            this.spiedElement['value'] = this.currentValue;
            if (this.validateFn) {
                this.isError = !this.validateFn(this.currentValue);
            }
            // We wait until the element is displayed on the page otherwise the focus does not work
            const DELAY_FOR_RENDER = 20;
            setTimeout(() => {
                if (this.type === 'input') {
                    (this.spiedElement as HTMLWcsInputElement).setFocus();
                } else if (this.type === 'textarea') {
                    (this.spiedElement as HTMLWcsTextareaElement).fitContent();
                    (this.spiedElement as HTMLWcsTextareaElement).setFocus();
                }
            }, DELAY_FOR_RENDER)
        }
    }

    render(): any {
        const {formattedValue, formattedCurrentValue} = this.formatValues();
        return (
            <Host>
                <div class="label">{this.label}</div>
                <div
                    class={'display-container ' + (this.currentState !== EditableComponentState.DISPLAY ? 'display-none' : '')}
                    onClick={() => this.onDisplayContainerClick()}>
                    {formattedValue}
                    <wcs-mat-icon icon="edit" size="s"></wcs-mat-icon>
                    {this.readonly ? this.getReadonlySvgIcon() : null}
                </div>
                <div
                    class={'load-container ' + (this.currentState !== EditableComponentState.LOAD ? 'display-none' : '')}>
                    {formattedCurrentValue}
                    <wcs-spinner></wcs-spinner>
                </div>
                <wcs-form-field is-error={this.isError}
                                class={'edit-container ' + (this.currentState !== EditableComponentState.EDIT ? 'display-none' : '')}>
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

    private formatValues() {
        let formattedValue = this.value;
        let formattedCurrentValue = this.currentValue;
        if (this.formatFn) {
            formattedValue = this.formatFn(this.value);
            formattedCurrentValue = this.formatFn(this.currentValue);
        }
        if (Array.isArray(this.value)) {
            formattedValue = this.value.join(', ');
        }
        if (Array.isArray(this.currentValue)) {
            formattedCurrentValue = this.currentValue.join(', ');
        }
        return {
            formattedValue: (formattedValue ? (<span>{formattedValue}</span>) : (<span></span>)),
            formattedCurrentValue: (formattedCurrentValue ? (<span>{formattedCurrentValue}</span>) : (<span></span>))
        };
    }
}
