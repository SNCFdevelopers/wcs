import { Component, h, Host } from '@stencil/core';


/**
 * You can add `wcs-dropdown-header` before a group of items to describe it
 * @slot <no-name> the slot that contains the header's name
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
