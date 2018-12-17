import { Component, Prop } from '@stencil/core';
import { Color } from '../../interface';
import { createColorClass } from '../../utils/theme';

@Component({
    tag: 'wcs-badge',
    styleUrl: 'badge.scss',
    shadow: true
})
export class Badge {
    @Prop({ mutable: true }) color: Color = 'primary';

    hostData() {
        return {
            class: {
                ...createColorClass(this.color)
            }
        };
    }

    render() {
        return (
            <slot/>
        );
    }
}
