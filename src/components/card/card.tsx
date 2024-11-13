import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { CardMode } from './card-interface';

/**
 * The card component is a container that display content such as text, images, buttons, and lists.  
 * A card can be a single component, but is often made up of a header, title, subtitle, and content.  
 *
 * @cssprop --wcs-card-border-color - Border color of the card
 * @cssprop --wcs-card-border-radius - Border radius of the card
 * @cssprop --wcs-card-flat-border-width - Border width of the card when flat
 * @cssprop --wcs-card-background-color - Background color of the card
 * @cssprop --wcs-card-text-color - Text color of the card
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
