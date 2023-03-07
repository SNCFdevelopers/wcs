import { Component, ComponentInterface, h, Host, Prop, Element, Event, EventEmitter, Listen } from '@stencil/core';
import { RadioChosedEvent } from './radio-interface';
import { RadioGroupMode } from '../radio-group/radio-group-interface';
import { isEnterKey, isSpaceKey } from '../../utils/helpers';

@Component({
    tag: 'wcs-radio',
    styleUrl: 'radio.scss',
    shadow: true
})
export class Radio implements ComponentInterface {
    private inputId = `wcs-rb-${radioButtonIds++}`;
    private inputEl: HTMLInputElement;
    @Element() private el!: HTMLWcsRadioElement;
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

    @Listen('keydown')
    onKeyDown(_event: KeyboardEvent) {
        if ((isSpaceKey(_event) || isEnterKey(_event)) && !this.el.checked) {
            this.el.checked = true;
            this.emitRadioChangeEvent();
        }
    }

    componentWillLoad(): Promise<void> | void {
        if (this.value === undefined) {
            // If no value was given we use the text content instead.
            this.value = this.el.innerText || '';
        }
    }

    componentDidLoad() {
        this.inputEl = this.el.shadowRoot.querySelector('input');
        this.inputEl.addEventListener('change', _ => {
            this.emitRadioChangeEvent();
            this.checked = true;
        })
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
            <Host slot="option">
                <input
                    id={this.inputId}
                    type="radio"
                    value={this.value}
                    checked={this.checked}
                    disabled={this.disabled}
                    aria-disabled={this.disabled ? 'true' : null}
                    aria-checked={`${this.checked}`}
                    tabIndex={-1}/>
                <label htmlFor={`${this.inputId}`} tabIndex={this.disabled ? -1 : 0}>{this.label}</label>
            </Host>
        );
    }
}

let radioButtonIds = 0;
