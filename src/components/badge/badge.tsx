import { Component, ComponentInterface, h, Prop } from '@stencil/core';

@Component({
    tag: 'wcs-badge',
    styleUrl: 'badge.scss',
    shadow: true
})
export class Badge implements ComponentInterface {
    /**
     * Define the shape of the badge
     */
    @Prop() shape: 'normal' | 'rounded' = 'normal';
    /**
     * Allows you to change the color of the badge to make it less bright (based on the color chosen by the CSS class).
     */
    @Prop() color: 'initial' | 'lighter' = 'initial';

    render() {
        return (
            <slot/>
        );
    }
}
