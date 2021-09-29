import { Component, Prop, h, Host, Event, EventEmitter } from '@stencil/core';

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

    @Prop() itemKey: any;

    // TODO: See if there is a solution that doesn't pollute the API.
    /**
     * Do not use, meant for internal use only.
     * @inner
     * @ignore
     */
    @Event()
    tabLoaded!: EventEmitter<void>;

    componentDidLoad() {
        this.tabLoaded.emit();
    }

    render() {
        return (
            <Host slot="wcs-tab">
                <slot></slot>
            </Host>
        );
    }
}
