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
                    <ul class="wcs-nav-top">
                        <slot />
                    </ul>
                    <wcs-nav-item text="Support" class="wcs-nav-bottom d-none d-lg-block">
                        <i class="material-icons icons icons-size-1x5">chat</i>
                    </wcs-nav-item>
                </nav>
            </Host>
        );
    }
}
