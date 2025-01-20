import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

/**
 * Lists are used for grouping a collection of related items.
 * 
 * Standard lists can be used either with or without icons. Depending on the context, the list can have one or more
 * actions (favourite, download, delete, etc.). Use standard lists with a unique action when each line has an action.
 *
 * @slot title - Slot containing the title of the list item
 * @slot properties - Slot containing the `<wcs-list-item-properties>` element
 * @slot actions - Slot containing the actions of the list item, prefer using some `<wcs-button>` inside
 * @slot description - Slot containing the description of the list item
 * 
 * @cssprop --wcs-list-item-padding - Padding of the list item
 * @cssprop --wcs-list-item-border-width - Border width of the list item
 * @cssprop --wcs-list-item-border-color - Border color of the list item
 * @cssprop --wcs-list-item-background-color-default - Background color of the list item
 * @cssprop --wcs-list-item-background-color-hover - Background color of the list item when hovered
 * @cssprop --wcs-list-item-background-color-active - Background color of the list item when active
 * @cssprop --wcs-list-item-transition-duration - Transition duration of the list item
 * @cssprop --wcs-list-item-title-color - Color of the title of the list item
 * @cssprop --wcs-list-item-title-font-weight - Font weight of the title of the list item
 * @cssprop --wcs-list-item-title-line-height - Line height of the title of the list item
 * @cssprop --wcs-list-item-title-margin-bottom - Margin bottom of the title of the list item
 * @cssprop --wcs-list-item-icon-color - Color of the icon of the list item
 * @cssprop --wcs-list-item-icon-margin-right - Margin right of the icon of the list item
 * @cssprop --wcs-list-item-actions-margin-left - Margin left of the actions of the list item
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
