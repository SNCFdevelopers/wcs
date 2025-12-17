import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/List-item/List-item Property',
    component: 'wcs-list-item-property',
};

export default meta;

export const Default = {
    render: () => html`
        <wcs-list-item-property>Mise à jour le 4 avril 2017</wcs-list-item-property>
    `,
}
