import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';
import { WcsNavItemPosition } from './nav-item-interface';

@Component({
    tag: 'wcs-nav-item',
    styleUrl: 'nav-item.scss',
    shadow: true
})
export class NavItem implements ComponentInterface {
    /**
     * This attribute specify the text of the item.
     */
    @Prop({ reflect: true }) text: string = '';

    /**
     * This attribute specify the position of the item.
     */
    @Prop({ reflect: true }) position: WcsNavItemPosition = 'top';

    render() {
        return (
            <Host>
                <li>
                    <a href="#" class="wcs-nav-item-container">
                        <slot />
                        <span class="wcs-nav-item-text">
                            { this.text }
                        </span>
                    </a>
                </li>
            </Host>
        );
    }
}
