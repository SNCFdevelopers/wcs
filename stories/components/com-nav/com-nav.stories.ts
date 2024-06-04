import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';
import comNavDocumentation from './com-nav-documentation.md';

const meta: Meta = {
    title: 'Components/DS Communication/Nav',
    component: 'wcs-com-nav',
    argTypes: {
        ...getComponentArgs('wcs-com-nav'),
        ariaLabel: {
            description: 'An optional aria-label can be added'
        },
    },
    parameters: {
        docs: {
            description: {
                component: comNavDocumentation
            }
        }
    },
};
export default meta;

type ComNavArgs = {
    appName: string,
    ariaLabel: string,
    displayGalactic: boolean
}

const Template: StoryFn<Partial<ComNavArgs>> = (args) => html`
    ${args.displayGalactic ? html`
        <wcs-galactic text="NomSuperApp est un site SNCF">
            <wcs-galactic-menu text="TOUT SNCF">
                <div style="margin-bottom: 8px">
                    <a href="cgu" style="text-decoration: none; color: var(--wcs-white)">CGU</a></div>
                <div style="margin-bottom: 8px">
                    <a href="about" style="text-decoration: none; color: var(--wcs-white)">À Propos</a>
                </div>
                <div style="margin-bottom: 8px">
                    <a href="another" style="text-decoration: none; color: var(--wcs-white)">Un autre lien</a>
                </div>
                <wcs-button shape="small">Un bouton</wcs-button>
            </wcs-galactic-menu>
        </wcs-galactic>
    ` : ''}
    <wcs-com-nav app-name=${args.appName} aria-label="${args.ariaLabel}">
        <wcs-com-nav-submenu label="Sous menu" panel-title="Sous Menu"
                             panel-description="Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.">
            <wcs-com-nav-item>
                <a href="hobbies" @click=${e => e.preventDefault()}>Loisirs & Tourisme</a>
            </wcs-com-nav-item>
            <wcs-com-nav-item>
                <a href="lines" @click=${e => e.preventDefault()}>Toutes les lignes</a>
            </wcs-com-nav-item>
            <wcs-com-nav-item>
                <a href="mobiles" @click=${e => e.preventDefault()}>Services mobiles</a>
            </wcs-com-nav-item>
            <wcs-com-nav-item>
                <a href="daily" @click=${e => e.preventDefault()}>Au quotidien</a>
            </wcs-com-nav-item>
            <wcs-com-nav-item>
                <a href="network" @click=${e => e.preventDefault()}>Le réseau</a>
            </wcs-com-nav-item>
        </wcs-com-nav-submenu>
        <wcs-com-nav-submenu label="Autre sous menu" panel-title="Autre Sous Menu"
                             panel-description="Un autre sous menu avec des catégories. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.">
            <wcs-com-nav-item>
                <a href="network" @click=${e => e.preventDefault()}>Le réseau</a>
            </wcs-com-nav-item>
            <wcs-com-nav-category label="Une catégorie">
                <wcs-com-nav-item>
                    <a href="services" @click=${e => e.preventDefault()}>Services mobiles text plus long</a>
                </wcs-com-nav-item>
                <wcs-com-nav-item>
                    <a href="daily" @click=${e => e.preventDefault()}>Au quotidien</a>
                </wcs-com-nav-item>
                <wcs-com-nav-item>
                    <a href="network" @click=${e => e.preventDefault()}>Le réseau</a>
                </wcs-com-nav-item>
            </wcs-com-nav-category>
            <wcs-com-nav-category label="Une catégorie">
                <wcs-com-nav-item>
                    <a href="1" @click=${e => e.preventDefault()}>1</a>
                </wcs-com-nav-item>
                <wcs-com-nav-item>
                    <a href="2" @click=${e => e.preventDefault()}>2</a>
                </wcs-com-nav-item>
            </wcs-com-nav-category>
        </wcs-com-nav-submenu>
        <wcs-com-nav-item>
            <a href="https://sncf.com" target="_blank">Ressource externe</a>
        </wcs-com-nav-item>
        <div slot="actions">
            <wcs-button mode="clear" class="wcs-dark">Connexion</wcs-button>
        </div>
    </wcs-com-nav>
    <div
        style="height: 300px; width: 100%; display: flex; justify-content:center; align-items: center; text-align: center">
        Contenu du site
    </div>`;

export const Default: StoryObj<ComNavArgs> = {
    render: (args) => Template(args, this),
    args: {
        appName: 'Application',
        ariaLabel: 'Menu principal',
    }
}

/**
 * The com-nav is commonly used with the [galactic bar component](.?path=/docs/components-ds-communication-galactic--documentation).
 */
export const WithGalactic: StoryObj<ComNavArgs> = {
    render: (args) => Template(args, this),
    args: {
        ...Default.args,
        displayGalactic: true
    }
}

/**
 * If your navigation is simple and doesn't include a lot of submenus you can only display top-level links.
 */
export const OnlyTopLevelLinks: StoryObj<ComNavArgs> = {
    render: (args) => html`
    ${args.displayGalactic ? html`
        <wcs-galactic text="NomSuperApp est un site SNCF">
            <wcs-galactic-menu text="TOUT SNCF">
                <div style="margin-bottom: 8px">
                    <a href="cgu" style="text-decoration: none; color: var(--wcs-white)" @click=${e => e.preventDefault()}>CGU</a></div>
                <div style="margin-bottom: 8px">
                    <a href="about" style="text-decoration: none; color: var(--wcs-white)" @click=${e => e.preventDefault()}>À Propos</a>
                </div>
                <div style="margin-bottom: 8px">
                    <a href="another" style="text-decoration: none; color: var(--wcs-white)" @click=${e => e.preventDefault()}>Un autre lien</a>
                </div>
                <wcs-button shape="small">Un bouton</wcs-button>
            </wcs-galactic-menu>
        </wcs-galactic>
    ` : ''}
    <wcs-com-nav app-name=${args.appName} aria-label=${args.ariaLabel}>
        <wcs-com-nav-item>
            <a href="navigation" @click=${e => e.preventDefault()}>Navigation</a>
        </wcs-com-nav-item>
        <wcs-com-nav-item>
            <a href="another" @click=${e => e.preventDefault()}>Un autre item</a>
        </wcs-com-nav-item>
        <wcs-com-nav-item>
            <a href="another" @click=${e => e.preventDefault()}>Encore ?</a>
        </wcs-com-nav-item>
        <wcs-com-nav-item>
            <a href="https://sncf.com" target="_blank">Ressource externe</a>
        </wcs-com-nav-item>
        <div slot="actions">
            <wcs-button mode="clear" class="wcs-dark">Connexion</wcs-button>
        </div>
    </wcs-com-nav>
    <div
        style="height: 300px; width: 100%; display: flex; justify-content:center; align-items: center; text-align: center">
        Contenu du site
    </div>`,
    args: {
        ...Default.args
    }
}
