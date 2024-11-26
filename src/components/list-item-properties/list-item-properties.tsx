import { Component, ComponentInterface, h, Host } from '@stencil/core';

/**
 * The list-item-properties is a subcomponent of `wcs-list-item`. It represents a wrapper for a list of several `wcs-property`.
 * 
 * @slot property - Slot containing the `<wcs-property>` elements
 * 
 * @cssprop --wcs-list-item-properties-margin-bottom - Margin bottom of the properties
 * @cssprop --wcs-list-item-properties-gap - Gap between all list item properties
 * @cssprop --wcs-list-item-properties-separator-width - Separator width between all list item properties
 * @cssprop --wcs-list-item-properties-separator-color - Separator color between all list item properties
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
