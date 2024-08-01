import { Component, ComponentInterface, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-breadcrumb-item',
    styleUrl: 'breadcrumb-item.scss',
    shadow: true,
})
export class BreadcrumbItem implements ComponentInterface {
    render() {
        return (
            <Host role="listitem">
                <slot />
            </Host>
        );
    }
}
