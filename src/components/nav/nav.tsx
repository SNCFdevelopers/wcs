import { Component, ComponentInterface, Element, h, Method } from '@stencil/core';
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

const NAV_ARIA_INHERITED_ATTRS = ['title'];

/**
 * The nav component is a container for navigation links to other pages of the website.
 * 
 * @slot bottom Bottom part of the nav to put to nav-items at the end
 */
@Component({
    tag: 'wcs-nav',
    styleUrl: 'nav.scss',
    shadow: true
})
export class Nav implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLWcsProgressBarElement;
    private nativeNav!: HTMLElement;
    private inheritedAttributes: { [k: string]: any } = {};

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, NAV_ARIA_INHERITED_ATTRS),
        };
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeNav, attr, value);
    }
    
    render() {
        return (
            <nav role="navigation"
                 class="wcs-nav-container"
                 ref={(el) => (this.nativeNav = el)}
                 {...this.inheritedAttributes}>
                <div role="list">
                    <slot/>
                    <slot name="bottom"/>
                </div>
            </nav>
        );
    }
}
