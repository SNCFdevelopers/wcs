import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Grid/Subcomponents/Grid CustomCell',
    component: 'wcs-grid-custom-cell',
    argTypes: getComponentArgs('wcs-grid-custom-cell'),
};

export default meta;

const Template: StoryFn<Partial<any>> = () => html``;
export const Default: StoryObj = Template.bind({});
