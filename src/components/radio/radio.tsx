import {
    Component,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Method,
    Prop,
    State
} from '@stencil/core';
import { RadioChosedEvent } from './radio-interface';
import { RadioGroupMode } from '../radio-group/radio-group-interface';
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

const RADIO_INHERITED_ATTRS = ['title'];

/**
 * The radio component should always be wrapped in a `wcs-radio-group`.
 * 
 * @cssprop --wcs-radio-transition-duration - Duration of the transition
 * 
 * @cssprop --wcs-radio-text-color-default - Color of the text when the radio is not selected
 * @cssprop --wcs-radio-text-font-weight-default - Default font weight of the text
 * @cssprop --wcs-radio-text-color-selected - Color of the text when the radio is selected
 * @cssprop --wcs-radio-text-font-weight-selected - Font weight of the text when the radio is selected
 * @cssprop --wcs-radio-text-color-disabled - Color of the text when the radio is disabled
 * @cssprop --wcs-radio-text-color-hover - Color of the text when the radio is hovered
 * 
 * @cssprop --wcs-radio-outline-color-focus - Color of the outline when the radio is focused
 * 
 * @cssprop --wcs-radio-checkmark-size - Size of the checkmark circle
 * @cssprop --wcs-radio-checkmark-border-width - Width of the border of the checkmark circle
 * @cssprop --wcs-radio-checkmark-border-color-default - Color of the border of the checkmark circle when the radio's is not selected
 * @cssprop --wcs-radio-checkmark-border-color-selected - Color of the border of the checkmark circle when the radio is selected
 * @cssprop --wcs-radio-checkmark-border-color-hover - Color of the border of the checkmark circle when the radio is hovered
 * @cssprop --wcs-radio-checkmark-border-color-disabled - Color of the border of the checkmark circle when the radio is disabled
 * @cssprop --wcs-radio-checkmark-background-color-default - Background color of the checkmark circle when the radio's is not selected
 * @cssprop --wcs-radio-checkmark-background-color-selected - Background color of the checkmark circle when the radio's is selected
 * @cssprop --wcs-radio-checkmark-background-color-selected-disabled - Background color of the checkmark circle when the radio is selected and disabled
 * @cssprop --wcs-radio-checkmark-background-color-selected-hover - Background color of the checkmark circle when the radio is selected and hovered
 *
 * @cssprop --wcs-radio-checkmark-outline-distance-with-checkmark-circle - Distance between the checkmark circle and the outline (inside the background)
 * @cssprop --wcs-radio-checkmark-outline-width - Width of the outline of the checkmark circle (inside the background)
 * @cssprop --wcs-radio-checkmark-outline-color - Color of the outline of the checkmark circle (inside the background)
 * @cssprop --wcs-radio-checkmark-border-radius - Border radius of the checkmark circle
 * 
 * @cssprop --wcs-radio-gap - Gap between the radio checkmark circle and the label
 * 
 * @cssprop --wcs-radio-border-radius - Border radius of the radio (default mode)
 *
 * @cssprop --wcs-radio-option-background-color-default - Background color of the radio option when not selected
 * @cssprop --wcs-radio-option-background-color-hover - Background color of the radio option not selected when hovered
 * @cssprop --wcs-radio-option-background-color-press - Background color of the radio option when pressed
 * @cssprop --wcs-radio-option-background-color-disabled - Background color of the radio option when disabled
 * 
 * @cssprop --wcs-radio-option-background-color-selected-default - Background color of the radio option when selected
 * @cssprop --wcs-radio-option-background-color-selected-hover - Background color of the radio option when selected and hovered
 * @cssprop --wcs-radio-option-background-color-selected-press - Background color of the radio option when selected and pressed
 * @cssprop --wcs-radio-option-background-color-selected-disabled - Background color of the radio option when selected and disabled
 * 
 * @cssprop --wcs-radio-option-text-color-default - Color of the text when the radio option is not selected
 * @cssprop --wcs-radio-option-text-color-hover - Color of the text when the radio option not selected is hovered
 * @cssprop --wcs-radio-option-text-color-press - Color of the text when the radio option is pressed
 * 
 * @cssprop --wcs-radio-option-text-color-selected-default - Color of the text when the radio option is selected
 * @cssprop --wcs-radio-option-text-color-selected-hover - Color of the text when the radio option is selected and hovered
 * @cssprop --wcs-radio-option-text-color-selected-press - Color of the text when the radio option is selected and pressed
 * @cssprop --wcs-radio-option-text-color-disabled - Color of the text when the radio option's is disabled
 * 
 * @cssprop --wcs-radio-option-text-font-weight-default - Default font weight of the text
 * @cssprop --wcs-radio-option-text-font-weight-selected - Font weight of the text when the radio option is selected
 *
 * @cssprop --wcs-radio-option-border-radius - Border radius of the radio option
 * @cssprop --wcs-radio-option-border-width - Width of the border of the radio option
 * @cssprop --wcs-radio-option-border-color-hover - Color of the border of the radio option when not selected and hovered
 * @cssprop --wcs-radio-option-border-color-press - Color of the border of the radio option when not selected and pressed
 * 
 * @cssprop --wcs-radio-option-padding-top - Padding top of the radio option
 * @cssprop --wcs-radio-option-padding-right - Padding right of the radio option
 * @cssprop --wcs-radio-option-padding-bottom - Padding bottom of the radio option
 * @cssprop --wcs-radio-option-padding-left - Padding left of the radio option
 */
