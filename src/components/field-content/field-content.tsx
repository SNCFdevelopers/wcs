import { Component, ComponentInterface, h, Host } from '@stencil/core';

/**
 * The field-content is a subcomponent of `wcs-field`. It represents the text content of the field.
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
