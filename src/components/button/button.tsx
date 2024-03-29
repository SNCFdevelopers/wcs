import {Component, ComponentInterface, Element, h, Listen, Prop, Watch} from '@stencil/core';

import { MDCRipple } from '@material/ripple';

import {
    isWcsButtonSize,
    WcsButtonMode,
    WcsButtonShape,
    WcsButtonSize,
    WcsButtonSizeValues,
    WcsButtonType
} from './button-interface';
import { hasShadowDom } from '../../utils/helpers';

/**
 * Button component, can also be a link when specifying href.
 *
 * ## Click event
 *
 * The WCS button relies on the native click event to pass a user click to your app.
 * For now, it's not possible for us to prevent the click event to be fired when the button's disabled attribute is true.
 * This means you'll receive click events on a disabled wcs button.
 * If you're using the button with a library like Angular or React, they have internal mechanisms to prevent this behavior. Your callbacks will therefore not be called.
 * To fix this problem, we plan to provide a wcsClick event in addition to the native click for applications developed without frameworks.
 */
@Component({
    tag: 'wcs-button',
    styleUrl: 'button.scss',
    shadow: {
        delegatesFocus: true
    }
})
export class Button implements ComponentInterface {
    @Element() private el!: HTMLElement;

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
    @Prop({mutable: true}) loading: boolean = false;

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
        if (!isWcsButtonSize(this.size)) {
            console.error(`Invalid size value for wcs-button : "${this.size}". Must be one of "${WcsButtonSizeValues.join(', ')}"`);
            this.size = "m"; // Default fallback value
        }
    }

    componentDidLoad() {
        this.mdcRipple = new MDCRipple(this.el.shadowRoot.querySelector('.wcs-inner-button'));
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
            >
                {
                    this.loading && <wcs-spinner></wcs-spinner>
                }
                <slot/>
            </TagType>
        );
    }
}
