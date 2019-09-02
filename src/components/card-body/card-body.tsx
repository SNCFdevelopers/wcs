import { Component, ComponentInterface, h } from '@stencil/core';

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
