import { Component, ComponentInterface, h, Host, Prop, } from '@stencil/core';

@Component({
    tag: 'wcs-field',
    styleUrl: 'field.scss',
    shadow: true
})
export class Field implements ComponentInterface {
    /**
     * true if the field has no data.
     * If the attribute is true, then the content of the wcs-content
     * component is clearer and should contain a message indicating
     * that no data is available for this field.
     */
    @Prop({ mutable: true, reflect: true }) isEmpty: boolean = false;

    render() {
        return (
            <Host>
                <slot name="header"/>
                <slot name="content"/>
            </Host>
        );
    }
}
