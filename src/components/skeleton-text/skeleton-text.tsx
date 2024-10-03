import { Component, ComponentInterface, h, Prop } from "@stencil/core";
import { WcsSkeletonAnimation } from "../skeleton/skeleton-interface";

/**
 * Use a skeleton text as a placeholder for titles or paragraphs.
 * 
 *
 * @cssprop --wcs-skeleton-text-height - Height of the skeleton text
 * @cssprop --wcs-skeleton-text-height-h1 - Height of the skeleton text for heading 1
 * @cssprop --wcs-skeleton-text-height-h2 - Height of the skeleton text for heading 2
 * @cssprop --wcs-skeleton-text-height-h3 - Height of the skeleton text for heading 3
 * @cssprop --wcs-skeleton-text-height-body - Height of the skeleton text for body
 * @cssprop --wcs-skeleton-text-height-caption - Height of the skeleton text for caption
 * 
 * @cssprop --wcs-skeleton-height - _(Shared among all skeleton types)_<br/>Height of the skeleton
 * @cssprop --wcs-skeleton-min-height - _(Shared among all skeleton types)_<br/> Minimum height of the skeleton
 * @cssprop --wcs-skeleton-width - _(Shared among all skeleton types)_<br/> Width of the skeleton
 * @cssprop --wcs-skeleton-background-color - _(Shared among all skeleton types)_<br/> Background color of the skeleton (default is a gradient)
 * @cssprop --wcs-skeleton-animation-duration - _(Shared among all skeleton types)_<br/> Duration of the skeleton animation, if applicable
 */
@Component({
    tag: 'wcs-skeleton-text',
    styleUrl: 'skeleton-text.scss',
    shadow: true
})
export class SkeletonText implements ComponentInterface {

    /**
     * Specifies the animation of the skeleton
     */
    @Prop({reflect: true}) animation: WcsSkeletonAnimation = 'glide';

    /**
     * Specifies the line height of the text skeleton
     */
    @Prop() height: 'h1' | 'h2' | 'h3' | 'caption' | 'body' = 'body';

    render() {
        return <span aria-hidden="true"></span>;
    }

}
