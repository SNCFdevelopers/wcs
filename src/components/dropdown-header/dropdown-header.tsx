import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-dropdown-header',
    styleUrl: 'dropdown-header.scss',
    shadow: true
})
export class DropdownHeader {

    render() {
        return (
            <Host slot="item">
                <slot/>
            </Host>
        );
    }
}
