import { Element, Component, ComponentInterface, h, Listen, Host } from '@stencil/core';
import { isEnterKey } from "../../utils/helpers";

/**
 * The nav-item component is a subcomponent of `wcs-nav` and should always be used inside it.  
 * They contain links to navigate to other pages of the website.
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
