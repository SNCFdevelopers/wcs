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

@Component({
    tag: 'wcs-radio',
    styleUrl: 'radio.scss',
    shadow: {
        delegatesFocus: true
    }
})
export class Radio implements ComponentInterface {
    private inputId = `wcs-rb-${radioButtonIds++}`;
    @Element() private el!: HTMLWcsRadioElement;
    
    /**
     * If `true`, the radio is selected. 
     * @private
     */
    @State() private checked = false;

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
    @Prop({ mutable: true }) disabled = false;

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
                />
                <label htmlFor={`${this.inputId}`}>{this.label}</label>
            </Host>
        );
    }
}

let radioButtonIds = 0;
