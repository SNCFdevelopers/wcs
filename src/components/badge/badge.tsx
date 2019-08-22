import { Component, Prop, ComponentInterface, h } from '@stencil/core';

import { Color, CssClassMap } from '../../interface';

@Component({
    tag: 'wcs-badge',
    styleUrl: 'badge.scss',
    shadow: true
})
export class Badge implements ComponentInterface {
    /**
     * Select the badge color.
     * @default 'primary'
     */
    @Prop({ mutable: true }) color: Color = 'primary';

    private createColorClass(color: Color): CssClassMap {
        return {
            [`wcs-background-${color}`]: true,
            [`wcs-color-${color}`]: true
        };
    }

    hostData() {
        return {
            class: {
                ...this.createColorClass(this.color)
            }
        };
    }

    render() {
        return (
            <slot />
        );
    }
}
