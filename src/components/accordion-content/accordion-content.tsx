import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-accordion-content',
    styleUrl: 'accordion-content.scss',
    shadow: true
})
export class AccordionContent {
    render() {
        return (
            <Host slot="content">
                <slot/>
            </Host>
        );
    }
}
