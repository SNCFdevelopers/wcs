import { Component, Prop } from '@stencil/core';
import { Color, CssClassMap } from '../../interface';


@Component({
    tag: 'wcs-badge'
})
export class Badge {
    @Prop() color?: Color;

    private createColorClass(color: Color | undefined | null): CssClassMap | undefined {
        return (typeof color === 'string' && color.length > 0) ? {
            [`badge-${color}`]: true
        } : undefined;
    }

    render() {
        const cssClass = {
            class: {
                'badge': true,
                ...this.createColorClass(this.color)
            }
        };

        return (
            <span {...cssClass}>
                <slot />
            </span>
        );
    }
}
