import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Card/Card Media',
    component: 'wcs-card-media',
};

export default meta;

const Template: StoryFn<Partial<any>> = () => html``;
export const Default: StoryObj = Template.bind({});
