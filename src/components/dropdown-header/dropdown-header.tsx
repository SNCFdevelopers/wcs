import { Component, h, Host } from '@stencil/core';


/**
 * You can add `wcs-dropdown-header` before a group of items to describe it
 * @slot <no-name> the slot that contains the header's name
 * 
 * @cssprop --wcs-dropdown-header-color - Dropdown header text color
 * @cssprop --wcs-dropdown-header-spacing - Dropdown header base spacing (1x for top and bottom, 2x for left and right)
 * @cssprop --wcs-dropdown-header-font-size - Dropdown header font size
 * @cssprop --wcs-dropdown-header-font-weight - Dropdown header font weight
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
