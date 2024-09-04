import { Component, ComponentInterface, h, Host } from '@stencil/core';

/**
 * The list-item-properties is a subcomponent of `wcs-list-item`. It represents a wrapper for a list of several `wcs-property`.
 */
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
