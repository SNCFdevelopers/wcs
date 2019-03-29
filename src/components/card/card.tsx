import { Component, ComponentInterface } from '@stencil/core';

@Component({
    tag: 'wcs-card',
    styleUrl: 'card.scss',
    shadow: true
})
export class Card implements ComponentInterface {
    render() {
        return (
            <slot />
        );
    }
}
