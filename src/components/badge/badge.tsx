import { Component, ComponentInterface, h } from '@stencil/core';

@Component({
    tag: 'wcs-badge',
    styleUrl: 'badge.scss',
    shadow: true
})
export class Badge implements ComponentInterface {
    render() {
        return (
            <slot />
        );
    }
}
