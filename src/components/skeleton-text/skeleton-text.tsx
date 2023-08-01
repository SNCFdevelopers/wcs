import { Component, ComponentInterface, h, Prop } from "@stencil/core";
import { WcsSkeletonAnimation } from "../skeleton/skeleton-interface";

/**
 * Use a skeleton text as a placeholder for titles or paragraphs.
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
