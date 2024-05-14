import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';
import { ifDefined } from "lit-html/directives/if-defined.js";

const meta: Meta = {
    title: 'Components/Progress-bar',
    component: 'wcs-progress-bar',
    argTypes: {
        ...getComponentArgs('wcs-progress-bar'),
        ariaLabel: {
            description: 'An optional aria-label can be added'
        }
    }
};
export default meta;

type ProgressBarArgs = {
    ariaLabel: string,
    size: 'm' | 's',
    showLabel: boolean,
    value: number
}

const Template: StoryFn<Partial<ProgressBarArgs>> = (args) => html`
    <wcs-progress-bar aria-label=${args.ariaLabel || nothing}
                      size=${ifDefined(args.size)}
                      ?show-label=${args.showLabel}
                      value=${ifDefined(args.value)}></wcs-progress-bar>
`;

export const Default: StoryObj<ProgressBarArgs> = {
    render: (args) => Template(args, this),
    args: {
        ariaLabel: 'My progress',
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
