import { Component, h, Host } from '@stencil/core';

/**
 * The accordion-content is a subcomponent of `wcs-accordion`. It represents the text / content below an expanded accordion.
 * 
 * @cssprop --wcs-accordion-content-padding - Padding of the content
 * @cssprop --wcs-accordion-content-text-color - Text color of the content
 */
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
