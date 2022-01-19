import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
    title: 'Example/Divider',
    component: 'wcs-divider'
} as Meta;

const Template: Story = () => html`
    <p>Text before divider</p>
    <wcs-divider></wcs-divider>
    <p>Text after divider</p>
`;

const DividerInCardTemplate: Story = () => html`
    <wcs-card mode="flat">
        <wcs-card-body>
            Before divider
        </wcs-card-body>
        <wcs-divider></wcs-divider>
        <wcs-card-body>
            After divider
        </wcs-card-body>
    </wcs-card>
`;

export const Default = Template.bind({});
Default.args = {};

export const DividerInCard = DividerInCardTemplate.bind({});
DividerInCard.args = {};
