import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-hint',
    styleUrl: 'hint.scss',
    shadow: true,
})
export class Label implements ComponentInterface {
    @Prop({ reflect: true, mutable: true })
    small = false;

    render() {
        return (
            <Host slot="messages">
                <slot />
            </Host>
        );
    }
}