import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Divider',
    component: 'wcs-divider'
};
export default meta;

const Template: StoryFn = () => html`
    <p>Text before divider</p>
    <wcs-divider></wcs-divider>
    <p>Text after divider</p>
`;

const DividerInCardTemplate: StoryFn = () => html`
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
