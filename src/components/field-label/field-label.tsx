import { Component, ComponentInterface, h, Host, } from '@stencil/core';

/**
 * The field-label is a subcomponent of `wcs-field`. It represents the label or title of the field.
 */
@Component({
    tag: 'wcs-field-label',
    shadow: true
})
export class FieldLabel implements ComponentInterface {
    render() {
        return (
            <Host slot="label"><slot /></Host>
        );
    }
}
