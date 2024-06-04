import { Component, Host, h } from '@stencil/core';

@Component({
    tag: 'wcs-com-nav-item',
    styleUrl: './com-nav-item.scss',
    shadow: true
})
export class ComNavItem {

    render() {
        return (
            <Host role="listitem">
                <slot></slot>
                <span class="arrow-container">
                        <span aria-hidden="true" class="arrow-icon">&#xf107;</span>
                </span>
            </Host>
        );
    }

}
