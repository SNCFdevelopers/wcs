import { Component, Host, h, Event, EventEmitter, Listen } from '@stencil/core';

/**
 * The com-nav-item is a subcomponent of `wcs-com-nav`. It represents a list-item wrapper around a link.
 */
@Component({
    tag: 'wcs-com-nav-item',
    styleUrl: './com-nav-item.scss',
    shadow: true
})
export class ComNavItem {
    /**
     * Emitted when a user click on a final navigation action.
     *
     * Used by the com-nav component to close the mobile menu overlay when a user click on a final action.
     */
    @Event() private wcsClickOnFinalAction: EventEmitter<void>;
    
    @Listen('click')
    onClick() {
        this.wcsClickOnFinalAction.emit();
    }
    
    render() {
        return (
            <Host role="listitem">
                <slot></slot>
                <span class="arrow-container">
                        <span aria-hidden="true" class="arrow-icon">&#xf107;</span>
                </span>
            </Host>
        );
    }

}
