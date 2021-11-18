import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { WcsButtonMode } from '../src/components/button/button-interface';

export default {
    title: 'Example/Button',
    component: 'wcs-button'
} as Meta;

const Template: Story<Partial<{value: string, mode: WcsButtonMode}>> = (args) => html`<wcs-button mode=${args.mode}>${args.value}</wcs-button>`;

export const Default = Template.bind({});
Default.args = {value: 'Default'};
