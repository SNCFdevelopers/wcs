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
        <wcs-dropdown mode="clear" size="s">
            <span slot="placeholder">Accessibilité</span>
            <wcs-dropdown-header>Typographies</wcs-dropdown-header>
            <wcs-dropdown-item @wcsDropdownItemClick="${e => e.stopPropagation()}">
                <wcs-switch>Police dyslexie</wcs-switch>
            </wcs-dropdown-item>
            <wcs-dropdown-item @wcsDropdownItemClick="${e => e.stopPropagation()}">
                <wcs-switch>Interlignage augmenté</wcs-switch>
            </wcs-dropdown-item>
            <wcs-dropdown-header>Constrastes</wcs-dropdown-header>
           <wcs-dropdown-item @wcsDropdownItemClick="${e => e.stopPropagation()}">
                <wcs-switch checked>Contrastes renforcés</wcs-switch>
           </wcs-dropdown-item>
        </wcs-dropdown>
        <wcs-button mode="clear" size="s">Langue : FR</wcs-button>
`;

export const Default = Template.bind({});
Default.args = {
    text: 'Un site'
};

export const WithGalacticMenu = Template.bind({});
WithGalacticMenu.args = {
    text: 'Un site',
    displayGalacticMenu: true
};
