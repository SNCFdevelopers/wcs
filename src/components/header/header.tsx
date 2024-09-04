import { Component, ComponentInterface, Element, h, Method } from '@stencil/core';
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";
import { AriaAttributeName } from "../../utils/mutable-aria-attribute";

const HEADER_INHERITED_ATTRS = [];

/**
 * The header component is an element that appears across the top of all pages on a website or application; it contains the logo, the site name and main actions.
 * 
 * @slot logo SNCF Logo
 * @slot title Title of your application
 * @slot actions Actions such as buttons, dropdown or any useful information to always display on your application
 */
@Component({
    tag: 'wcs-header',
    styleUrl: 'header.scss',
    shadow: true
})
export class Header implements ComponentInterface {
    @Element() private el!: HTMLElement;
    private nativeHeader!: HTMLElement;
    private inheritedAttributes: { [k: string]: any } = {};

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, HEADER_INHERITED_ATTRS),
        };
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeHeader, attr, value);
    }
    
    hostData() {
        return {
            'slot': 'header'
        };
    }

    render() {
        return (
            <header role="banner" ref={(el) => (this.nativeHeader = el)} {...this.inheritedAttributes}>
                <slot name="logo"/>
                <slot name="title"/>
                <slot name="actions"/>
            </header>
        );
    }
}