@Component({
    tag: 'wcs-radio',
    styleUrl: 'radio.scss',
    shadow: {
        delegatesFocus: true
    }
})
export class Radio implements ComponentInterface, MutableAriaAttribute {
    private inputId = `wcs-rb-${radioButtonIds++}`;
    @Element() private el!: HTMLWcsRadioElement;
    private nativeRadio!: HTMLInputElement;
    private inheritedAttributes: { [k: string]: any } = {};
    
    /**
     * If `true`, the radio is selected. 
     * @private
     */
    @State() private checked: boolean = false;

    /**
     * The tabindex of the radio button
     * @private
     */
    @State() private radioTabIndex = -1;

    /**
     * Sets a unique value for each radio, used to identify which radio button in a group is selected
     */
    @Prop({ mutable: true, reflect: true }) value: any | any[] | undefined | null;

    /**
     * The label text displayed for the user
     */
    @Prop({ mutable: true, reflect: true }) label: string;
    
    /**
     * If `true`, the user cannot interact with the radio.
     */
    @Prop({ reflect: true, mutable: true }) disabled: boolean = false;

    /**
     * Emitted when the radio is clicked or Space/Enter is pressed above an unchecked radio
     */
    @Event({ eventName: 'wcsRadioClick' }) wcsRadioClick: EventEmitter<RadioChosedEvent>

    /**
     * Emitted when the radio loses focus.
     */
    @Event() wcsBlur!: EventEmitter<FocusEvent>;

    /**
     * Emitted when the radio has focus.
     */
    @Event() wcsFocus!: EventEmitter<FocusEvent>;

    /**
     * The name of the control, automatically set by the radio group.  
     * (You shouldn't set this prop by yourself)
     * @internal
     */
    @Prop({ mutable: true }) name: string;


    /**
     * The display mode of the control, automatically set by the radio group.  
     * (You shouldn't set this prop by yourself)
     * @internal
     */
    @Prop({ reflect: true, mutable: false }) mode: RadioGroupMode = 'radio';

    /**
     * @internal
     * Checks of unchecks the radio according to it's radio-group value
     */
    @Method()
    async updateState() {
        const radioGroup = this.getClosestRadioGroup();
        if (radioGroup) {
            this.checked = radioGroup.name === this.name && radioGroup.value === this.value
        }
    }

    /** @internal */
    @Method()
    async setTabIndex(value: number) {
        this.radioTabIndex = value;
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeRadio, attr, value);
    }

    onFocus(ev: FocusEvent) {
        this.wcsFocus.emit(ev);
    }

    onBlur(ev: FocusEvent) {
        this.wcsBlur.emit(ev);
    }
    
    private getClosestRadioGroup(): HTMLWcsRadioGroupElement | null {
        return this.el.closest('wcs-radio-group');
    }

    componentWillLoad(): Promise<void> | void {
        if (this.value === undefined) {
            // If no value was given we use the text content instead.
            this.value = this.el.innerText || '';
        }
        
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, RADIO_INHERITED_ATTRS),
        };
    }
    
    private onChange(_: Event) {
        if (this.disabled) return;

        // If the radio is unchecked, then the change represents its transition to the check state.
        // Only emit the change event when going from unchecked to checked, like the native behavior.
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
        if (!this.checked) {
            this.checked = true;
            this.emitRadioChangeEvent();
        }
    }

    emitRadioChangeEvent() {
        this.wcsRadioClick.emit({
            label: this.label,
            source: this.el,
            value: this.value
        });
    }

    render() {
        
        return (
            <Host slot="option"
                  tabIndex={this.disabled ? -1 : this.radioTabIndex}
                  class={this.checked ? 'checked' : ''}>
                <input
                    id={this.inputId}
                    type="radio"
                    name={this.name}
                    value={this.value}
                    checked={this.checked} // Initial checked state of native input
                    disabled={this.disabled}
                    onChange={this.onChange.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    aria-disabled={this.disabled ? 'true' : null}
                    aria-checked={`${this.checked}`}
                    ref={(el) => (this.nativeRadio = el)}
                    {...this.inheritedAttributes}
                />
                <label htmlFor={`${this.inputId}`}>{this.label}</label>
            </Host>
        );
    }
}

let radioButtonIds = 0;
