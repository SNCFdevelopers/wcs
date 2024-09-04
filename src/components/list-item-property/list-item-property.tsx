import { Component, ComponentInterface, h, Host } from '@stencil/core';

/**
 * The list-item-property is a subcomponent of `wcs-list-item`.
 * Wrapped in a `wcs-list-item-properties`, it represents a property to describe an item.
 */
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
