import { Component, ComponentInterface, h, Host } from '@stencil/core';

/**
 * The divider is a separator between two elements, consisting of a horizontal line.
 * 
 * @cssprop --wcs-divider-color - Color of the divider
 * @cssprop --wcs-divider-height - Height (border-width) of the divider
 */
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
