import { Component, ComponentInterface, Element, Prop } from '@stencil/core';
import { ButtonType } from './button-type';
import { Color, CssClassMap, RippleType } from '../../interface';
import * as MDCRipple from '@material/ripple';

@Component({
    tag: 'wcs-button',
    styleUrl: 'button.scss',
    shadow: true
})
export class Button implements ComponentInterface {
    @Element() private element: HTMLElement;
    @Prop({ mutable: true }) type: ButtonType = 'button';
    @Prop() href: string;
    @Prop() color?: Color;
    @Prop({ reflectToAttr: true }) disabled = false;
    @Prop() ripple = false;
    @Prop() rippleType: RippleType;


    private createColorClass(color: Color): CssClassMap {
        return {
            [`wcs-background-${color}-hover`]: true,
            [`wcs-color-${color}`]: true
        };
    }

    render() {
        const TagType = this.href !== undefined ? 'a' : 'button';
        const attrs = this.href !== undefined
            ? { href: this.href, role: 'button' }
            : { type: this.type };

        const cssClass = {
            class: {
                'wcs-inner-button': true,
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
        const surface = this.element.querySelector('.wcs-inner-button');
        console.log(MDCRipple);
        const ripple = new MDCRipple.MDCRipple(surface);
        ripple.unbounded = false;
      }
}
