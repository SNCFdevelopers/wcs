import { Component, ComponentInterface, Element, Prop } from '@stencil/core';
import { ButtonType } from './button-type';
import { Color, CssClassMap, RippleType } from '../../interface';
import MDCRipple from '@material/ripple';

@Component({
    tag: 'wcs-button',
    styleUrl: 'button.scss',
    shadow: true
})
export class Button implements ComponentInterface {
    @Element() element: HTMLElement;
    @Prop({ mutable: true }) type: ButtonType = 'button';
    @Prop() href: string;
    @Prop() color?: Color;
    /**
     * Specify either the button is disable or not
     */
    @Prop({ reflectToAttr: true }) disabled = false;
    @Prop() ripple = false;
    @Prop() rippleType: RippleType;
    /**
     * This attribute specifies the size of the button. Setting this attribute will change the height and padding of a button.
     */
    @Prop({ reflectToAttr: true }) size: 'normal' | 'small' | 'block' = 'normal';


    private createColorClass(color: Color): CssClassMap {
        return {

            [`wcs-background-${color}-hover`]: !this.disabled,
            [`wcs-color-${color}`]: !this.disabled
        };
    }

    render() {
        const TagType = this.href !== undefined ? 'a' : 'button';
        const attrs = this.href !== undefined
        ? { href: this.href, role: 'button' }
        : { type: this.type };

        const cssClass = {
            class: {
                'wcs-disabled-button': this.disabled,
                'wcs-inner-button-small': this.size === 'small',
                'wcs-inner-button-block': this.size === 'block',
                'wcs-inner-button': true,
                'mdc-button': true,
                ...this.createColorClass(this.color)
            }
        };

        return (
            <TagType
                {...attrs}
                {...cssClass}
                {...this.disabled === true ? { disabled: true } : null}
            >
                <slot />
            </TagType>
        );
    }

    componentDidLoad() {
        const ripple = new MDCRipple.MDCRipple(this.element.shadowRoot.querySelector('.wcs-inner-button'));
        ripple.unbounded = false;
      }
}
