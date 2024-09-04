import { Component, h, Host } from '@stencil/core';

/**
 * The accordion-header is a subcomponent of `wcs-accordion`. It represents the heading text inside the accordion panel.
 */
@Component({
    tag: 'wcs-accordion-header',
    styleUrl: 'accordion-header.scss',
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
