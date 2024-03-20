import { Component, Prop, Event, EventEmitter, ComponentInterface, h, Host, Method } from '@stencil/core';
import { CheckboxChangeEventDetail, CheckboxLabelAlignment } from './checkbox-interface';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

@Component({
    tag: 'wcs-checkbox',
    styleUrl: 'checkbox.scss',
    shadow: {
        delegatesFocus: true
    }
})
export class Checkbox implements ComponentInterface, MutableAriaAttribute {
    private checkboxId = `wcs-checkbox-${checkboxIds++}`;
    private input!: HTMLInputElement;
    
    @Prop() name = this.checkboxId;
    /**
     * If `true` the checkbox is in indeterminate state.
     */
    @Prop({ reflect: true, mutable: true }) indeterminate = false;

    /**
     * If `true`, the checkbox is selected.
     */
    @Prop({ reflect: true, mutable: true }) checked = false;

    /**
     * Specifie the alignment of the checkbox with the label content
     */
    @Prop({ mutable: true, reflect: true }) labelAlignment: CheckboxLabelAlignment = 'center';

    /**
     * Specify wether the checkbox is disabled or not.
     */
    @Prop() disabled: boolean = false;

    /**
     * Emitted when the checked property has changed.
     */
    @Event() wcsChange!: EventEmitter<CheckboxChangeEventDetail>;

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string) {
        this.input.setAttribute(attr, value);
    }

    handleChange(_event: Event) {
        this.indeterminate = false;
        this.checked = !this.checked;
        this.wcsChange.emit({
            checked: this.checked
        });
    }

    render() {
        return (
            <Host>
                <label htmlFor={this.name} class="wcs-container" aria-disabled={this.disabled}>
                    <input onChange={(evt) => this.handleChange(evt)}
                           checked={this.checked}
                           class="wcs-checkbox"
                           type="checkbox"
                           ref={(el) => this.input = el}
                           name={this.name}
                           disabled={this.disabled}
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

let checkboxIds = 0;
