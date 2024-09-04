import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

/**
 * Lists are used for grouping a collection of related items.
 * 
 * Standard lists can be used either with or without icons. Depending on the context, the list can have one or more
 * actions (favourite, download, delete, etc.). Use standard lists with a unique action when each line has an action.
 */
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
