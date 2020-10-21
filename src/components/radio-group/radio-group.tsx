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
import { RadioGroupChangeEventDetail } from './radio-group-interface';
import { RadioChosedEvent } from '../radio/radio-interface';

@Component({
    tag: 'wcs-radio-group',
    styleUrl: 'radio-group.scss',
    shadow: true
})
export class RadioGroup implements ComponentInterface {
    @Prop({ reflect: true, mutable: true }) value: any | any[] | undefined | null;
    @Prop({ reflect: true, mutable: false }) name;
    @Prop({ reflect: true, mutable: false }) mode: 'radio' | 'option' = 'radio';
    @Element() el!: HTMLWcsRadioGroupElement;

    /** Emitted when the value has changed. */
    @Event() wcsChange!: EventEmitter<RadioGroupChangeEventDetail>;

    @Watch('value')
    onValueChangeHandler(newValue: any) {
        this.updateOptionsState(newValue, true);
        this.wcsChange.emit({
            value: this.value
        });
    }

    componentDidLoad() {
        if (this.value) {
            this.updateOptionsState(this.value, true);
        }
        if (this.mode === 'option') {
            for (const option of this.options) {
                option.mode = 'option';
            }
        }
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

    @Listen('wcsRadioClick')
    selectedOptionChanged(event: CustomEvent<RadioChosedEvent>) {
        this.value = event.detail.value.toString();
        this.updateOptionsState(event.detail.value, false);
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
