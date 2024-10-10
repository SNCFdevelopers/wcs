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
 * 
 * @cssprop --wcs-header-background-color - Background color of the header
 * 
 * @cssprop --wcs-header-gap - Gap between elements in the header
 * @cssprop --wcs-header-height - Height of the header
 * @cssprop --wcs-header-logo-height - Height of the logo
 * @cssprop --wcs-header-padding-horizontal - Horizontal padding of the header
 * 
 * @cssprop --wcs-header-box-shadow - Box-shadow of the header
 * @cssprop --wcs-header-title-color - Color of the title
 * @cssprop --wcs-header-title-font-weight - Font weight of the title
 * @cssprop --wcs-header-title-font-size - Font size of the title
 * 
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
