import { Component, Host, h, Method, State } from '@stencil/core';
import { CardOrientation } from "../card/card-interface";

/**
 * The card media component is a container that display an image/icon inside a card. 
 * On horizontal orientation, the image/icon has an aspect ratio of 1/1
 * On vertical orientation, the image/icon has an aspect ratio of 16/9.
 * 
 * @slot - The default slot where the image/icon is displayed
 * @slot vertical - The slot where the image/icon is displayed when the card is vertical
 * @slot horizontal - The slot where the image/icon is displayed when the card is horizontal
 * 
 * @cssprop --wcs-card-media-max-width-horizontal - Max width of the image when the card is horizontal
 */
@Component({
    tag: 'wcs-card-media',
    styleUrl: 'card-media.scss',
    shadow: true,
})
export class CardMedia {
    @State() private orientation: CardOrientation = 'vertical';

    /**
     * @internal this method is not intended to be used by the user
     */
    @Method()
    async setOrientation(orientation: CardOrientation) {
        this.orientation = orientation;
    }

    render() {
        return (
            <Host class={this.orientation}>
                <slot></slot>
                {this.orientation === 'vertical' ? <slot name="vertical"></slot> : <slot name="horizontal"></slot>}
            </Host>
        );
    }

}
