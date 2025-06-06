import { Component, ComponentInterface, h, Prop, Element, Watch } from '@stencil/core';
import { CardMode, CardOrientation } from './card-interface';

/**
 * The card component is a container that display content such as text, images, buttons, and lists.  
 * A card can be a single component, but is often made up of a header, title, subtitle, and content.
 * 
 * While they're very flexible, it's important to use them consistently. You may use `wcs-card-media` outside `wcs-card-body`
 * and `wcs-card-header` `wcs-card-content` `wcs-card-footer` within `wcs-card-body` to make sure the card is well-designed.
 *
 * @slot - Default slot for the card content
 * 
 * @cssprop --wcs-card-border-color - Border color of the card
 * @cssprop --wcs-card-border-radius - Border radius of the card
 * @cssprop --wcs-card-border-width - Border width of the card
 * @cssprop --wcs-card-background-color - Background color of the card
 * @cssprop --wcs-card-text-color - Text color of the card
 * @cssprop --wcs-card-horizontal-min-height - Min height of the card when horizontal
 */
@Component({
    tag: 'wcs-card',
    styleUrl: 'card.scss',
    shadow: true
})
export class Card implements ComponentInterface {
    @Element() private el!: HTMLElement;
    @Prop({reflect: true, mutable: true})
    mode: CardMode = 'flat';
    /**
     * The orientation of the card, can be horizontal or vertical
     */
    @Prop({reflect: true})
    orientation: CardOrientation = null;

    @Watch('orientation')
    orientationChanged() {
        this.updateWcsCardImageOrientation();
    }

    private onSlotChange() {
        if(this.orientation) {
            this.updateWcsCardBodyOrientation();
            this.updateWcsCardImageOrientation();
        }
    }

    private updateWcsCardImageOrientation() {
        this.findWcsCardMedia()?.setOrientation(this.orientation);
    }

    private updateWcsCardBodyOrientation() {
        this.findWcsCardBody()?.setOrientation(this.orientation);
    }

    private findWcsCardMedia(): HTMLWcsCardMediaElement {
        return this.el.querySelector('wcs-card-media');
    }

    private findWcsCardBody(): HTMLWcsCardBodyElement {
        return this.el.querySelector('wcs-card-body');
    }

    render() {
        return (
            <slot onSlotchange={() => this.onSlotChange()}/>
        );
    }
}
