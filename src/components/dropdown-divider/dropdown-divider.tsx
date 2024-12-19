import { Component, h, Host } from '@stencil/core';

/**
 * You can add a divider between groups of items
 * 
 * @cssprop --wcs-dropdown-divider-spacing - base spacing for margins
 * @cssprop --wcs-dropdown-divider-color - divider color
 * 
 */
@Component({
    tag: 'wcs-dropdown-divider',
    styleUrl: 'dropdown-divider.scss',
    shadow: true
})
export class DropdownDivider {
    render() {
        return (
            <Host slot="item" tabindex="-1" aria-hidden="true"></Host>
        );
    }
}
