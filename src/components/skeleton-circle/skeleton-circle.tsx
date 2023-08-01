import { Component, ComponentInterface, h, Host, Prop } from "@stencil/core";
import { WcsSkeletonAnimation } from "../skeleton/skeleton-interface";

/**
 * Use a skeleton circle as a placeholder round images, illustrations or components
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
