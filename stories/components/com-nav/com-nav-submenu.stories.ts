import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/DS Communication/Nav/Com Nav Submenu',
    component: 'wcs-com-nav-submenu',
    argTypes: getComponentArgs('wcs-com-nav-submenu'),
};

export default meta;

export const Default = {
    render: () => html`
        <wcs-com-nav app-name="Application" aria-label="Menu principal">
            <wcs-com-nav-submenu label="Submenu"
                                 panel-title="Submenu"
                                 panel-description="Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.">
            </wcs-com-nav-submenu>
        </wcs-com-nav>
        <div
            style="height: 300px; width: 100%; display: flex; justify-content:center; align-items: center; text-align: center">
            Contenu du site
        </div>
    `,
}
