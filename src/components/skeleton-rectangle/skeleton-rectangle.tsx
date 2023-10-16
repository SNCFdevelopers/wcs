import { Component, ComponentInterface, h, Host, Prop } from "@stencil/core";
import { WcsSkeletonAnimation } from "../skeleton/skeleton-interface";
import { CssTypes } from "../../shared-types";

/**
 * Use a skeleton rectangle as a placeholder for large images or square-shaped components
 *
 * @cssprop --wcs-skeleton-border-radius - Controls the border-radius of the 'rounded' skeleton rectangle (default 0.5rem)
 */
@Component({
    tag: 'wcs-skeleton-rectangle',
    styleUrl: 'skeleton-rectangle.scss',
    shadow: true
})
export class SkeletonRectangle implements ComponentInterface {

    /**
     * Specifies the animation of the skeleton
     */
    @Prop({reflect: true}) animation: WcsSkeletonAnimation = 'glide';

    /**
     * Adds a border radius on the skeleton if true
     */
    @Prop({reflect: true}) rounded: boolean = false;
    
    /**
     * Specifies the height of the skeleton (can be any valid CSS value)
     */
    @Prop({reflect: true}) height: CssTypes.Height = 'auto';
    
    /**
     * Specifies the width of the skeleton (can be any valid CSS value)
     */
    @Prop({reflect: true}) width: CssTypes.Width = 'auto';

    render() {
        return (
            <Host style={{height: this.height, width: this.width}}>
                <span></span>
            </Host>
        );
    }

}
