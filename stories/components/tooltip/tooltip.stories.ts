import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { WcsTooltipAppendTo, WcsTooltipPosition } from '../../../src/components/tooltip/tooltip-interface';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { createRef, ref, Ref } from 'lit-html/directives/ref.js';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Tooltip',
    component: 'wcs-tooltip',
    argTypes: getComponentArgs('wcs-tooltip'),
};

export default meta;

type TooltipArgs = {
    content: string,
    position: WcsTooltipPosition,
    tooltipInnerHtml: string,
    interactive: boolean,
    maxWidth: string | number,
    theme: string,
    delay: number | [number, number],
    duration: number | [number, number],
    trigger: string,
    appendTo: WcsTooltipAppendTo,
}

const Template = (args: TooltipArgs) => {
    const tooltip_unique_element_id_idx = tooltip_unique_element_id++; // use to generate a unique button id for each story (doc-only)
    return html`
        <div style="display: flex; width: 100%; align-items: center; justify-content: center">
            <!-- div to add space for the tooltip to demonstrate the positioning property -->
            <wcs-button shape="small" id=${`tooltiped-button-${tooltip_unique_element_id_idx}`}>Hover to show tooltip
            </wcs-button>
            <wcs-tooltip
                id=${`tooltip-${tooltip_unique_element_id_idx}`}
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

export const Default: StoryObj = {
    render: (args: TooltipArgs) => Template(args),
    args: {
        tooltipInnerHtml: 'Tooltip content'
    },
}

export const Top: StoryObj = {
    render: (args: TooltipArgs) => Template(args),
    args: {
        ...Default.args,
        position: 'top',
        tooltipInnerHtml: 'Tooltip content'
    }
}

export const Right: StoryObj = {
    render: (args: TooltipArgs) => Template(args),
    args: {
        ...Default.args,
        position: 'right',
        tooltipInnerHtml: 'Tooltip content'
    }
}

export const Bottom: StoryObj = {
    render: (args: TooltipArgs) => Template(args),
    args: {
        ...Default.args,
        position: 'bottom',
        tooltipInnerHtml: 'Tooltip content'
    }
}

export const Left: StoryObj = {
    render: (args: TooltipArgs) => Template(args),
    args: {
        ...Default.args,
        position: 'left',
        tooltipInnerHtml: 'Tooltip content'
    }
}

export const TextContentProp = {
    render: (args: TooltipArgs) => Template(args),
    args: {
        ...Default.args,
        content: 'Sample text content'
    }
}

/**
 * The interactive property allows the user to interact with the tooltip content. This allows greater flexibility to build
 * components for uses that would not be covered by the dropdown component.  
 * 
 * **An interactive tooltip is called a popover.**
 */
export const Interactive = {
    render: (args: TooltipArgs) => Template(args),
    args: {
        ...Default.args,
        position: 'bottom',
        interactive: true,
        tooltipInnerHtml: `<h3>Content title</h3>
<p>Logoden biniou degemer mat an penn ar bed perak stourm nebeut draonienn ael berr, soubañ torgenn seizhvet gwener araok eor kribañ troc’hañ gwenn vered tan.</p>
<a href="https://www.logoden-biniou.com/" style="display: block; color: var(--wcs-primary); margin: 12px 0" target="_blank">logoden-biniou</a>
<wcs-button shape="small">C'est un grand oui !</wcs-button>`
    }
}

const fullscreenDiv: Ref<HTMLInputElement> = createRef();

function enableFullScreen(e) {
    e.currentTarget.parentNode?.requestFullscreen();
}

/**
 * The appendTo property allows the user to append the tooltip to a specific Element instead of body. If interactive: true, the default behavior is appendTo: "parent".
 */
export const FullScreenAppendToParent = {
    render: (args: TooltipArgs) => {
        const tooltip_unique_element_id_idx = tooltip_unique_element_id++; // use to generate a unique button id for each story (doc-only)
        return html`
            <div style="padding: 50px 0 0 200px;">
                <!-- div to add space for the tooltip to demonstrate the positioning property -->
                <wcs-button shape="small" id=${`tooltiped-fullscreen-button-${tooltip_unique_element_id_idx}`}
                            @click="${enableFullScreen}">Enable Fullscreen
                </wcs-button>
                <wcs-button shape="small" ${ref(fullscreenDiv)}
                            id=${`tooltiped-button-${tooltip_unique_element_id_idx}`}>Hover to show tooltip
                </wcs-button>
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
    },
    args: {
        ...Default.args,
        content: 'Example with a tooltip in a fullscreen Element',
        appendTo: 'parent'
    }
}

let tooltip_unique_element_id = 0;
