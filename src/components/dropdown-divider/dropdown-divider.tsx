import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-dropdown-divider',
    styleUrl: 'dropdown-divider.scss',
    shadow: true
})
export class DropdownDivider {
    render() {
        return (
            <Host slot="item"></Host>
        );
    }
}
