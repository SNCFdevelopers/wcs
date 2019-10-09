import { Component, ComponentInterface, h } from '@stencil/core';

@Component({
    tag: 'wcs-nav',
    styleUrl: 'nav.scss',
    shadow: true
})
export class Nav implements ComponentInterface {
    render() {
        return (
            <nav class="wcs-nav-container">
                <slot/>
                <slot name="bottom"/>
            </nav>
        );
    }
}
