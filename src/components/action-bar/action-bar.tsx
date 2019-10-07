import { Component, ComponentInterface, h, Host } from '@stencil/core';

@Component({
    tag: 'wcs-action-bar',
    styleUrl: 'action-bar.scss',
    shadow: true
})
export class ActionBar implements ComponentInterface {
    render() {
        return (
            <Host>
                <h1><slot></slot></h1>
                <div class="actions"><slot name="actions"></slot></div>
            </Host>
        );
    }
}
