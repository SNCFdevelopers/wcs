import { Component, Prop, Event, Element, EventEmitter, ComponentInterface, h, Host, Listen } from '@stencil/core';
import { isEnterKey, isSpaceKey } from '../../utils/helpers';
import { CheckboxChangeEventDetail, CheckboxLabelAlignment } from './checkbox-interface';

@Component({
    tag: 'wcs-checkbox',
    styleUrl: 'checkbox.scss',
    shadow: true
})
export class Checkbox implements ComponentInterface {
    private checkboxId = `wcs-checkbox-${checkboxIds++}`;

    @Element() el: HTMLElement;

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

    @Listen('keydown')
    onKeyDown(_event: KeyboardEvent) {
        if ( (isSpaceKey(_event) || isEnterKey(_event))) {
            this.handleChange(_event);
        }
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
                <label htmlFor={this.name} class="wcs-container" aria-disabled={this.disabled} tabindex={this.disabled ? "-1" : "0"}>
                    <input tabindex="-1"
                           checked={this.checked}
                           class="wcs-checkbox"
                           type="checkbox"
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
