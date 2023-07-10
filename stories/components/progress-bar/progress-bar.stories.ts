import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import progressBarDoc from './progress-bar-documentation.md';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Progress-bar',
    component: 'wcs-progress-bar',
    argTypes: getComponentArgs('wcs-progress-bar'),
    parameters: {
        docs: {
            description: {
                component: progressBarDoc
            }
        }
    },
};
export default meta;

const Template: StoryFn<Partial<{ small: boolean, showLabel: boolean, value: number }>> = (args) => html`
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
