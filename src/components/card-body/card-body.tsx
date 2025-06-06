import { Component, ComponentInterface, h, Host, Method, State } from '@stencil/core';
import { CardOrientation } from '../card/card-interface';

/**
 * The card-body is a subcomponent of `wcs-card`. It represents content of the card with an extra padding around.
 *
 * @slot default - Default slot for the card body content. You can put anything you want. If you want a structured card, you can use `wcs-card-header`, `wcs-card-content`, and `wcs-card-footer` as slot
 *
 * @cssprop --wcs-card-body-padding - Padding of the card body
 * @cssprop --wcs-card-body-gap - Gap between each element in the card body
 */
@Component({
    tag: 'wcs-card-body',
    styleUrl: 'card-body.scss',
    shadow: true
})
export class CardBody implements ComponentInterface {
    @State() private orientation: CardOrientation = null;

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
            </Host>
        );
    }
}
