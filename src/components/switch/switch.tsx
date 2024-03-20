import { Component, ComponentInterface, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { SwitchChangeEventDetail, SwitchLabelAlignment } from './switch-interface';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

@Component({
    tag: 'wcs-switch',
    styleUrl: 'switch.scss',
    shadow: true
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
     * Emitted when the checked property has changed.
     */
    @Event() wcsChange!: EventEmitter<SwitchChangeEventDetail>;

    /**
     * Specifie the alignment of the switch with the label content
     */
    @Prop({reflect: true}) labelAlignment: SwitchLabelAlignment = 'center';

    /**
     * Specify wether the switch is disabled or not.
     */
    @Prop() disabled: boolean = false;

    toggleChange(_event: Event) {
        this.checked = !this.checked;
        this.wcsChange.emit({
            checked: this.checked
        });
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string) {
        this.input.setAttribute(attr, value);
    }

    render() {
        return (
            <Host>
                <label htmlFor={this.name} class="wcs-container" aria-disabled={this.disabled}>
                    <input onChange={(evt) => this.toggleChange(evt)}
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
