import { Component, ComponentInterface, EventEmitter, h, Event, Listen, Host } from '@stencil/core';
import { isEnterKey, isSpaceKey } from "../../utils/helpers";

/**
 * You must add `wcs-dropdown-item` to `wcs-dropdown`
 * @slot <no-name> the slot that contains the item's name
 * 
 * @cssprop --wcs-dropdown-item-height - Height of the dropdown item
 * @cssprop --wcs-dropdown-item-padding-horizontal - Padding horizontal
 * @cssprop --wcs-dropdown-item-padding-vertical - Padding vertical
 * @cssprop --wcs-dropdown-item-text-font-weight - Font weight of the dropdown item
 * @cssprop --wcs-dropdown-item-text-color-default - Default text color of the dropdown item 
 * @cssprop --wcs-dropdown-item-text-color-hover - Text color of the dropdown item when hovered
 * @cssprop --wcs-dropdown-item-text-color-press - Text color of the dropdown item when pressed
 * @cssprop --wcs-dropdown-item-background-color-default - Default background color of the dropdown item
 * @cssprop --wcs-dropdown-item-background-color-hover - Background color of the dropdown item when hovered
 * @cssprop --wcs-dropdown-item-background-color-press - Background color of the dropdown item when pressed
 * @cssprop --wcs-dropdown-item-border-width-focus - Border width of the dropdown item when focused
 * @cssprop --wcs-dropdown-item-border-color-focus - Border color of the dropdown item when focused
 * @cssprop --wcs-dropdown-item-border-radius - Border radius of the dropdown item
 * @cssprop --wcs-dropdown-item-transition-duration - Transition duration of the dropdown item
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
    
    @Listen('mouseup')
    onMouseUp(_: MouseEvent): void {
        this.wcsDropdownItemClick.emit();
    }

    @Listen('keydown')
    onKeyDown(evt: KeyboardEvent): void {
        if (isSpaceKey(evt) || isEnterKey(evt)) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            this.wcsDropdownItemClick.emit();
        }
    }

    render() {
        return (
            <Host slot="item" role="menuitem" tabindex="-1">
                <slot/>
            </Host>
        );
    }
}
