import { Component, Host, h } from '@stencil/core';

/**
 * A content for a card inside card-body. Commonly used to provide more details about the card content. 
 * The information provided should be concise and easy to read.
 * 
 * By default, the margin is removed from the top and bottom of the card description.
 * 
 * @slot - The content of the card description.
 * 
 * @cssprop --wcs-card-content-color - The color of the card description.
 * @cssprop --wcs-card-content-font-size - The font size of the card description.
 */
@Component({
  tag: 'wcs-card-content',
  styleUrl: 'card-content.scss',
  shadow: true,
})
export class CardContent {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
