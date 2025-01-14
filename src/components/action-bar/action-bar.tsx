import { Component, ComponentInterface, Element, h, Host, Prop, State } from '@stencil/core';

/**
 * The action-bar component is a group of elements appearing across the top of all pages on a business application.
 * 
 * @cssprop --wcs-action-bar-background-color - Background color of the action bar
 * @cssprop --wcs-action-bar-gap - Gap between the title and the tabs
 * @cssprop --wcs-action-bar-gap-actions - Gap between the title and the actions
 * @cssprop --wcs-action-bar-min-height - Minimum height of the action bar
 * @cssprop --wcs-action-bar-padding-horizontal - Horizontal padding of the action bar
 * @cssprop --wcs-action-bar-padding-vertical - Vertical padding of the action bar
 * @cssprop --wcs-action-bar-tabs-margin-top - Margin top of the tabs when slotted
 * @cssprop --wcs-action-bar-title-font-size - Font size of the title
 * @cssprop --wcs-action-bar-title-font-weight - Font weight of the title
 * @cssprop --wcs-action-bar-title-color - Color of the title
 * @cssprop --wcs-tabs-gutter-border-width - Border width of the gutter
 * @cssprop --wcs-tabs-gutter-background-color - Background color of the gutter
 */
@Component({
    tag: 'wcs-action-bar',
    styleUrl: 'action-bar.scss',
    shadow: true
})
export class ActionBar implements ComponentInterface {
    @Element() private el: HTMLWcsActionBarElement;
    /**
     * Determines if the action bar should have a border at the bottom.
     * You should not use this property if a gutter is already present on tabs
     */
    @Prop() gutter: boolean;
    @State() private hasTabs = false;

    componentWillLoad(): Promise<void> | void {
        this.hasTabs = !!this.el.querySelector('[slot="tabs"]');
    }

    render() {
        return (
            <Host>
                <div class="title-actions" data-has-tabs={this.hasTabs}>
                    <h1>
                        <slot></slot>
                    </h1>
                    <div class="actions">
                        <slot name="actions"></slot>
                    </div>
                </div>
                <div class="tabs-container">
                    <slot name="tabs"></slot>
                </div>
            </Host>
        );
    }
}
