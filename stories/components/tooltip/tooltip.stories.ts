import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { WcsTooltipAppendTo, WcsTooltipPosition } from '../../../src/components/tooltip/tooltip-interface';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
// @ts-ignore
import interactiveStoryDocumentation from './interactiveStoryDocumentation.md';
// @ts-ignore
import fullscreenStoryDocumentation from './fullscreenStoryDocumentation.md';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { createRef, ref, Ref } from 'lit-html/directives/ref.js';

const meta: Meta = {
    title: 'Components/Tooltip',
    component: 'wcs-tooltip'
};

export default meta;

const Template: StoryFn<Partial<{ content: string, position: WcsTooltipPosition, tooltipInnerHtml: string, interactive: boolean, maxWidth: string | number, theme: string, delay: number | [number, number], duration: number | [number, number], trigger: string }>> = (args) => {
    const tooltip_unique_element_id_idx = tooltip_unique_element_id++; // use to generate a unique button id for each story (doc-only)
    return html`
    <div style="padding: 50px 0 0 200px;"><!-- div to add space for the tooltip to demonstrate the positioning property -->
        <wcs-button shape="small" id=${`tooltiped-button-${tooltip_unique_element_id_idx}`}>Hover to show tooltip</wcs-button>
        <wcs-tooltip
            for=${`tooltiped-button-${tooltip_unique_element_id_idx}`}
            max-width=${ifDefined(args.maxWidth)}
            ?interactive=${args.interactive}
            theme=${ifDefined(args.theme)}
            .delay=${ifDefined(args.delay)}
            .duration=${ifDefined(args.duration)}
            content=${ifDefined(args.content)}
            trigger=${ifDefined(args.trigger)}
            position=${ifDefined(args.position)}>
            ${unsafeHTML(args.tooltipInnerHtml)}
        </wcs-tooltip>
    </div>`
};

export const Default = Template.bind({});
Default.args = {
    tooltipInnerHtml: 'Tooltip content'
};

export const Top = Template.bind({});
Top.args = {
    position: 'top',
    tooltipInnerHtml: 'Tooltip content'
};

export const Right = Template.bind({});
Right.args = {
    position: 'right',
    tooltipInnerHtml: 'Tooltip content'
};

export const Bottom = Template.bind({});
Bottom.args = {
    position: 'bottom',
    tooltipInnerHtml: 'Tooltip content'
};

export const Left = Template.bind({});
Left.args = {
    position: 'left',
    tooltipInnerHtml: 'Tooltip content'
};

export const TextContentProp = Template.bind({});
TextContentProp.args = {
    content: 'Sample text content'
};

export const Interactive = Template.bind({});
Interactive.parameters = {
    docs: {
        description: {
            story: interactiveStoryDocumentation,
        }
    }
};
Interactive.args = {
    position: 'bottom',
    interactive: true,
    tooltipInnerHtml: `<h3>Content title</h3>
<p>Logoden biniou degemer mat an penn ar bed perak stourm nebeut draonienn ael berr, soubañ torgenn seizhvet gwener araok eor kribañ troc’hañ gwenn vered tan.</p>
<a href="https://www.logoden-biniou.com/" style="display: block; color: var(--wcs-primary); margin: 12px 0" target="_blank">logoden-biniou</a>
<wcs-button shape="small">C'est un grand oui !</wcs-button>`
};

const fullscreenDiv: Ref<HTMLInputElement> = createRef();

function enableFullScreen(e) {
    e.currentTarget.parentNode?.requestFullscreen();
}

const FullScreenTemplate: StoryFn<Partial<{ appendTo: WcsTooltipAppendTo, content: string, position: WcsTooltipPosition, tooltipInnerHtml: string, interactive: boolean, maxWidth: string | number, theme: string, delay: number | [number, number], duration: number | [number, number], trigger: string }>> = (args) => {
    const tooltip_unique_element_id_idx = tooltip_unique_element_id++; // use to generate a unique button id for each story (doc-only)
    return html`
    <div style="padding: 50px 0 0 200px;"><!-- div to add space for the tooltip to demonstrate the positioning property -->
        <wcs-button shape="small" id=${`tooltiped-fullscreen-button-${tooltip_unique_element_id_idx}`} @click="${enableFullScreen}">Enable Fullscreen</wcs-button>
        <wcs-button shape="small"  ${ref(fullscreenDiv)} id=${`tooltiped-button-${tooltip_unique_element_id_idx}`}>Hover to show tooltip</wcs-button>
        <wcs-tooltip
            append-to=${ifDefined(args.appendTo)}
            for=${`tooltiped-button-${tooltip_unique_element_id_idx}`}
            max-width=${ifDefined(args.maxWidth)}
            ?interactive=${args.interactive}
            theme=${ifDefined(args.theme)}
            .delay=${ifDefined(args.delay)}
            .duration=${ifDefined(args.duration)}
            content=${ifDefined(args.content)}
            trigger=${ifDefined(args.trigger)}
            position=${ifDefined(args.position)}>
            ${unsafeHTML(args.tooltipInnerHtml)}
        </wcs-tooltip>
    </div>`
};

export const FullScreenAppendToParent = FullScreenTemplate.bind({});
FullScreenAppendToParent.parameters = {
    docs: {
        description: {
            story: fullscreenStoryDocumentation,
        }
    }
};

FullScreenAppendToParent.args = {
    content: 'Example with a tooltip in a fullscreen Element',
    appendTo: 'parent'
};


let tooltip_unique_element_id = 0;
