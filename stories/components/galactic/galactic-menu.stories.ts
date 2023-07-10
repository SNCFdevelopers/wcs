import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/DS Communication/Galactic/Galactic Menu',
    component: 'wcs-galactic-menu',
    argTypes: getComponentArgs('wcs-galactic-menu'),
};

export default meta;

const Template: StoryFn<Partial<any>> = () => html``;
export const Default: StoryObj = Template.bind({});
