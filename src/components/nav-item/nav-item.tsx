import { Component, ComponentInterface, h, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-nav-item',
    styleUrl: 'nav-item.scss'
})
export class NavItem implements ComponentInterface {
    /**
     * This attribute specify the text of the item.
     */
    @Prop({reflect: true})
    text: string = '';

    /**
     * Attributes mapped to a <a> tag.
     *
     * Don't forget to specify [routerLink] if using in conjuction with angular router.
     */
    @Prop({reflect: true})
    href: string;

    render() {
        return (
            <a href={this.href} class="wcs-nav-item-container">
                <slot/>
                <span class="wcs-nav-item-text">
                    {this.text}
                </span>
            </a>
        );
    }
}
