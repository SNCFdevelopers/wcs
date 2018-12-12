import { Component, ComponentInterface, Prop } from '@stencil/core';
import { ButtonType } from './button-type';
import { Color, CssClassMap } from '../../interface';

@Component({
    tag: 'wcs-button'
})
export class Button implements ComponentInterface {
    @Prop() type: ButtonType = 'button';
    @Prop() href: string;
    @Prop() color?: Color;

    private createColorClass(color: Color | undefined | null): CssClassMap | undefined {
        return (typeof color === 'string' && color.length > 0) ? {
            [`btn-${color}`]: true
        } : undefined;
    }

    render() {
        const TagType = this.href !== undefined ? 'a' : 'button';
        const attrs = this.href !== undefined
            ? { href: this.href }
            : { type: this.type };

        const cssClass = {
            class: {
                'btn': true,
                ...this.createColorClass(this.color) }
        };

        return (
            <TagType
                {...attrs}
                {...cssClass}
            >
                <slot />
            </TagType>
        );
    }
}
