import { Meta, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Accordion/Accordion Content',
    component: 'wcs-accordion-content'
};

export default meta;
const Template: StoryFn<Partial<any>> = () => html``;
export const Default: StoryObj = Template.bind({});
