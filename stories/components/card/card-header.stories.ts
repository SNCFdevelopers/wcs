import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Card/Card Header',
    component: 'wcs-card-header',
};

export default meta;

const Template: StoryFn<Partial<any>> = () => html``;
export const Default: StoryObj = Template.bind({});
