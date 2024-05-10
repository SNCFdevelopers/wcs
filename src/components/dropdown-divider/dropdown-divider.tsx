import { Component, h, Host } from '@stencil/core';

/**
 * You can add a divider between groups of items
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
