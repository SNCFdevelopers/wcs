import { Meta } from '@storybook/web-components';
import { getComponentArgs } from '../../utils/args-generation';
import { html } from "lit-html";

const meta: Meta = {
    title: 'Components/DS Communication/Nav/Com Nav Item',
    component: 'wcs-com-nav-item',
    argTypes: getComponentArgs('wcs-com-nav-item'),
};

export default meta;

export const Default = {
    render: () => html`
        <wcs-com-nav-item>
            <a href="/link" @click=${ev => ev.preventDefault()}>Link</a>
        </wcs-com-nav-item>
    `,
}
