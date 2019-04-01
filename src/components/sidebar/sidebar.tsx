import { Component, ComponentInterface } from '@stencil/core';


@Component({
    tag: 'wcs-sidebar',
    styleUrl: 'sidebar.scss',
    shadow: true
})
export class Sidebar implements ComponentInterface {
    hostData() {
        return {
            'slot': 'sidebar'
        };
    }
    render() {
        return (
            <nav>
                <slot name="link"/>
            </nav>
        );
    }
}
