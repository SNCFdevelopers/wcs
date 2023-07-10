import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/DS Communication/Nav',
    component: 'wcs-com-nav',
    argTypes: getComponentArgs('wcs-com-nav'),
};
export default meta;

const Template: StoryFn<Partial<{ appName: string, displayGalactic: boolean }>> = (args) => html`
    ${args.displayGalactic ? html`
        <wcs-galactic text="NomSuperApp est un site SNCF">
            <wcs-galactic-menu text="TOUT SNCF">
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">CGU</a></div>
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">À Propos</a>
                </div>
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">Un autre
                    lien</a></div>
                <wcs-button shape="small">Un bouton</wcs-button>
            </wcs-galactic-menu>
        </wcs-galactic>
    ` : ''}
    <wcs-com-nav app-name=${args.appName}>
        <wcs-com-nav-submenu label="Sous menu" panel-title="Sous Menu"
                             panel-description="Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.">
            <a href="#">Loisirs & Tourisme</a>
            <a href="#">Toutes les lignes</a>
            <a href="#">Services mobiles</a>
            <a href="#">Au quotidien</a>
            <a href="#">Le réseau</a>
        </wcs-com-nav-submenu>
        <wcs-com-nav-submenu label="Autre sous menu" panel-title="Autre Sous Menu"
                             panel-description="Un autre sous menu avec des catégories. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.">
            <a href="#">Le réseau</a>
            <wcs-com-nav-category label="Une catégorie">
                <a href="#">Services mobiles text plus long</a>
                <a href="#">Au quotidien</a>
                <a href="#">Le réseau</a>
            </wcs-com-nav-category>
            <wcs-com-nav-category label="Une catégorie">
                <a href="#">1</a>
                <a href="#">2</a>
            </wcs-com-nav-category>
        </wcs-com-nav-submenu>
        <a href="https://sncf.com" target="_blank">Ressource externe</a>
        <div slot="actions">
            <wcs-button mode="clear" class="wcs-dark">Connexion</wcs-button>
        </div>
    </wcs-com-nav>
    <div
        style="height: 300px; width: 100%; display: flex; justify-content:center; align-items: center; text-align: center">
        Contenu du site
    </div>`;

export const Default = Template.bind({});
Default.args = {appName: 'Application'};

export const WithGalactic = Template.bind({});
WithGalactic.args = {appName: 'Application', displayGalactic: true};

const TopLevelLinkTemplateTemplate: StoryFn<Partial<{ appName: string, displayGalactic: boolean }>> = (args) => html`
    ${args.displayGalactic ? html`
        <wcs-galactic text="NomSuperApp est un site SNCF">
            <wcs-galactic-menu text="TOUT SNCF">
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">CGU</a></div>
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">À Propos</a>
                </div>
                <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">Un autre
                    lien</a></div>
                <wcs-button shape="small">Un bouton</wcs-button>
            </wcs-galactic-menu>
        </wcs-galactic>
    ` : ''}
    <wcs-com-nav app-name=${args.appName}>
        <a>Navigation</a>
        <a>Un autre item</a>
        <a>Encore ?</a>
        <a href="https://sncf.com" target="_blank">Ressource externe</a>
        <div slot="actions">
            <wcs-button mode="clear" class="wcs-dark">Connexion</wcs-button>
        </div>
    </wcs-com-nav>
    <div
        style="height: 300px; width: 100%; display: flex; justify-content:center; align-items: center; text-align: center">
        Contenu du site
    </div>`;

export const OnlyTopLevelLinks = TopLevelLinkTemplateTemplate.bind({});
OnlyTopLevelLinks.args = {appName: 'Application'};
