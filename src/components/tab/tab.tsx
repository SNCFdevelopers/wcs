import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Tab content component.
 * Use this component to specify the content of a component.
 */
@Component({
    tag: 'wcs-tab',
    shadow: true,
})
export class Tab {
    /**
     * The header you want to be displayed for this tab.
     */
    @Prop({ reflect: true, mutable: true })
    header: string;

    render() {
        return (
            <Host slot="wcs-tab">
                <slot></slot>
            </Host>
        );
    }
}
