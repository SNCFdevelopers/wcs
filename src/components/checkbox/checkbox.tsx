import { Component, Prop, Event, Element, EventEmitter, ComponentInterface } from '@stencil/core';
import { CheckboxChangeEventDetail } from './checkbox-interface';


@Component({
    tag: 'wcs-checkbox',
    styleUrl: 'checkbox.scss',
    shadow: true
})
export class Checkbox implements ComponentInterface {
    private checkboxId = `wcs-checkbox-${checkboxIds++}`;

    @Element() el: HTMLElement;

    @Prop() name = this.checkboxId;

    @Prop() value: any;

    @Prop({reflectToAttr: true, mutable: true}) indeterminate: false;

    /**
     * If `true`, the checkbox is selected.
     */
    @Prop({ mutable: true }) checked = false;

    /**
     * Emitted when the checked property has changed.
     */
    @Event() wcsChange!: EventEmitter<CheckboxChangeEventDetail>;

    handleChange(event) {
        this.indeterminate = false;
        this.checked = event.path[0].checked;
        this.wcsChange.emit({
            checked: this.checked,
            value: this.value
        });
    }

    render() {
        return (
            <label htmlFor={this.name} class="container">
                <input onChange={(evt) => this.handleChange(evt)} checked={this.checked} class="wcs-checkbox" type="checkbox" name={this.name} id={this.name}></input>
                <span class={'checkmark ' + (this.indeterminate ? 'indeterminate' : '')}></span>
                <span class="text">
                    <slot />
                </span>
            </label>
        );
    }
}

let checkboxIds = 0;
