import { Component, ComponentInterface, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-list-item-property',
    styleUrl: 'list-item-property.scss',
    shadow: true
})
export class ListItemProperty implements ComponentInterface {
    render() {
        return (
            <Host slot="property">
                <slot/>
            </Host>
        );
    }
}
