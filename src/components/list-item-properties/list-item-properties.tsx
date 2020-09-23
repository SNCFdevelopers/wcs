import { Component, ComponentInterface, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-list-item-properties',
    styleUrl: 'list-item-properties.scss',
    shadow: true
})
export class ListItemProperties implements ComponentInterface {
    render() {
        return (
            <Host slot="properties">
                <slot name="property"/>
            </Host>
        );
    }
}
