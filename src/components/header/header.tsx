import { Component, ComponentInterface } from '@stencil/core';


@Component({
    tag: 'wcs-header',
    styleUrl: 'header.scss',
    shadow: true
})
export class Header implements ComponentInterface {
    hostData() {
        return {
            'slot': 'header'
        };
    }
    render() {
        return (
            <header>
                <slot name="logo"/>
                <slot name="title"/>
            </header>
        );
    }
}
