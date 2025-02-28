import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

import { ICONS_FONT_CHEVRON_UNICODE } from '../breadcrumb/breadcrumb-constants';

/**
 * The breadcrumb item represents a link inside a breadcrumb.
 * 
 * @slot <no-name> Main container slot
 * 
 * @cssprop --wcs-breadcrumb-item-max-height - Maximum height of the breadcrumb item
 * @cssprop --wcs-breadcrumb-item-line-height - Line height of the breadcrumb item
 * @cssprop --wcs-breadcrumb-item-font-size - Font size of the breadcrumb item
 * 
 * @cssprop --wcs-breadcrumb-item-icon-color - Color of the breadcrumb item icon
 * @cssprop --wcs-breadcrumb-item-icon-font-size - Font size of the breadcrumb item icon
 * 
 * @cssprop --wcs-breadcrumb-item-gap - Gap between text and chevron icon
 * @cssprop --wcs-breadcrumb-item-link-color - Color of the breadcrumb item link
 * @cssprop --wcs-breadcrumb-item-link-color-hover - Color of the breadcrumb item link when hovered
 * @cssprop --wcs-breadcrumb-item-link-font-weight - Font weight of the breadcrumb item link
 * 
 * @cssprop --wcs-breadcrumb-item-border-width-focus - Border width of the breadcrumb item when focused
 * @cssprop --wcs-breadcrumb-item-border-color-focus - Border color of the breadcrumb item when focused
 * 
 * @cssprop --wcs-breadcrumb-item-active-color - Color of the breadcrumb item when the link is active
 */
@Component({
    tag: 'wcs-breadcrumb-item',
    styleUrl: 'breadcrumb-item.scss',
    shadow: true,
})
export class BreadcrumbItem implements ComponentInterface {
    /**
     * Automatically set by the parent breadcrumb.
     * True if it is the last breadcrumb item.
     * (You shouldn't set this prop by yourself) 
     * @internal
     * @ignore
     */
    @Prop() last: boolean = false;

    render() {
        return (
            <Host role="listitem">
                <slot />
                {!this.last && (
                    <span class="item-icon" aria-hidden="true">
                        {ICONS_FONT_CHEVRON_UNICODE}
                    </span>
                )}
            </Host>
        );
    }
}
