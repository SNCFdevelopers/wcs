import { Component, Host, h, Prop, ComponentInterface } from '@stencil/core';

@Component({
    tag: 'wcs-com-nav',
    styleUrl: 'com-nav.scss',
    shadow: true,
})
export class ComNav implements ComponentInterface{
    @Prop() appName: string;

    render() {
        return (
            <Host>
                <div class="container">
                    <div class="container-left">
                        <div class="app-name">{this.appName}<slot name="app-name"/></div>
                        <div class="menu-bar">
                            <slot />
                        </div>
                    </div>
                    <div><slot name="actions"/></div>
                </div>
            </Host>
        );
    }

}
