import { Component, ComponentInterface, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { SwitchChangeEventDetail, SwitchLabelAlignment } from './switch-interface';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

@Component({
    tag: 'wcs-switch',
    styleUrl: 'switch.scss',
    shadow: {
        delegatesFocus: true,
    }
})
export class Switch implements ComponentInterface, MutableAriaAttribute {
    private switchId = `wcs-switch-${switchIds++}`;
    private input!: HTMLInputElement;

    @Prop() name = this.switchId;

    /**
     * If `true`, the switch is selected.
     */
    @Prop({reflect: true}) checked = false;

    /**
     * Specifie the alignment of the switch with the label content
     */
    @Prop({reflect: true}) labelAlignment: SwitchLabelAlignment = 'center';

    /**
     * Specify wether the switch is disabled or not.
     */
    @Prop() disabled: boolean = false;

    /**
     * Emitted when the checked property has changed.
     */
    @Event() wcsChange!: EventEmitter<SwitchChangeEventDetail>;

    /**
     * Emitted when the switch has focus.
     */
    @Event() wcsFocus!: EventEmitter<FocusEvent>;
    
    /**
     * Emitted when the switch loses focus.
     */
    @Event() wcsBlur!: EventEmitter<FocusEvent>;

    toggleChange(_event: Event) {
        this.checked = !this.checked;
        this.wcsChange.emit({
            checked: this.checked
        });
    }

    handleFocus(event: FocusEvent) {
        this.wcsFocus.emit(event);
    }

    handleBlur(event: FocusEvent) {
        this.wcsBlur.emit(event);
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string) {
        this.input.setAttribute(attr, value);
    }

    render() {
        return (
            <Host>
                <label htmlFor={this.name} class="wcs-container" aria-disabled={this.disabled}>
                    <input onBlur={this.handleBlur.bind(this)}
                           onChange={(evt) => this.toggleChange(evt)}
                           onFocus={this.handleFocus.bind(this)}
                           checked={this.checked}
                           class="wcs-switch"
                           type="checkbox"
                           name={this.name}
                           disabled={this.disabled}
                           ref={el => {this.input = el}}
                           id={this.name}>
                    </input>
                    <span class="wcs-checkmark"></span>
                    <span class="text">
                        <slot/>
                    </span>
                </label>
            </Host>
        );
    }
}

let switchIds = 0;
