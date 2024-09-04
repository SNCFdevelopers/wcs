import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/List-item/List-item Properties',
    component: 'wcs-list-item-properties',
};

export default meta;

export const Default = {
    render: () => html`
        <wcs-list-item-properties>
            <wcs-list-item-property>Mise à jour le 4 avril 2017</wcs-list-item-property>
            <wcs-list-item-property>Entité : SNCF</wcs-list-item-property>
            <wcs-list-item-property>Agent : Marcel Patoulatchi</wcs-list-item-property>
        </wcs-list-item-properties>`,
}

