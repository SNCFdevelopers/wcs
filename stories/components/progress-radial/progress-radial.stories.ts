import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Progress-radial',
    component: 'wcs-progress-radial',
    argTypes: getComponentArgs('wcs-progress-radial'),
};
export default meta;

type ProgressRadialArgs = {
    size: number;
    showLabel: boolean;
    value: number;
}

const Template: StoryFn<Partial<ProgressRadialArgs>> = (args) => html`
    <wcs-progress-radial .size=${args.size}
                         ?show-label=${args.showLabel}
                         .value=${args.value}>
    </wcs-progress-radial>
`;

export const Default: StoryObj = {
    render: (args: ProgressRadialArgs) => Template(args, this),
    args: {
        size: 120,
        value: 25
    },
};

export const WithLabel: StoryObj = {
    render: (args: ProgressRadialArgs) => Template(args, this),
    args: {
        size: 120,
        value: 25,
        showLabel: true
    }
}