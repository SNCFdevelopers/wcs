import { Component, ComponentInterface, Element, h, Listen, Method, Prop, Watch } from '@stencil/core';

import { MDCRipple } from '@material/ripple';

import {
    WcsButtonMode,
    WcsButtonShape,
    WcsButtonSize,
    WcsButtonType
} from './button-interface';
import { hasShadowDom, inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from '../../utils/helpers';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

const BUTTON_INHERITED_ATTRS = ['tabindex', 'title'];

/**
 * The button component is used to trigger an action. It can also be a link when specifying href.
 * 
 * ## Accessibility guidelines 💡
 * > If your button doesn't contain text but only an image, you must set a relevant aria-label on the icon 👉 [see "Square" story below](#square)
 * 
 * ## Click event
 *
 * The WCS button relies on the native click event to pass a user click to your app.
 * For now, it's not possible for us to prevent the click event to be fired when the button's disabled attribute is true.
 * This means you'll receive click events on a disabled wcs button.
 * If you're using the button with a library like Angular or React, they have internal mechanisms to prevent this behavior. Your callbacks will therefore not be called.
 * To fix this problem, we plan to provide a wcsClick event in addition to the native click for applications developed without frameworks.
 *
 * @cssprop --wcs-button-plain-color-default - Text/icon color of a plain button
 * @cssprop --wcs-button-stroked-color-default - text/icon color of a stroked button
 * @cssprop --wcs-button-clear-color-default - text/icon color of a clear button
 * 
 * @cssprop --wcs-button-color-disabled - text/icon color disabled for mode plain, stroked, clear
 *
 * @cssprop --wcs-button-plain-background-color-default background color of a plain button
 * @cssprop --wcs-button-plain-background-color-disabled - disabled background color of a plain button
 * @cssprop --wcs-button-stroked-background-color-default background color of a stroked button
 * @cssprop --wcs-button-stroked-background-color-disabled - disabled background color of a stroked button
 * @cssprop --wcs-button-clear-background-color-default background color of a clear button
 * @cssprop --wcs-button-clear-background-color-disabled - disabled background color of a clear button
 * 
 * @cssprop --wcs-button-plain-ripple-color-default - ripple background color of a plain button
 * @cssprop --wcs-button-stroked-ripple-color-default - ripple background color of a stroked button
 * @cssprop --wcs-button-clear-ripple-color-default - ripple background color of a clear button
 * @cssprop --wcs-button-border-radius-default - border radius for a default button
 * @cssprop --wcs-button-border-radius-rounded - border radius for a rounded button
 *
 * @cssprop --wcs-button-stroked-border-width - border width of a stroked button
 * @cssprop --wcs-button-stroked-border-color-default - default border color of a stroked button
 * @cssprop --wcs-button-stroked-border-color-disabled - disabled border color of a stroked button
 *
 * @cssprop --wcs-button-height-s - height for a size s button
 * @cssprop --wcs-button-font-size-s - font-size for a size s button
 * @cssprop --wcs-button-padding-size-s - padding for a size s button
 *
 * @cssprop --wcs-button-height-m - height for a size m button
 * @cssprop --wcs-button-font-size-m - font-size for a size m button
 * @cssprop --wcs-button-padding-size-m - padding for a size m button
 *
 * @cssprop --wcs-button-height-l - height for a size l button
 * @cssprop --wcs-button-font-size-l - font-size for a size l button
 * @cssprop --wcs-button-padding-size-l - padding for a size l button
 *
 * @cssprop --wcs-button-font-weight - font weight of a plain,stroked,clear button
 */
@Component({
    tag: 'wcs-button',
    styleUrl: 'button.scss',
    shadow: {
        delegatesFocus: true
    }
})
export class Button implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLElement;
    private nativeButton?: HTMLButtonElement | HTMLAnchorElement;
    private inheritedAttributes: { [k: string]: any } = {};

    /**
     * Specify the button type.
     */
    @Prop({ mutable: true }) type: WcsButtonType = 'button';

    /**
     * Set a URL to point to.<br/>
     * If specified use a `a` tag instead of `btn`.
     */
    @Prop() href?: string;

    /**
     * Specifies where to open the linked document when using href (see prop above)<br/>
     * Default '_self' will open the linked document in the same frame as it was clicked
     */
    @Prop() target?: '_blank' | '_self';

    /**
     * Specify whether the button is disabled or not.
     */
    @Prop({ reflect: true }) disabled = false;

    /**
     * Specify whether the button should have a ripple effect or not.
     */
    @Prop() ripple = true;
    private mdcRipple: MDCRipple;

    /**
     * Specify the size of the button.
     */
    @Prop({ reflect: true }) size: WcsButtonSize = 'm';

    /**
     * Specify the shape of the button.
     */
    @Prop({ reflect: true }) shape: WcsButtonShape = 'normal';

    /**
     * This attribute specify the appearance of the button.
     */
    @Prop({ reflect: true }) mode: WcsButtonMode = 'plain';

    /**
     * Flag to display spinner until the end of action
     */
    @Prop({ reflect: true, mutable: true }) loading: boolean = false;

    /**
     * Native event click is emit event if we decide to stop propagation of it
     * @param ev
     */
    @Listen('click')  // TODO: define custom event click to be able to stop it's propagation when the custom button is disabled or is in loading state
    onClick(ev: Event) {
        if (this.disabled || this.loading) {
            ev.stopImmediatePropagation();
        }
        if (this.type !== 'button' && hasShadowDom(this.el)) {
            // this button wants to specifically submit a form
            // climb up the dom to see if we're in a <form>
            // and if so, then use JS to submit it
            const form = this.el.closest('form');
            if (form) {
                ev.preventDefault();

                const fakeButton = window.document.createElement('button');
                fakeButton.type = this.type;
                fakeButton.style.display = 'none';
                form.appendChild(fakeButton);
                fakeButton.click();
                fakeButton.remove();
            }
        }
    }

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, BUTTON_INHERITED_ATTRS),
        };
    }

    componentDidLoad() {
        this.mdcRipple = new MDCRipple(this.el.shadowRoot.querySelector('.wcs-inner-button'));
    }
    
    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeButton, attr, value);
    }

    private enabledRippleEffect() {
        this.mdcRipple.disabled = false;
    }

    private disabledRippleEffect() {
        this.mdcRipple.disabled = true;
    }

    private getTagName() {
        return this.href !== undefined ? 'a' : 'button';
    }

    @Watch('ripple')
    onRippleChange(): void {
        if (this.ripple) {
            this.enabledRippleEffect();
        } else {
            this.disabledRippleEffect();
        }
    }

    render() {
        const TagType = this.getTagName();
        const attrs = this.href !== undefined
            ? { href: this.href, role: 'button', target: this.target }
            : { type: this.type };
        return (
            <TagType
                {...attrs}
                class="wcs-inner-button"
                disabled = {this.disabled || this.loading}
                ref={(el: HTMLButtonElement | HTMLAnchorElement) => this.nativeButton = el}
                {...this.inheritedAttributes}
            >
                {
                    this.loading && <wcs-spinner></wcs-spinner>
                }
                <slot/>
            </TagType>
        );
    }
}
