import { Component, Event, Prop, ComponentDidLoad, EventEmitter, h, Host } from '@stencil/core';

/**
 *
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
            <Host>
                <slot></slot>
            </Host>
        );
    }
}
