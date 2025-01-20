import { Component, ComponentInterface, h, Host } from '@stencil/core';

/**
 * The field-content is a subcomponent of `wcs-field`. It represents the text content of the field.
 * 
 * @cssprop --wcs-field-content-color - Color of the content
 * @cssprop --wcs-field-content-font-weight - Font weight of the content
 * @cssprop --wcs-field-content-font-size - Font size of the content
 * @cssprop --wcs-field-content-line-height - Line height of the content
 */
@Component({
    tag: 'wcs-field-content',
    shadow: true
})
export class FieldContent implements ComponentInterface {
    render() {
        return (
            <Host slot="content">
                <slot/>
            </Host>
        );
    }
}
