import { Component, Prop } from '@stencil/core';
import { Color, CssClassMap } from '../../interface';


@Component({
    tag: 'wcs-badge'
})
export class Badge {
    @Prop({ mutable: true }) color?: Color = 'primary';
    @Prop({ reflectToAttr: true }) srOnly = false;

    private createColorClass(color: Color | undefined | null): CssClassMap | undefined {
        return (typeof color === 'string' && color.length > 0) ? {
            [`badge-${color}`]: true
        } : undefined;
    }

    render() {
        console.log(this.srOnly);
        const cssClass = {
            class: {
                'badge': true,
                'sr-only': this.srOnly,
                ...this.createColorClass(this.color)
            }
        };

        return (
            <span
                {...cssClass}
            >
                <slot />
            </span>
        );
    }
}
