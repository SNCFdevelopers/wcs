import { Component } from '@stencil/core';

@Component({
  tag: 'wcs-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class Card {
  render() {
    return (
      <slot />
    );
  }
}
