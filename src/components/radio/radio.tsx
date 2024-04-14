import {
    Component,
    ComponentInterface,
    h,
    Host,
    Prop,
    Element,
    Event,
    EventEmitter,
    Listen,
    Watch
} from '@stencil/core';
import { RadioChosedEvent } from './radio-interface';
import { RadioGroupMode } from '../radio-group/radio-group-interface';
import { isEnterKey, isSpaceKey } from '../../utils/helpers';

@Component({
    tag: 'wcs-radio',
    styleUrl: 'radio.scss',
    shadow: {
        delegatesFocus: true
    }
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

    @Event({eventName: 'wcsRadioClick' }) wcsRadioClick: EventEmitter<RadioChosedEvent>

    /**
     * Giving every radio button the same name is mandatory to group them
     */
    @Prop() name: string;

    @Listen('keydown')
    onKeyDown(_event: KeyboardEvent) {
        if ((isSpaceKey(_event) || isEnterKey(_event)) && !this.el.checked) {
            this.checked = true;
            this.inputEl.click(); // input[radio].checked = true does not trigger any event => input[radio].click() emit a change event
        }
    }
    
    @Watch("checked")
    checkedChanged(newValue: boolean) {
        if (newValue) {
            if (this.el.parentElement.tagName === 'WCS-RADIO-GROUP') {
                Array.from(this.el.parentElement.querySelectorAll('wcs-radio'))
                  .filter(radio => radio.name === this.el.name)
                  .filter(radio => radio !== this.el)
                  .forEach(radio => {
                      radio.checked = false;
                      radio.tabIndex = -1;
                  });
                this.el.tabIndex = 0;
                this.el.focus();
            }
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
            <Host slot="option" {...(this.disabled ? {tabIndex: -1} : {})}>
                <input
                    id={this.inputId}
                    type="radio"
                    name={this.name}
                    value={this.value}
                    checked={this.checked} // Initial checked state of native input
                    disabled={this.disabled}
                    aria-disabled={this.disabled ? 'true' : null}
                    aria-checked={`${this.checked}`}
                />
                <label htmlFor={`${this.inputId}`}>{this.label}</label>
            </Host>
        );
    }
}

let radioButtonIds = 0;
