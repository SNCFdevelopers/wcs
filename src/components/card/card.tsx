import { Component } from '@stencil/core';

@Component({
  tag: 'wcs-card',
  shadow: true
})
export class Card {
  hostData() {
    return {
      class: {
        'card': true
      }
    };
  }

  render() {
    return (
      <slot />)
  }
}
