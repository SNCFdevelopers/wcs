import { Component, ComponentInterface, h, Host, } from '@stencil/core';

/**
 * This field component can be used to display the details of an entity. It is built around the label and the content of the field.
 * 
 * @slot label Label of the field
 * @slot content Content of the field
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
