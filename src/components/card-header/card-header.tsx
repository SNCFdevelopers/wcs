import { Component, Host, h } from '@stencil/core';

/**
 * The card header component is a container that display a title and an action, it can also display a label as a `<wcs-badge>` component.
 * 
 * The default slotted element is displayed as a `<h3>` element
 *
 * @slot badges - Content for the badge label
 * @slot actions - Button or any action to display on the right of the title
 *
 * @cssprop --wcs-card-header-title-color - Color of the title
 * @cssprop --wcs-card-header-title-font-size - Font size of the title
 * @cssprop --wcs-card-header-title-font-weight - Font weight of the title
 * @cssprop --wcs-card-header-gap - Gap between the title and the badge
 */
@Component({
    tag: 'wcs-card-header',
    styleUrl: 'card-header.scss',
    shadow: true,
})
export class CardHeader {
    render() {
        return (
            <Host>
                <slot name="badges"></slot>
                <div class="header-content">
                    <h3><slot></slot></h3>
                    <slot name="actions"></slot>
                </div>
            </Host>
        );
    }
}
