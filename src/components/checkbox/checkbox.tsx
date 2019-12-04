import { Component, Prop, Event, Element, EventEmitter, ComponentInterface, h, Host } from '@stencil/core';
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
    @Prop({ reflect:true, mutable: true }) checked = false;

    /**
     * Specifie the alignment of the checkbox with the label content
     */
    @Prop({ mutable: true, reflect: true }) labelAlignment: CheckboxLabelAlignment = 'center';

    /**
     * Emitted when the checked property has changed.
     */
    @Event() wcsChange!: EventEmitter<CheckboxChangeEventDetail>;

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
                <label htmlFor={this.name} class="wcs-container">
                    <input onChange={(evt) => this.handleChange(evt)}
                           checked={this.checked}
                           class="wcs-checkbox"
                           type="checkbox"
                           name={this.name}
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
