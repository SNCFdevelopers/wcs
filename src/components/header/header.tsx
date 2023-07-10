import { Component, ComponentInterface, h } from '@stencil/core';


/**
 * @slot logo SNCF Logo
 * @slot title Title of your application
 * @slot actions Actions such as buttons, dropdown or any useful information to always display on your application
 */
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
                <slot name="actions"/>
            </header>
        );
    }
}
