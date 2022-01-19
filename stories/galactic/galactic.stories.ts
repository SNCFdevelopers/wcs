import { Meta, Story } from '@storybook/web-components';
// @ts-ignore
import galacticDocumentation from './galactic-documentation.md'
import { html } from 'lit-html';

export default {
    title: 'Example/Com/Galactic',
    component: 'wcs-galactic',
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
} as Meta;

const Template: Story<Partial<{ text: string, displayGalacticMenu: boolean }>> = (args) => html`
    <wcs-galactic text="${args.text}">
        ${args.displayGalacticMenu ? html`
            <wcs-galactic-menu text="TOUT SNCF">
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">CGU</a>
                </div>
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">À
                    Propos</a></div>
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">Un autre
                    lien</a></div>
                <wcs-button shape="small">Un bouton</wcs-button>
            </wcs-galactic-menu>
    ` : ''}
    </wcs-galactic>
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
