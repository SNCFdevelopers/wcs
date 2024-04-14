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
import { isDownArrowKey, isLeftArrowKey, isRightArrowKey, isUpArrowKey } from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

@Component({
    tag: 'wcs-radio-group',
    styleUrl: 'radio-group.scss',
    shadow: true
})
export class RadioGroup implements ComponentInterface, MutableAriaAttribute {
    @Prop() value: any | any[] | undefined | null;
    @Prop({reflect: true, mutable: false}) name;
    @Prop({reflect: true, mutable: false}) mode: RadioGroupMode = 'radio';
    @Element() private el!: HTMLWcsRadioGroupElement;

    /** Emitted when the value has changed. */
    @Event() wcsChange!: EventEmitter<RadioGroupChangeEventDetail>;

    @Watch('value')
    onValueChangeHandler(newValue: any) {
        this.updateOptionsState(newValue, true);
    }

    componentDidLoad() {
        if (this.value) {
            this.updateOptionsState(this.value, true);
        }

        // We set the radio group mode on all options
        this.options.forEach(o => o.mode = this.mode);

        this.optionsNotDisabled.forEach((option) => {
            if (option.checked) {
                option.tabIndex = 0;
            } else {
                option.tabIndex = -1
            }
        });

        // If no option is already checked we made the first non-disabled option focusable
        if (this.optionsNotDisabled.length > 0 && this.optionsNotDisabled.findIndex(o => o.tabIndex === 0) === -1) this.optionsNotDisabled[0].tabIndex = 0;
    }

    private get options(): HTMLWcsRadioElement[] {
        const opts = this.el.querySelectorAll('wcs-radio');
        const slot = this.el.querySelector('slot');
        return opts.length !== 0
            ? opts as unknown as HTMLWcsRadioElement[]
            : slot !== null
                ? slot.assignedElements() as HTMLWcsRadioElement[]
                : [];
    }

    private get optionsNotDisabled(): HTMLWcsRadioElement[] {
        return Array.from(this.options).filter(option => !option.disabled);
    }

    @Listen('wcsRadioClick')
    selectedOptionChanged(event: CustomEvent<RadioChosedEvent>) {
        this.updateOptionsState(event.detail.value, false);
        this.wcsChange.emit({
            value: event.detail.value
        });

        this.optionsNotDisabled.forEach((option) => {
            if(option === event.detail.source) {
                option.tabIndex = 0;
            } else {
                option.tabIndex = -1;
            }
        });
    }

    @Listen('keydown')
    handleKeyDown(ev: KeyboardEvent) {
        if (isDownArrowKey(ev) || isUpArrowKey(ev) || isLeftArrowKey(ev) || isRightArrowKey(ev)) {
            ev.preventDefault();
        }
    }

    @Listen('keyup')
    async handleKeyUp(ev: KeyboardEvent) {
        const radiosNotDisabled = this.optionsNotDisabled;

        // Get the index of the currently checked radio
        const previousSelected = this.optionsNotDisabled.findIndex(o => o.checked) >= 0
            ? this.optionsNotDisabled.findIndex(o => o.checked)
            : 0;

        if (isDownArrowKey(ev) || isRightArrowKey(ev)) {
            // Check the next wcs-radio from the previous selected
            const nextOptionIndex = (previousSelected + 1) % radiosNotDisabled.length;  // to return at the beginning on the list when we are on the last index
            radiosNotDisabled[nextOptionIndex].checked = true;
            this.wcsChange.emit({
                value: radiosNotDisabled[nextOptionIndex].value
            });
        } else if (isUpArrowKey(ev) || isLeftArrowKey(ev)) {
            // Check the previous wcs-radio from the previous selected
            const previousOptionIndex = (previousSelected - 1 + radiosNotDisabled.length) % radiosNotDisabled.length; // To return at the end of the list when we are on index=0
            radiosNotDisabled[previousOptionIndex].checked = true;
            this.wcsChange.emit({
                value: radiosNotDisabled[previousOptionIndex].value
            });
        }
    }

    private updateOptionsState(value: string, markAsChecked: boolean) {
        for (const option of this.options) {
            if (option.value !== value) {
                option.removeAttribute('checked');
            } else {
                if (markAsChecked) {
                    option.setAttribute('checked', '');
                }
            }
        }
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string) {
        this.el.setAttribute(attr, value);
    }

    render() {
        return (
            <Host role={"radiogroup"}>
                <slot name="option"/>
            </Host>
        );
    }

}
