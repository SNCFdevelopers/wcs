import { Component, Event, Prop, ComponentDidLoad, EventEmitter } from '@stencil/core';

/**
 *
 */
@Component({
    tag: 'wcs-tab',
    shadow: true,
})
export class Tab implements ComponentDidLoad {
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
