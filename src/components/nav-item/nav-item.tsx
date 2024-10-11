import { Element, Component, ComponentInterface, h, Listen, Host } from '@stencil/core';
import { isEnterKey } from "../../utils/helpers";

/**
 * The nav-item component is a subcomponent of `wcs-nav` and should always be used inside it.  
 * They contain links to navigate to other pages of the website.
 * 
 * @cssprop --wcs-nav-item-font-weight - Font weight of the nav item
 * 
 * @cssprop --wcs-nav-item-height-desktop - Height of the nav item on desktop
 * @cssprop --wcs-nav-item-height-mobile - Height of the nav item on mobile
 * 
 * @cssprop --wcs-nav-item-font-size-desktop - Font size of the nav item on desktop
 * @cssprop --wcs-nav-item-font-size-mobile - Font size of the nav item on mobile
 * 
 * @cssprop --wcs-nav-item-border-horizontal-desktop - Border of the nav item on desktop
 * 
 * @cssprop --wcs-nav-item-background-color-default - Default background color of the nav item
 * @cssprop --wcs-nav-item-background-color-hover - Background color of the nav item when hovered
 * @cssprop --wcs-nav-item-background-color-press - Background color of the nav item when pressed
 * @cssprop --wcs-nav-item-background-color-active - Background color of the nav item when active
 * 
 * @cssprop --wcs-nav-item-color-default - Color of the nav item when default
 * @cssprop --wcs-nav-item-color-active - Color of the nav item when active
 * @cssprop --wcs-nav-item-color-hover - Color of the nav item when hovered
 * @cssprop --wcs-nav-item-color-press - Color of the nav item when pressed
 * 
 * @cssprop --wcs-nav-item-border-color-focus - Border color of the nav item when focused
 * @cssprop --wcs-nav-item-border-width-focus - Border width of the nav item when focused
 * 
 * @cssprop --wcs-nav-item-indicator-background-color - Background color of the nav item indicator
 * @cssprop --wcs-nav-item-indicator-width-desktop - Width of the nav item indicator on desktop
 * @cssprop --wcs-nav-item-indicator-width-mobile - Width of the nav item indicator on mobile
 * @cssprop --wcs-nav-item-indicator-height-desktop - Height of the nav item indicator on desktop
 * @cssprop --wcs-nav-item-indicator-height-mobile - Height of the nav item indicator on mobile
 * @cssprop --wcs-nav-item-indicator-border-radius-desktop - Border radius of the nav item indicator on desktop
 * @cssprop --wcs-nav-item-indicator-border-radius-mobile - Border radius of the nav item indicator on mobile
 * 
 * @cssprop --wcs-nav-item-transition-duration - Transition duration of the nav item
 */
@Component({
    tag: 'wcs-nav-item',
    styleUrl: 'nav-item.scss'
})
export class NavItem implements ComponentInterface {
    @Element() private el: HTMLElement;
    
    @Listen('keydown')
    onKeyDown(_event: KeyboardEvent) {
        if (isEnterKey(_event)) {
            this.el.click();
        }
    }

    render() {
        return (
            <Host role="listitem">
                <slot/>
            </Host>
        );
    }
}
