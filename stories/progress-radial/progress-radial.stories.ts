import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
    title: 'Example/Progress-radial',
    component: 'wcs-progress-radial'
} as Meta;

const Template: Story<Partial<{size: number, showLabel: boolean, value: number}>> = (args) => html`
    <wcs-progress-radial .size=${args.size}
                         ?show-label=${args.showLabel}
                         .value=${args.value}>
    </wcs-progress-radial>
`;

export const Default = Template.bind({});
Default.args = {
    size: 120,
    value: 25
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    size: 120,
    value: 25,
    showLabel: true
};
