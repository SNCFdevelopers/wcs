import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
    title: 'Example/Switch',
    component: 'wcs-switch',
    parameters: {
        actions: {
            handles: [
                'wcsChange'
            ]
        }
    },
} as Meta;

const Template: Story<Partial<{ checked: boolean, name: string }>> = (args) => html`
    <wcs-switch ?checked=${args.checked} name="${args.name}">Un switch</wcs-switch>
`;

export const Default = Template.bind({});
Default.args = {
    checked: false,
    name: 'switch-id'
};
