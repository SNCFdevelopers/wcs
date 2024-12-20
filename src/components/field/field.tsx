import { Component, ComponentInterface, h, Host, } from '@stencil/core';

/**
 * This field component can be used to display the details of an entity. It is built around the label and the content of the field.
 * 
 * @slot label Label of the field
 * @slot content Content of the field
 *
 * @cssprop --wcs-field-label-color - The color of the label
 * @cssprop --wcs-field-label-font-weight - The font weight of the label
 * @cssprop --wcs-field-label-font-size - The font size of the label
 * @cssprop --wcs-field-label-line-height - The line height of the label
 * 
 * @cssprop --wcs-field-content-color - The color of the content
 * @cssprop --wcs-field-content-font-weight - The font weight of the content
 * @cssprop --wcs-field-content-font-size - The font size of the content
 * 
 * @cssprop --wcs-field-margin-top - The margin top of the field 
 * @cssprop --wcs-field-margin-bottom - The margin bottom of the field
 * @cssprop --wcs-field-gap - The gap between the label and the content
 *
 */
@Component({
    tag: 'wcs-field',
    styleUrl: 'field.scss',
    shadow: true
})
export class Field implements ComponentInterface {
    render() {
        return (
            <Host>
                <slot name="label"/>
                <slot name="content"/>
            </Host>
        );
    }
}
