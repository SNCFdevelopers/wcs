import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-list-item',
    styleUrl: 'list-item.scss',
    shadow: true
})
export class ListItem implements ComponentInterface {
    /**
     * True if the item is active. Adds a background color that highlights it.
     */
    @Prop({ mutable: true }) activated: boolean = false;

    render() {
        return (
            <Host>
                <slot name="icon"/>
                <div class="content">
                    <div class="header">
                        <div>
                            <slot name="title"/>
                            <slot name="properties"/>
                        </div>
                        <slot name="actions"/>
                    </div>
                    <slot name="description"/>
                </div>
            </Host>
        );
    }
}
