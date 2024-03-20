import { Component, ComponentInterface, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-error',
    styleUrl: 'error.scss',
    shadow: true,
})
export class Label implements ComponentInterface {
    render() {
        return (
            <Host aria-live="polite" aria-atomic="true" slot="error">
                <slot />
            </Host>
        );
    }
}
