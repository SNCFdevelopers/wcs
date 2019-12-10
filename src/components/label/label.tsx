import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-label',
    styleUrl: 'label.scss',
    shadow: true,
})
export class Label implements ComponentInterface {
    @Prop({ reflect: true })
    required = false;

    render() {
        return (
            <Host slot="label">
                <label>
                    <slot />
                </label>
            </Host>
        );
    }
}