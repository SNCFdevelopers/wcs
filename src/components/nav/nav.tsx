import { Component, ComponentInterface, Element, forceUpdate, h, Watch } from '@stencil/core';
import { inheritAttributes } from "../../utils/helpers";

const NAV_ARIA_INHERITED_ATTRS = ['aria-label'];

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
export class Nav implements ComponentInterface {
    
    @Element() private el!: HTMLWcsProgressBarElement;
    
    private inheritedAttributes: { [k: string]: any } = {};

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAttributes(this.el, NAV_ARIA_INHERITED_ATTRS)
        };
    }
    
    @Watch('aria-label')
    onAriaLabelChange() {
        this.inheritedAttributes = {
            ...inheritAttributes(this.el, NAV_ARIA_INHERITED_ATTRS)
        };
        forceUpdate(this);
    }
    
    render() {
        return (
            <nav role="navigation" class="wcs-nav-container" {...this.inheritedAttributes}>
                <div role="list">
                    <slot/>
                    <slot name="bottom"/>
                </div>
            </nav>
        );
    }
}
