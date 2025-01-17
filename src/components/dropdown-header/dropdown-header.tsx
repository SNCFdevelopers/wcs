import { Component, h, Host } from '@stencil/core';


/**
 * You can add `wcs-dropdown-header` before a group of items to describe it
 * @slot <no-name> the slot that contains the header's name
 * 
 * @cssprop --wcs-dropdown-header-color - Text color of the header
 * @cssprop --wcs-dropdown-header-padding-vertical - Vertical padding of the header
 * @cssprop --wcs-dropdown-header-padding-horizontal - Horizontal padding of the header
 * @cssprop --wcs-dropdown-header-font-size - Font size of the header
 * @cssprop --wcs-dropdown-header-font-weight - Font weight of the header
 *
 */
@Component({
    tag: 'wcs-dropdown-header',
    styleUrl: 'dropdown-header.scss',
    shadow: true
})
export class DropdownHeader {

    render() {
        return (
            <Host slot="item" tabindex="-1">
                <slot/>
            </Host>
        );
    }
}
