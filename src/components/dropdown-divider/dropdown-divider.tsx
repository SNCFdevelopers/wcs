import { Component, h, Host } from '@stencil/core';

/**
 * You can add a divider between groups of items
 * 
 * @cssprop --wcs-dropdown-divider-margin - Margin of the divider
 * @cssprop --wcs-dropdown-divider-color - Color of the divider
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
