import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { BadgeColor, BadgeShape } from './badge-interface';

@Component({
    tag: 'wcs-badge',
    styleUrl: 'badge.scss',
    shadow: true
})
export class Badge implements ComponentInterface {
    /**
     * Define the shape of the badge
     */
    @Prop() shape: BadgeShape = 'normal';
    /**
     * Allows you to change the color of the badge to make it less bright (based on the color chosen by the CSS class).
     */
    @Prop() color: BadgeColor = 'initial';

    render() {
        return (
            <slot/>
        );
    }
}
