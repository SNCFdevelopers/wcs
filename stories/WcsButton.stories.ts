import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
    title: 'Example/Wcs Button',
} as Meta;

const Template: Story<Partial<{value: string}>> = (args) => html`<wcs-button>${args.value}</wcs-button>`;

export const Primary = Template.bind({});
Primary.args = {value: 'Primary'};
