import { Component, ComponentInterface, EventEmitter, h, Event, Listen, Host } from '@stencil/core';

@Component({
    tag: 'wcs-dropdown-item',
    styleUrl: 'dropdown-item.scss'
})
export class DropdownItem implements ComponentInterface {
    @Event({
        eventName: 'wcsDropdownItemClick',
    })
    wcsDropdownItemClick: EventEmitter<void>;

    @Listen('mousedown')
    onMouseDown(_: MouseEvent): void {
        this.wcsDropdownItemClick.emit();
    }

    render() {
        return (
            <Host slot="item">
                <slot></slot>
            </Host>
        );
    }
}
