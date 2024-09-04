import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/DS Communication/Nav/Com Nav Category',
    component: 'wcs-com-nav-category',
    argTypes: getComponentArgs('wcs-com-nav-category'),
};

export default meta;

/** Used to open the menu when the story is loaded */
// @ts-ignore
document.addEventListener('DOMContentLoaded', async () => {
    // @ts-ignore
    document.querySelector('wcs-com-nav-submenu').open().then(() => {
        // @ts-ignore
        document.querySelector('wcs-com-nav-category').open();
    })
})

export const Default = {
    render: () => html`
        <wcs-com-nav app-name="Application" aria-label="Menu principal">
            <wcs-com-nav-submenu label="Submenu"
                                 panel-title="Submenu"
                                 panel-description="Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.">
                <wcs-com-nav-category label="Category"></wcs-com-nav-category>
            </wcs-com-nav-submenu>
        </wcs-com-nav>
        <div
            style="height: 300px; width: 100%; display: flex; justify-content:center; align-items: center; text-align: center">
            Contenu du site
        </div>
    `,
}
