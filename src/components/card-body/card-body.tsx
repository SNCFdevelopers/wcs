import { Component } from '@stencil/core';

@Component({
  tag: 'wcs-card-body',
  styleUrl: 'card-body.scss',
  shadow: true
})
export class CardBody {
  render() {
    return (<slot />);
  }
}
