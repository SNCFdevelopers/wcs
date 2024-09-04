import { Component, Prop, ComponentInterface, h, Element, Method } from '@stencil/core';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";

const ICON_INHERITED_ATTRS = ['title'];

/**
 * The icon component is a graphic symbol designed to visually indicate the purpose of an interface element.
 */
@Component({
    tag: 'wcs-icon'
})
export class Icon implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLElement;
    private nativeIcon!: HTMLElement;
    private inheritedAttributes: { [k: string]: any } = {};
    
    @Prop() icon: string;
    @Prop() size: 'x5' | 'x75' | '1x' | '1x2' | '1x5' | '1x7' | '2x' | '3x' | '30px' | '50px' | '66px' | '90px' | '96px' | '140px';

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, ICON_INHERITED_ATTRS),
        };
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeIcon, attr, value);
    }
    
    render() {
        const cssClass = {
            class: {
                [`icons-${this.icon}`]: true,
                [`icons-size-${this.size}`]: true
            }
        };
        return (
            <i {...cssClass} ref={(el) => (this.nativeIcon = el)} {...this.inheritedAttributes}>
            </i>
        );
    }
}
