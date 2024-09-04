import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { CardMode } from './card-interface';

/**
 * The card component is a container that display content such as text, images, buttons, and lists.  
 * A card can be a single component, but is often made up of a header, title, subtitle, and content.  
 */
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
