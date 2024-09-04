import { Component, ComponentInterface, h } from '@stencil/core';

/**
 * The card-body is a subcomponent of `wcs-card`. It represents content of the card with an extra padding around.
 */
@Component({
    tag: 'wcs-card-body',
    styleUrl: 'card-body.scss',
    shadow: true
})
export class CardBody implements ComponentInterface {
    render() {
        return (<slot />);
    }
}
