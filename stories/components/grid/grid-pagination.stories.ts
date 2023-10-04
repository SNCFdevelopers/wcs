import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Grid/Subcomponents/Grid Pagination',
    component: 'wcs-grid-pagination',
    argTypes: getComponentArgs('wcs-grid-pagination'),
};

export default meta;

const Template: StoryFn<Partial<any>> = () => html``;
export const Default: StoryObj = Template.bind({});
