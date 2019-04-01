import { Component, ComponentInterface } from '@stencil/core';


@Component({
    tag: 'wcs-app',
    styleUrl: 'app.scss',
    shadow: true
})
export class App implements ComponentInterface {
    render() {
        return [
            <slot name="header"/>,
            <slot name="sidebar"/>,
            <slot name="content"/>
        ];
    }
}
