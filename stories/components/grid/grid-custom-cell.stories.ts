import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Grid/Grid CustomCell',
    component: 'wcs-grid-custom-cell',
};

export default meta;

const Template: StoryFn<Partial<any>> = () => html``;
export const Default: StoryObj = Template.bind({});
