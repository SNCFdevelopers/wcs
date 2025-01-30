import { Meta, StoryFn } from '@storybook/web-components';
// @ts-ignore
import galacticDocumentation from './galactic-documentation.md'
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/DS Communication/Galactic',
    component: 'wcs-galactic',
    argTypes: getComponentArgs('wcs-galactic'),
    parameters: {
        docs: {
            description: {
                component: galacticDocumentation
            }
        }
    },
    subcomponents: {
        'WcsGalacticMenu': 'wcs-galactic-menu'
    }
};
export default meta;

const Template: StoryFn<Partial<{ text: string, displayGalacticMenu: boolean }>> = (args) => html`
    <wcs-galactic text="${args.text}">
        ${args.displayGalacticMenu ? html`
            <wcs-galactic-menu text="TOUT SNCF">
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-semantic-color-text-inverse)">CGU</a>
                </div>
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-semantic-color-text-inverse)">À
                    Propos</a></div>
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-semantic-color-text-inverse)">Un autre
                    lien</a></div>
                <wcs-button shape="small">Un bouton</wcs-button>
            </wcs-galactic-menu>
    ` : customContent}
    </wcs-galactic>
`;
const customContent = html`
        <wcs-button id="accessibility-menu-button" mode="clear" size="s">
            Accessibilité
            <wcs-mat-icon size="s" icon="arrow_drop_down"></wcs-mat-icon>
        </wcs-button>
        <wcs-tooltip theme="light" trigger="click" interactive for="accessibility-menu-button" .appendTo=${() => document.querySelector("#tooltip-tippy")}>
            <h3>Accessibilité</h3>
            <wcs-switch>Police dyslexie</wcs-switch>
            <wcs-switch>Interlignage augmenté</wcs-switch>
            
            <h3>Constrastes</h3>
            <wcs-switch checked>Contrastes renforcés</wcs-switch>
        </wcs-tooltip>
        <div id="tooltip-tippy">
        </div>
        <wcs-button mode="clear" size="s">Langue : FR</wcs-button>
`;

/**
 * ## You want to add a button with (Show/Hide menu) Pattern
 *
 * Add an accessibility menu to configure parameters using `wcs-button` with `wcs-tooltip`.
 *
 * > **Important**: For correct tab navigation, you must add a `div` with id and set the `appendTo` property of the tooltip to target this div.
 *
 * Here's how to implement it:
 *
 * ```js
 * // Lit example (adapt according to your framework - Angular, React)
 * html`
 *   <wcs-button id="accessibility-menu-button" mode="clear" size="s">
 *     Accessibilité
 *   </wcs-button>
 *
 *   <wcs-tooltip 
 *     theme="wcs-primary" 
 *     trigger="click" 
 *     interactive 
 *     for="accessibility-menu-button"
 *     .appendTo=${() => document.querySelector("#tooltip-tippy")}
 *   >
 *     <h3>Accessibilité</h2>
 *     <wcs-switch>Police dyslexie</wcs-switch>
 *     <wcs-switch>Interlignage augmenté</wcs-switch>
 *
 *     <h3>Contrast</h2>
 *     <wcs-switch checked>Contrastes renforcés</wcs-switch>
 *   </wcs-tooltip>
 *
 *   <!-- Required for proper tab navigation ! -->
 *   <div id="tooltip-tippy"></div>
 *
 *   <wcs-button mode="clear" size="s">
 *     Language: FR
 *   </wcs-button>
 * `
 * ```
 */
export const Default = Template.bind({});
Default.args = {
    text: 'Un site'
};

export const WithGalacticMenu = Template.bind({});
WithGalacticMenu.args = {
    text: 'Un site',
    displayGalacticMenu: true
};
