import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/DS Communication/Nav/Com Nav Category',
    component: 'wcs-com-nav-category',
    argTypes: getComponentArgs('wcs-com-nav-category'),
};

export default meta;

const Template: StoryFn<Partial<any>> = () => html``;
export const Default: StoryObj = Template.bind({});
