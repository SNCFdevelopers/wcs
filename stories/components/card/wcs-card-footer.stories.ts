import { Meta, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Card/Card Footer',
    component: 'wcs-card-footer',
};

export default meta;

const Template: StoryFn<Partial<any>> = () => html``;
export const Default: StoryObj = Template.bind({});
