import { Meta, StoryFn, StoryObj } from "@storybook/web-components";
import { getComponentArgs } from "../../utils/args-generation";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

const meta: Meta = {
    title: 'Components/Skeleton/Skeleton Circle',
    component: 'wcs-skeleton-circle',
    argTypes: getComponentArgs('wcs-skeleton-circle')
};

export default meta;

type SkeletonCircleArgs = {
    animation: 'none' | 'glide' | 'pulse';
    radius: number;
}

const Template: StoryFn<Partial<SkeletonCircleArgs>> = (args: Partial<SkeletonCircleArgs>) => html`
    <wcs-skeleton-circle animation=${args.animation}
                         radius=${args.radius}></wcs-skeleton-circle>
`;

/**
 * **Default skeleton circle example**  
 * With an initial radius of 50px
 */
export const Default: StoryObj = {
    render: (args: SkeletonCircleArgs) => Template(args, this),
    args: {
        animation: 'glide',
        radius: 50,
    }
}
