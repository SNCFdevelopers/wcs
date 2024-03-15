import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Progress-bar',
    component: 'wcs-progress-bar',
    argTypes: getComponentArgs('wcs-progress-bar')
};
export default meta;

type ProgressBarArgs = {
    size: 'm' | 's',
    showLabel: boolean,
    value: number
}

const Template: StoryFn<Partial<ProgressBarArgs>> = (args) => html`
    <wcs-progress-bar ?show-label=${args.showLabel} size=${args.size} .value=${args.value}></wcs-progress-bar>
`;

export const Default: StoryObj<ProgressBarArgs> = {
    render: (args) => Template(args, this),
    args: {
        value: 25,
        size: 'm'
    }
}



export const WithLabel: StoryObj<ProgressBarArgs> = {
    render: (args) => Template(args, this),
    args: {
        value: 25,
        showLabel: true
    }
}



export const SmallSize: StoryObj<ProgressBarArgs> = {
    render: (args) => Template(args, this),
    args: {
        value: 25,
        size: 's',
    }
}
