import { Component, ComponentInterface, h, Host, Prop } from "@stencil/core";
import { WcsSkeletonAnimation } from "../skeleton/skeleton-interface";
import { CssTypes } from "../../shared-types";

/**
 * Use a skeleton rectangle as a placeholder for large images or square-shaped components
 *
 * @cssprop --wcs-skeleton-border-radius - Border-radius of the skeleton. If not overridden, depends on the `rounded` attribute.
 * 
 * @cssprop --wcs-skeleton-height - _(Shared among all skeleton types)_<br/>Height of the skeleton
 * @cssprop --wcs-skeleton-min-height - _(Shared among all skeleton types)_<br/> Minimum height of the skeleton
 * @cssprop --wcs-skeleton-width - _(Shared among all skeleton types)_<br/> Width of the skeleton
 * @cssprop --wcs-skeleton-background-color - _(Shared among all skeleton types)_<br/> Background color of the skeleton (default is a gradient)
 * @cssprop --wcs-skeleton-animation-duration - _(Shared among all skeleton types)_<br/> Duration of the skeleton animation, if applicable
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
                <span aria-hidden="true"></span>
            </Host>
        );
    }

}
