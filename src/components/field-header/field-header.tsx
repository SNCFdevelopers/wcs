import { Component, ComponentInterface, h, Host, } from '@stencil/core';

@Component({
    tag: 'wcs-field-header',
    shadow: true
})
export class FieldHeader implements ComponentInterface {
    render() {
        return (
            <Host slot="header"><slot /></Host>
        );
    }
}
