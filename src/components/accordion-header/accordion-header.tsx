import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-accordion-header',
    // styleUrl: 'accordion-header.scss',
    shadow: true
})
export class AccordionHeader {
    render() {
        return (
            <Host slot="header">
                <slot />
            </Host>
        );
    }
}
