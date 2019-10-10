import { Component, ComponentInterface, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-nav',
    styleUrl: 'nav.scss'
})
export class Nav implements ComponentInterface {
    render() {
        return (
            <Host>
                <nav class="wcs-nav-container">
                    <ul class="wcs-nav">
                        <slot />
                    </ul>
                </nav>
            </Host>
        );
    }
}
