import { Component, ComponentInterface, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-divider',
    styleUrl: 'divider.scss',
    shadow: true
})
export class Divider implements ComponentInterface {
    render() {
        return (
            <Host></Host>
        );
    }
}
