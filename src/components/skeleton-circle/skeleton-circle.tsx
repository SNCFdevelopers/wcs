import { Component, ComponentInterface, h, Host, Prop } from "@stencil/core";
import { WcsSkeletonAnimation } from "../skeleton/skeleton-interface";

/**
 * Use a skeleton circle as a placeholder round images, illustrations or components
 * 
 * @cssprop --wcs-skeleton-circle-border-radius - Border radius of the circle
 * 
 * @cssprop --wcs-skeleton-height - _(Shared among all skeleton types)_<br/>Height of the skeleton
 * @cssprop --wcs-skeleton-min-height - _(Shared among all skeleton types)_<br/> Minimum height of the skeleton
 * @cssprop --wcs-skeleton-width - _(Shared among all skeleton types)_<br/> Width of the skeleton
 * @cssprop --wcs-skeleton-background-color - _(Shared among all skeleton types)_<br/> Background color of the skeleton (default is a gradient)
 * @cssprop --wcs-skeleton-animation-duration - _(Shared among all skeleton types)_<br/> Duration of the skeleton animation, if applicable
 */
@Component({
    tag: 'wcs-skeleton-circle',
    styleUrl: 'skeleton-circle.scss',
    shadow: true
})
export class SkeletonCircle implements ComponentInterface {

    /**
     * Specifies the animation of the skeleton
     */
    @Prop({reflect: true}) animation: WcsSkeletonAnimation = 'glide';

    /**
     * Specifies the radius of the circle in px
     */
    @Prop({reflect: true}) radius: number = 50;

    render() {
        return (
            <Host style={{width: `${this.radius}px`, height: `${this.radius}px`}}>
                <span aria-hidden="true"></span>
            </Host>
        );
    }

}
