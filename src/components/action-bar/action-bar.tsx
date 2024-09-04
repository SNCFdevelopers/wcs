import { Component, ComponentInterface, Element, h, Host, Prop, State } from '@stencil/core';

/**
 * The action-bar component is a group of elements appearing across the top of all pages on a business application.
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
