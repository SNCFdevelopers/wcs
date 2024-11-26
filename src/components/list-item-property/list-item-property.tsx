import { Component, ComponentInterface, h, Host } from '@stencil/core';

/**
 * The list-item-property is a subcomponent of `wcs-list-item`.
 * Wrapped in a `wcs-list-item-properties`, it represents a property to describe an item.
 * 
 * @slot <no-name> - Main container slot
 * 
 * @cssprop --wcs-list-item-property-font-weight - Font weight of the property
 * @cssprop --wcs-list-item-property-color - Color of the property
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
