import { Component, ComponentInterface, EventEmitter, h, Event, Listen, Host } from '@stencil/core';
import { isEnterKey, isSpaceKey } from "../../utils/helpers";

/**
 * You must add `wcs-dropdown-item` to `wcs-dropdown`
 * @slot <no-name> the slot that contains the item's name
 */
@Component({
    tag: 'wcs-dropdown-item',
    styleUrl: 'dropdown-item.scss'
})
export class DropdownItem implements ComponentInterface {
    /**
     * Event emitted when the dropdown item is clicked
     */
    @Event({
        eventName: 'wcsDropdownItemClick',
    })
    wcsDropdownItemClick: EventEmitter<void>;


    @Listen('mousedown')
    onMouseDown(_: MouseEvent): void {
        this.wcsDropdownItemClick.emit();
    }

    @Listen('keydown')
    onKeyDown(evt: KeyboardEvent): void {
        if (isSpaceKey(evt) || isEnterKey(evt)) {
            this.wcsDropdownItemClick.emit();
        }
    }

    render() {
        return (
            <Host slot="item" tabindex="0">
                <slot/>
            </Host>
        );
    }
}
