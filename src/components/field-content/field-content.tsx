import { Component, ComponentInterface, h, Host } from '@stencil/core';

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
