import { Component, Prop, h, Host, Event, EventEmitter, ComponentInterface } from '@stencil/core';

/**
 * Tab content component.
 * Use this component to specify the content of a component.
 */
@Component({
    tag: 'wcs-tab',
    styleUrl: 'tab.scss',
    shadow: true,
})
export class Tab implements ComponentInterface {
    /**
     * The header you want to be displayed for this tab.
     */
    @Prop({ reflect: true }) header: string;

    /**
     * The id of the tab. It should be unique.
     */
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
            <Host slot="wcs-tab" role="tabpanel">
                <slot></slot>
            </Host>
        );
    }
}
