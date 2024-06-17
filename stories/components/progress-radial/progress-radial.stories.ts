import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';
import { ifDefined } from "lit-html/directives/if-defined.js";

const meta: Meta = {
    title: 'Components/Progress-radial',
    component: 'wcs-progress-radial',
    argTypes: {
        ...getComponentArgs('wcs-progress-radial'),
        ariaLabel: {
            description: 'An optional aria-label can be added'
        }
    }
};
export default meta;

type ProgressRadialArgs = {
    ariaLabel: string,
    size: number;
    showLabel: boolean;
    value: number;
}

const Template: StoryFn<Partial<ProgressRadialArgs>> = (args) => html`
    <wcs-progress-radial aria-label=${args.ariaLabel || nothing}
                         size=${ifDefined(args.size)}
                         ?show-label=${args.showLabel}
                         value=${ifDefined(args.value)}></wcs-progress-radial>
`;

export const Default: StoryObj = {
    render: (args: ProgressRadialArgs) => Template(args, this),
    args: {
        ariaLabel: 'My progress',
        size: 120,
        value: 25
    },
};

export const WithLabel: StoryObj = {
    render: (args: ProgressRadialArgs) => Template(args, this),
    args: {
        ...Default.args,
        showLabel: true
    }
}
