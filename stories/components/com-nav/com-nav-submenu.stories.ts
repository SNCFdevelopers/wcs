import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/DS Communication/Nav/Com Nav Submenu',
    component: 'wcs-com-nav-submenu',
    argTypes: getComponentArgs('wcs-com-nav-submenu'),
};

export default meta;

const Template: StoryFn<Partial<any>> = () => html``;
export const Default: StoryObj = Template.bind({});
