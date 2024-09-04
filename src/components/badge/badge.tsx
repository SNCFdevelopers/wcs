import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { BadgeColor, BadgeShape, BadgeSize } from './badge-interface';

/**
 * The badge component is a small label, generally appearing inside or in proximity to another larger interface component,
 * representing a status, property, or some other metadata.  
 *
 * @cssprop --wcs-badge-ligther-percentage - Define the opacity rate to apply to the badge
 */
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

    /**
     * Specify the size of the badge.
     */
    @Prop({ reflect: true }) size: BadgeSize = 'm';

    render() {
        return (
            <slot/>
        );
    }
}
