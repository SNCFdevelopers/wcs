import { Component, Host, h } from '@stencil/core';

/**
 * The card footer component is a container that display content at the bottom of the card.
 * It uses a flex layout to organize actions the user can take with a card
 * 
 * @cssprop --wcs-card-footer-gap - Gap of the card footer
 */
@Component({
    tag: 'wcs-card-footer',
    styleUrl: 'card-footer.scss',
    shadow: true,
})
export class CardFooter {

    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }

}
