import { Component, Event, Prop, ComponentDidLoad, EventEmitter, h } from '@stencil/core';

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

    // TODO: Use host element instead
    /**
     * This property should not be used,
     * it is only meant for internal use.
     * @internal
     * @ignore
     */
    @Prop({ reflectToAttr: true }) slot = 'wcs-tab';

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
            <slot></slot>
        );
    }
}
