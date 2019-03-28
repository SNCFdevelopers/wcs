import { Component, ComponentInterface, Element, Prop, Listen } from '@stencil/core';

import MDCRipple from '@material/ripple';

import { ButtonType } from './button-interface';
import { Color, CssClassMap } from '../../interface';
import { hasShadowDom } from '../../utils/helpers';

/**
 * Button component, can also be a link when specifying href.
 */
@Component({
    tag: 'wcs-button',
    styleUrl: 'button.scss',
    shadow: true
})
export class Button implements ComponentInterface {
    @Element() el!: HTMLElement;

    @Prop({ context: 'window' }) win!: Window;

    /**
     * Specify the button type.
     */
    @Prop({ mutable: true }) type: ButtonType = 'button';

    /**
     * Set a URL to point to.
     * If specified use a `a` tag instead of `btn`.
     */
    @Prop() href?: string;

    /**
     * Specify the button color.
     */
    @Prop() color: Color = 'primary';

    /**
     * Specify wether the button is disabled or not.
     */
    @Prop({ reflectToAttr: true }) disabled = false;

    /**
     * Specify wether the button should have a ripple effect or not.
     */
    @Prop() ripple = false;

    /**
     * This attribute specifies the size of the button.
     * Setting this attribute will change the height and padding of a button.
     */
    @Prop({ reflectToAttr: true }) mode: 'normal' | 'small' | 'block' | 'icon-only' | 'round' = 'normal';

    @Element() element: HTMLElement;

    @Listen('click')
    onClick(ev: Event) {
        if (this.type !== 'button' && hasShadowDom(this.el)) {
            // this button wants to specifically submit a form
            // climb up the dom to see if we're in a <form>
            // and if so, then use JS to submit it
            const form = this.el.closest('form');
            if (form) {
                ev.preventDefault();

                const fakeButton = this.win.document.createElement('button');
                fakeButton.type = this.type;
                fakeButton.style.display = 'none';
                form.appendChild(fakeButton);
                fakeButton.click();
                fakeButton.remove();
            }
        }
    }
    render() {
        const TagType = this.href !== undefined ? 'a' : 'button';
        const attrs = this.href !== undefined
            ? { href: this.href, role: 'button' }
            : { type: this.type };

        return (
            <TagType
                {...attrs}
                {...this.generateClasses()}
                {...this.disabled === true ? { disabled: true } : null}
            >
                <slot />
            </TagType>
        );
    }

    private generateClasses() {
        return {
            class: {
                'wcs-inner-button': true,
                'wcs-inner-button-disabled': this.disabled,
                'wcs-inner-button-small': this.mode === 'small',
                'wcs-inner-button-block': this.mode === 'block',
                'wcs-inner-button-icon-only': this.mode === 'icon-only',
                'wcs-inner-button-rounded': this.mode === 'round',
                ...this.createColorClasses(this.color)
            }
        };
    }

    private createColorClasses(color: Color): CssClassMap {
        return {
            [`wcs-background-${color}-hover`]: !this.disabled,
            [`wcs-color-${color}`]: !this.disabled
        };
    }

    componentDidLoad() {
        this.addRippleEffect();
    }

    private addRippleEffect() {
        const ripple = new MDCRipple.MDCRipple(this.element.shadowRoot.querySelector('.wcs-inner-button'));
        ripple.unbound = true;
    }
}
