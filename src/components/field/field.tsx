import { Component, ComponentInterface, h, Host, } from '@stencil/core';

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
