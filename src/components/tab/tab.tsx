import { Component, Event, Prop, ComponentDidLoad, EventEmitter, h, Host } from '@stencil/core';

/**
 * Tab content component.
 * Use this component to specify the content of a component.
 */
@Component({
    tag: 'wcs-tab',
    shadow: true,
})
export class Tab implements ComponentDidLoad {
    /**
     * The header you want to be displayed for this tab.
     */
    @Prop({ reflectToAttr: true, mutable: true })
    header: string;

    // TODO: Use host element instead
    /**
     * XXX: Temporary fix, see tabs component
     * @internal
     * @ignore
     */
    @Event() wcsTabDidLoad: EventEmitter;

    componentDidLoad() {
        this.wcsTabDidLoad.emit();
    }

    render() {
        return (
            <Host slot="wcs-tab">
                <slot></slot>
            </Host>
        );
    }
}
