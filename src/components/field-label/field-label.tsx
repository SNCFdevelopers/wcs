import { Component, ComponentInterface, h, Host, } from '@stencil/core';

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
