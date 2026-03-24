import { Component, Host, h } from '@stencil/core';

/**
 * A text content container for a card inside `wcs-card-body`.
 * Commonly used to provide additional details about the card content.
 * The information provided should be concise and easy to read.
 *
 * Use `wcs-card-content` for text only. It applies text-oriented layout rules and overflow behavior.
 * Forms and other rich interactive content should be placed directly inside `wcs-card-body`, not inside
 * `wcs-card-content`.
 *
 * By default, the margin is removed from the top and bottom of the card description.
 *
 * @slot - The textual content of the card description.
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
