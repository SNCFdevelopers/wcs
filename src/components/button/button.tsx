import { Component, ComponentInterface, Prop } from '@stencil/core';
import { ButtonType } from './button-type';
import { Color, CssClassMap } from '../../interface';

@Component({
    tag: 'wcs-button'
})
export class Button implements ComponentInterface {
    @Prop({ mutable: true }) type: ButtonType = 'button';
    @Prop() href: string;
    @Prop() color?: Color;
    @Prop({ reflectToAttr: true }) size?: 'small' | 'block';
    @Prop({ reflectToAttr: true }) disabled = false;

    private createColorClass(color: Color | undefined | null): CssClassMap | undefined {
        return (typeof color === 'string' && color.length > 0) ? {
            [`btn-${color}`]: true
        } : undefined;
    }

    render() {
        const TagType = this.href !== undefined ? 'a' : 'button';
        const attrs = this.href !== undefined
            ? { href: this.href, role: 'button' }
            : { type: this.type };

        const cssClass = {
            class: {
                'btn': true,
                [`btn-${this.size === 'small' ? 'sm' : this.size}`]: this.size !== undefined,
                ...this.createColorClass(this.color) }
        };

        return (
            <TagType
                {...attrs}
                {...cssClass}
                {...this.disabled === true ? 'disabled' : null }
            >
                <slot />
            </TagType>
        );
    }
}
