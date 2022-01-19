import { Component, ComponentInterface, h, Host, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { RadioChosedEvent } from './radio-interface';
import { RadioGroupMode } from '../radio-group/radio-group-interface';

@Component({
    tag: 'wcs-radio',
    styleUrl: 'radio.scss',
    shadow: true
})
export class Radio implements ComponentInterface {
    private inputId = `wcs-rb-${radioButtonIds++}`;
    private inputEl: HTMLInputElement;
    @Element() el!: HTMLWcsRadioElement;
    @Prop({ reflect: true, mutable: false }) mode: RadioGroupMode = 'radio';

    @Prop({ mutable: true, reflect: true }) value: any | any[] | undefined | null;
    @Prop({ mutable: true, reflect: true }) label: string;
    /**
     * If `true`, the radio is selected.
     */
    @Prop({mutable: true, reflect: true}) checked = false;
    /**
     * If `true`, the user cannot interact with the radio.
     */
    @Prop({ mutable: true }) disabled = false;
    // FIXME renommer l'évènement c'est pas un onclick mais un onchange
    @Event({eventName: 'wcsRadioClick' }) wcsRadioClick: EventEmitter<RadioChosedEvent>

    componentWillLoad(): Promise<void> | void {
        if (this.value === undefined) {
            // If no value was given we use the text content instead.
            this.value = this.el.innerText || '';
        }
    }

    componentDidLoad() {
        this.inputEl = this.el.shadowRoot.querySelector('input');
        this.inputEl.addEventListener('change', _ => {
            this.wcsRadioClick.emit({
                label: this.label,
                source: this.el,
                value: this.value
            });
            this.checked = true;
        })
    }

    render() {
        return (
            <Host slot="option">
                <input
                    id={this.inputId}
                    type="radio"
                    value={this.value}
                    checked={this.checked}
                    disabled={this.disabled}
                    aria-disabled={this.disabled ? 'true' : null}
                    aria-checked={`${this.checked}`}/>
                <label htmlFor={`${this.inputId}`}>{this.label}</label>
            </Host>
        );
    }
}

let radioButtonIds = 0;
