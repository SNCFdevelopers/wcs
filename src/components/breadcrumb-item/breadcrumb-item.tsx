import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

import { ICONS_FONT_CHEVRON_UNICODE } from '../breadcrumb/breadcrumb-constants';

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
     */
    @Prop() last = false;

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
