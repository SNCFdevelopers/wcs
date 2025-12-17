import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { WcsTooltipAppendTo, WcsTooltipPosition } from '../../../src/components/tooltip/tooltip-interface';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { createRef, ref, Ref } from 'lit-html/directives/ref.js';
import { getComponentArgs } from '../../utils/args-generation';
import { useArgs } from 'storybook/preview-api';

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
    theme: 'light' | 'dark',
    delay: number | [number, number],
    duration: number | [number, number],
    trigger: string,
    appendTo: WcsTooltipAppendTo,
}

const TooltipElement = (args: TooltipArgs, id: number) => {
    return html `
    <wcs-tooltip
                id=${`tooltip-${id}`}
                for=${`tooltiped-button-${id}`}
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
    `
}

const Template = (args: TooltipArgs) => {
    const tooltip_unique_element_id_idx = tooltip_unique_element_id++; // use to generate a unique button id for each story (doc-only)
    return html`
        <div style="display: flex; width: 100%; align-items: center; justify-content: center">
            <!-- div to add space for the tooltip to demonstrate the positioning property -->
            <wcs-button shape="small" id=${`tooltiped-button-${tooltip_unique_element_id_idx}`} aria-label=${`Hover to show tooltip ${args.tooltipInnerHtml}`}>Hover to show tooltip
            </wcs-button>
            ${TooltipElement(args, tooltip_unique_element_id_idx)}
        </div>`
};

export const Default: StoryObj = {
    render: (args: TooltipArgs) => Template(args),
    args: {
        tooltipInnerHtml: 'Tooltip content'
    },
}

/**
 * The WCS theme 'dark' is used by default and uses the WCS CSS variables.  
 * Only use the 'light' theme when the tooltip is opened over a dark, secondary background.
 */
export const Themes: StoryObj = {
    render: (args: TooltipArgs) => {
        const tooltip_unique_element_id_idx = tooltip_unique_element_id++; // use to generate a unique button id for each story (doc-only)
        return html`
        <div style="display: flex; width: 100%; align-items: center; justify-content: center; gap: var(--wcs-semantic-spacing-base)">
            <!-- div to add space for the tooltip to demonstrate the positioning property -->
            <wcs-button shape="small" id=${`tooltiped-button-${tooltip_unique_element_id_idx}`}>Tooltip dark (default)</wcs-button>
            ${TooltipElement({...args, theme: 'dark'}, tooltip_unique_element_id_idx)}
            
            <wcs-button shape="small" id=${`tooltiped-button-${tooltip_unique_element_id_idx + 100}`}>Hover to show tooltip</wcs-button>
            ${TooltipElement({...args, theme: 'light'}, tooltip_unique_element_id_idx + 100)}
        </div>`
    },
    args: {
        ...Default.args,
        theme: 'dark'
    }
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

/**
 * If you need to update your tooltip content dynamically, you can use the `content` property.
 * Changing the `content` property will update the tooltip content, and append the `innerHTML` if it exists.
 * 
 * - The `content` property is mutable
 * - The `innerHTML` is immutable
 */
export const DynamicContent = {
    render: (args: TooltipArgs) => {
        const [_, updateArgs] = useArgs();

        const getRandomNumber = (): number => Math.floor(Math.random() * 100);
        
        const handleBtnClick = (): void => {
            if (args.content) {
                updateArgs({ ...args, content: 'Dynamic : ' + getRandomNumber() }); // For canvas mode
                // @ts-ignore
                document.querySelector('#tooltip-dynamic').content = 'Dynamic : ' + getRandomNumber(); // For docs mode
            }
        };
        
        return html`
        <div style="display: flex; width: 100%; align-items: center; justify-content: center; margin-top: var(--wcs-semantic-spacing-base)">
            <wcs-button shape="small" id="tooltiped-button-dynamic" @click=${handleBtnClick}>
                <wcs-mat-icon icon="update"></wcs-mat-icon>
                <span>Update tooltip</span>
            </wcs-button>
            <wcs-tooltip
                id="tooltip-dynamic"
                for="tooltiped-button-dynamic"
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
        </div>
    `
    },
    args: {
        ...Default.args,
        trigger: 'mouseenter focus click',
        content: 'Dynamic : 0',
        tooltipInnerHtml: '/ Not dynamic and appended to the content'
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
        tooltipInnerHtml: `<h3 style="margin-top: 0">Content title</h3>
<p>Logoden biniou degemer mat an penn ar bed perak stourm nebeut draonienn ael berr, soubañ torgenn seizhvet gwener araok eor kribañ troc’hañ gwenn vered tan.</p>
<a href="https://www.logoden-biniou.com/" style="display: block; color: inherit; margin: 12px 0" target="_blank">logoden-biniou</a>
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
                ${TooltipElement(args, tooltip_unique_element_id_idx)}
            </div>`
    },
    args: {
        ...Default.args,
        content: 'Example with a tooltip in a fullscreen Element',
        appendTo: 'parent'
    }
}

let tooltip_unique_element_id = 0;
