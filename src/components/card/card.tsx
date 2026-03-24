import { Component, ComponentInterface, h, Prop, Element, Watch } from '@stencil/core';
import { CardMode, CardOrientation } from './card-interface';

/**
 * The card component is a container that displays content such as text, images, buttons, and lists.
 * A card can be a single component, but is often made up of a header, title, subtitle, and content.
 *
 * While cards are flexible, it is important to use them consistently. You may use `wcs-card-media` outside
 * `wcs-card-body`, and `wcs-card-header`, `wcs-card-content`, and `wcs-card-footer` within `wcs-card-body`
 * to keep the card structure clear and well-designed.
 *
 * `wcs-card-content` is intended for textual content only. If you need to display a form or other rich interactive
 * content inside a card, place it directly inside `wcs-card-body` instead of wrapping it in `wcs-card-content`.
 *
 * A card can also be used as a visual wrapper to get the card border, radius, and background. In that case, prefer a
 * direct child `wcs-card-body` when you need to host structured content.
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
