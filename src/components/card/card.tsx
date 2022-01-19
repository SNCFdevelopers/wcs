import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { CardMode } from './card-interface';

@Component({
    tag: 'wcs-card',
    styleUrl: 'card.scss',
    shadow: true
})
export class Card implements ComponentInterface {
    @Prop({reflect: true, mutable: true})
    mode: CardMode = 'raised';


    render() {
        return (
            <slot/>
        );
    }
}
