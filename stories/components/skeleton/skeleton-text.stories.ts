import {Meta, StoryObj} from "@storybook/web-components";
import {getComponentArgs} from "../../utils/args-generation";
import {html} from "lit-html";

const meta: Meta = {
    title: 'Components/Skeleton/Skeleton Text',
    component: 'wcs-skeleton-text',
    argTypes: getComponentArgs('wcs-skeleton-text')
};

export default meta;

type SkeletonTextArgs = {
    animation: 'none' | 'glide' | 'pulse';
    height: 'h1' | 'h2' | 'h3' | 'caption' | 'body';
}

/**
 * **Default skeleton text example**  
 * With a body height and glide animation
 */
export const Default: StoryObj = {
    render: (args: SkeletonTextArgs) => html`
        <wcs-skeleton-text animation=${args.animation}
                           height=${args.height}></wcs-skeleton-text>
    `,
    args: {
        animation: 'glide',
        height: 'body'
    }
}

/**
 * **Adapt the height to the title you want to replace**  
 * There are willingly no margin on skeletons, add your own or default values according 
 * to [this guideline](https://www.w3schools.com/cssref/css_default_values.php#:~:text=h1).  
 * If you want to override the height of the skeleton and set your own, just apply css on it (see example below)
 */
export const Heights: StoryObj = {
    render: (args: SkeletonTextArgs) => html`
<h1>This is a h1</h1>
<wcs-skeleton-text animation=${args.animation}
               height="h1"></wcs-skeleton-text>

<h2>This is a h2</h2>
<wcs-skeleton-text animation=${args.animation}
               height="h2"></wcs-skeleton-text>

<h3>This is a h3</h3>
<wcs-skeleton-text animation=${args.animation}
               height="h3"></wcs-skeleton-text>

<p>This is a caption</p>
<wcs-skeleton-text animation=${args.animation}
                   height="caption"></wcs-skeleton-text>

<strong>Custom height</strong>
<wcs-skeleton-text class="custom-height" animation=${args.animation}></wcs-skeleton-text>

<style>
.custom-height {
    height: 50px;
}
</style>
    `,
    args: {
        ...Default.args
    }
}

/**
 * **Create a paragraph using multiple skeleton-text**  
 * You can repeat several `wcs-skeleton-text` in your template to create a paragraph.
 * Add your own styling to match your actual content.
 */
export const MultipleLines: StoryObj = {
    render: (args: SkeletonTextArgs) => html`
<style>
    wcs-skeleton-text {
        margin-bottom: 8px;
    }
    .last-skeleton {
        width: 70%;
    }
</style>
<wcs-skeleton-text animation=${args.animation}
                   height=${args.height}></wcs-skeleton-text>
<wcs-skeleton-text animation=${args.animation}
                   height=${args.height}></wcs-skeleton-text>
<wcs-skeleton-text animation=${args.animation}
                   height=${args.height}></wcs-skeleton-text>
<wcs-skeleton-text class="last-skeleton"
                   animation=${args.animation}
                   height=${args.height}></wcs-skeleton-text>
    `,
    args: {
        ...Default.args
    }
}
