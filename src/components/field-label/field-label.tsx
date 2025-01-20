import { Component, ComponentInterface, h, Host, } from '@stencil/core';

/**
 * The field-label is a subcomponent of `wcs-field`. It represents the label or title of the field.
 * 
 * @cssprop --wcs-field-label-color - Color of the label
 * @cssprop --wcs-field-label-font-weight - Font weight of the label
 * @cssprop --wcs-field-label-font-size - Font size of the label 
 * @cssprop --wcs-field-label-line-height - Line height of the label
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
