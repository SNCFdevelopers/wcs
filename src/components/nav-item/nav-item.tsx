import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-nav-item',
    styleUrl: 'nav-item.scss'
})
export class NavItem implements ComponentInterface {
    /**
     * This attribute specify the text of the item.
     */
    @Prop({ reflect: true }) text: string = '';

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
