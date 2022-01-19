import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import progressBarDoc from './progress-bar-documentation.md';

export default {
    title: 'Example/Progress-bar',
    component: 'wcs-progress-bar',
    parameters: {
        docs: {
            description: {
                component: progressBarDoc
            }
        }
    },
} as Meta;

const Template: Story<Partial<{ small: boolean, showLabel: boolean, value: number }>> = (args) => html`
    <wcs-progress-bar ?small=${args.small}
                      ?show-label=${args.showLabel}
                      .value=${args.value}>
    </wcs-progress-bar>
`;

export const Default = Template.bind({});
Default.args = {
    value: 25
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    value: 25,
    showLabel: true
};

export const Small = Template.bind({});
Small.args = {
    value: 25,
    small: true
};
