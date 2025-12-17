import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';
// @ts-ignore
import svg from './sncf.svg';


const meta: Meta = {
    title: 'Components/Header',
    component: 'wcs-header',
    argTypes: getComponentArgs('wcs-header'),
};
export default meta;

export const Default: StoryObj = {
    render: (_) => html`
        <wcs-header>
            <img
                slot="logo"
                alt="SNCF"
                src=${svg}
            />
            <h1 slot="title">Votre superbe application</h1>
            <div slot="actions">
                <wcs-button mode="clear">
                    <wcs-mat-icon icon="person_outline"></wcs-mat-icon>
                    <span>Connexion</span>
                </wcs-button>
            </div>
        </wcs-header>
    `
};

/**
 * You can add a search bar in the slot "center".
 * 
 * Multiple possibilities are available to you to display the input :
 * - Make the input take all the available space : add the style "flex: 1" to the wcs-form-field
 * - Change the width of the wcs-form-field using % or vw (be careful of the responsiveness)
 * - A max-width or a decimal flex value between 0 and 1 can be used to limit the size of the input on large screens.
 * - **The exemple shows a `flex: 0.8`, it takes 80% of the available space.**
 * 
 * 
 */
export const WithSearchBar: StoryObj = {
    render: (_) => html`
        <wcs-header>
            <img
                slot="logo"
                alt="SNCF"
                src=${svg}
            />
            <h1 slot="title">Votre superbe application</h1>
            <div slot="center">
                <wcs-form-field style="flex: 0.8;">
                    <wcs-input placeholder="Rechercher"></wcs-input>
                    <wcs-button shape="square" slot="suffix" ripple="false" aria-label="Rechercher">
                        <wcs-mat-icon icon="search"></wcs-mat-icon>
                    </wcs-button>
                </wcs-form-field>
            </div>
            <div slot="actions">
                <wcs-button mode="clear">
                    <wcs-mat-icon icon="person_outline"></wcs-mat-icon>
                    <span>Connexion</span>
                </wcs-button>
            </div>
        </wcs-header>
    `
}

/**
 * It is common to add a link to the logo / title of the header to redirect to the home page.
 */
export const ClickableLogoOrTitle: StoryObj = {
    render: (_) => {
        return html`
            <wcs-header>
                <a href="#" slot="logo" @click=${(e: Event) => e.preventDefault()}>
                    <img
                        slot="logo"
                        alt="SNCF"
                        src=${svg}
                    />
                </a>
                <a slot="title" href="#" @click=${(e: Event) => e.preventDefault()}>
                    Votre superbe application
                </a>
                <div slot="actions">
                    <wcs-button mode="clear">
                        <wcs-mat-icon icon="person_outline"></wcs-mat-icon>
                        <span>Connexion</span>
                    </wcs-button>
                </div>
            </wcs-header>
        `
    }
}
