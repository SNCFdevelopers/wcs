import { Component, ComponentInterface, h, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-card',
    styleUrl: 'card.scss',
    shadow: true
})
export class Card implements ComponentInterface {
    @Prop({reflect: true, mutable: true})
    mode: 'flat' | 'raised' = 'raised';


    render() {
        return (
            <slot />
        );
    }
}
