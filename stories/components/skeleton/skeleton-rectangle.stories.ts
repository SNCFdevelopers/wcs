import { Meta, StoryFn, StoryObj } from "@storybook/web-components";
import { getComponentArgs } from "../../utils/args-generation";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

const meta: Meta = {
    title: 'Components/Skeleton/Skeleton Rectangle',
    component: 'wcs-skeleton-rectangle',
    argTypes: {
        ...getComponentArgs('wcs-skeleton-rectangle'),
        height: {
            control: 'text'
        },
        width: {
            control: 'text'
        }
    }
};

export default meta;

type SkeletonRectangleArgs = {
    animation: 'none' | 'glide' | 'pulse';
    rounded: boolean;
    height: string;
    width: string;
}

const Template: StoryFn<Partial<SkeletonRectangleArgs>> = (args: Partial<SkeletonRectangleArgs>) => html`
    <wcs-skeleton-rectangle animation=${args.animation}
                                ?rounded="${ifDefined(args.rounded)}"
                                height=${args.height}
                                width=${args.width}></wcs-skeleton-rectangle>
`;

/**
 * **Default skeleton rectangle example**  
 * With an initial size of 100px * 100px
 */
export const Default: StoryObj = {
    render: (args: SkeletonRectangleArgs) => Template(args, this),
    args: {
        animation: 'glide',
        rounded: false,
        height: '100px',
        width: '100px',
    }
}

/**
 * **Rounded corners**  
 * Use the `rounded` boolean property to add a border radius to the corners of the skeleton rectangle.  
 * You can also customize the CSS variable `--wcs-skeleton-border-radius` (default is `0.5rem`).
 */
export const Rounded: StoryObj = {
    render: (args: SkeletonRectangleArgs) => Template(args, this),
    args: {
        ...Default.args,
        rounded: true
    }
}

/**
 * **Customize height and width**  
 * By default, height and width of the rectangle are set to `auto`.   
 * You can customize these properties to accept any valid CSS values that come from `width` & `height` native API.
 * 
 * ✅ `"100px"` `"5em"` `"50%"` `"auto"` etc... [More values](https://developer.mozilla.org/en-US/docs/Web/CSS/height#syntax)
 */
export const HeightAndWidth: StoryObj = {
    render: (args: SkeletonRectangleArgs) => Template(args, this),
    args: {
        ...Default.args,
        width: '50%',
        height: '200px'
    }
}
