import { Component, Prop, Event, Element, EventEmitter, ComponentInterface, h, Host } from '@stencil/core';
import { SwitchChangeEventDetail } from './switch-interface';

@Component({
    tag: 'wcs-switch',
    styleUrl: 'switch.scss',
    shadow: true
})
export class Switch implements ComponentInterface {
    private switchId = `wcs-switch-${switchIds++}`;

    @Element() el: HTMLElement;

    @Prop() name = this.switchId;

    /**
     * If `true`, the switch is selected.
     */
    @Prop({ mutable: true }) checked = false;

    /**
     * Emitted when the checked property has changed.
     */
    @Event() wcsChange!: EventEmitter<SwitchChangeEventDetail>;

    toggleChange(_event: Event) {
        this.checked = !this.checked;
        this.wcsChange.emit({
            checked: this.checked
        });
    }

    render() {
        return (
            <Host>
                 <label htmlFor={this.name} class="wcs-container">
                    <span class="text">
                        <slot />
                    </span>
                    <input onChange={(evt) => this.toggleChange(evt)}
                        checked={this.checked}
                        class="wcs-switch"
                        type="checkbox"
                        name={this.name}
                        id={this.name}>
                    </input>
                    <span class="wcs-checkmark"></span>
                 </label>
            </Host>
        );
    }
}

let switchIds = 0;
