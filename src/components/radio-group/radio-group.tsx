import {
    Component,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Listen,
    Prop,
    Watch
} from '@stencil/core';
import { RadioGroupChangeEventDetail, RadioGroupMode } from './radio-group-interface';
import { RadioChosedEvent } from '../radio/radio-interface';
import { isDownArrowKey, isLeftArrowKey, isRightArrowKey, isUpArrowKey } from "../../utils/helpers";

@Component({
    tag: 'wcs-radio-group',
    styleUrl: 'radio-group.scss',
    shadow: true
})
export class RadioGroup implements ComponentInterface {
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
            // Let the previous wcs-radio not accessible via the tab key
            radiosNotDisabled[previousSelected].checked = false;
            radiosNotDisabled[previousSelected].tabIndex = -1;

            // Check the next wcs-radio from the previous selected and let accessible via tab key (tabIndex = 0)
            const nextOptionIndex = (previousSelected + 1) % radiosNotDisabled.length;  // to return at the beginning on the list when we are on the last index
            radiosNotDisabled[nextOptionIndex].tabIndex = 0;
            radiosNotDisabled[nextOptionIndex].focus();
            radiosNotDisabled[nextOptionIndex].checked = true;
        } else if (isUpArrowKey(ev) || isLeftArrowKey(ev)) {
            // Let the previous wcs-radio not accessible via the tab key
            radiosNotDisabled[previousSelected].checked = false;
            radiosNotDisabled[previousSelected].tabIndex = -1;

            // Check the previous wcs-radio from the previous selected and let accessible via tab key (tabIndex = 0)
            const previousOptionIndex = (previousSelected - 1 + radiosNotDisabled.length) % radiosNotDisabled.length; // To return at the end of the list when we are on index=0
            radiosNotDisabled[previousOptionIndex].tabIndex = 0;
            radiosNotDisabled[previousOptionIndex].focus();
            radiosNotDisabled[previousOptionIndex].checked = true;
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

    render() {
        return (
            <Host>
                <slot name="option"/>
            </Host>
        );
    }

}
