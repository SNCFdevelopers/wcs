import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-hint',
    styleUrl: 'hint.scss',
    shadow: true,
})
export class Hint implements ComponentInterface {
    /**
     * Whether the component should display the small version of the hint
     */
    @Prop({ reflect: true, mutable: true })
    small: boolean = false;

    render() {
        return (
            <Host slot="messages">
                <slot />
            </Host>
        );
    }
}
