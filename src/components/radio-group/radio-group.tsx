import {
    Component,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Listen, Method,
    Prop,
    Watch
} from '@stencil/core';
import { RadioGroupChangeEventDetail, RadioGroupMode } from './radio-group-interface';
import { RadioChosedEvent } from '../radio/radio-interface';
import {
    isDownArrowKey, isEnterKey,
    isLeftArrowKey,
    isRightArrowKey,
    isSpaceKey,
    isTabKey,
    isUpArrowKey
} from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

@Component({
    tag: 'wcs-radio-group',
    styleUrl: 'radio-group.scss',
    shadow: true
})
export class RadioGroup implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLWcsRadioGroupElement;
    
    /**
     * The value of the radio-group. Automatically reflects which radio button is selected.
     */
    @Prop({ mutable: true }) value: any | any[] | undefined | null;

    /**
     * The name of the control to be set on all radio button children
     */
    @Prop({ reflect: true }) name;

    /**
     * The display mode of the control to be set on all radio button children
     */
    @Prop({ reflect: true }) mode: RadioGroupMode = 'radio';

    /** Emitted when the value has changed. */
    @Event() wcsChange!: EventEmitter<RadioGroupChangeEventDetail>;

    @Watch('value')
    onValueChangeHandler(value: any | undefined) {
        this.updateRadioTabIndex(value);
        this.updateAllRadioState();
    }

    componentDidLoad() {
       this.onValueChangeHandler(this.value);
       this.updateAllRadioModeAndName();
    }
    
    onSlotChange() {
        this.updateRadioTabIndex(this.value);
        this.updateAllRadioModeAndName();
    }
    
    updateAllRadioState() {
        this.getSlottedRadios().forEach(r => r.updateState());
    }
    
    @Watch('name')
    @Watch('mode')
    updateAllRadioModeAndName() {
        this.getSlottedRadios().forEach(r => {
            r.mode = this.mode;
            r.name = this.name;
        });
    }
    
    updateRadioTabIndex(value: any | undefined) {
        const radios = this.getSlottedRadios();

        // Get the first radio that is not disabled and the checked one
        const first = radios.find((radio) => !radio.disabled);
        const checked = radios.find((radio) => radio.value === value && !radio.disabled);

        if (!first && !checked) {
            return;
        }

        // If an enabled checked radio exists, set it to be the focusable radio
        // otherwise we default to focus the first radio
        const focusable = checked || first;

        for (const radio of radios) {
            const tabindex = radio === focusable ? 0 : -1;
            radio.setTabIndex(tabindex);
        }
    }

    private getSlottedRadios(): HTMLWcsRadioElement[] {
        return Array.from(this.el.querySelectorAll('wcs-radio'));
    }

    private getSlottedRadiosNotDisabled(): HTMLWcsRadioElement[] {
        return Array.from(this.getSlottedRadios().filter(radio => !radio.disabled));
    }

    @Listen('wcsRadioClick')
    handleRadioClick(event: CustomEvent<RadioChosedEvent>) {
        this.value = event.detail.value;
        this.wcsChange.emit({
            value: event.detail.value
        });
    }

    @Listen('keydown')
    async handleKeyDown(ev: KeyboardEvent) {
        const radiosNotDisabled = this.getSlottedRadiosNotDisabled();
        const previousSelected = radiosNotDisabled.findIndex(r => r === ev.target);
        let indexToSelect: number;

        if ((isSpaceKey(ev) || isEnterKey(ev))) {
            ev.preventDefault();
            indexToSelect = previousSelected;
        } else if (isDownArrowKey(ev) || isRightArrowKey(ev)) {
            ev.preventDefault();
            // Check the next wcs-radio from the previous selected
            indexToSelect = (previousSelected + 1) % radiosNotDisabled.length;  // to return at the beginning on the list when we are on the last index
        } else if (isUpArrowKey(ev) || isLeftArrowKey(ev)) {
            ev.preventDefault();
            // Check the previous wcs-radio from the previous selected
            indexToSelect = (previousSelected - 1 + radiosNotDisabled.length) % radiosNotDisabled.length; // To return at the end of the list when we are on index=0
        } else if (isTabKey(ev)) {
            return;
        }
        
        const radioToSelect = radiosNotDisabled[indexToSelect]
        if (radioToSelect) {
            radioToSelect.focus();
            
            if (this.value !== radioToSelect.value) {
                this.wcsChange.emit({
                    value: radioToSelect.value
                })
            }
            
            this.value = radioToSelect.value;
        }
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string) {
        this.el.setAttribute(attr, value);
    }

    render() {
        return (
            <Host role={"radiogroup"}>
                <slot name="option" onSlotchange={this.onSlotChange.bind(this)}/>
            </Host>
        );
    }

}
