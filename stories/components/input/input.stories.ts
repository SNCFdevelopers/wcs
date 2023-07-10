import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { TextFieldTypes, WcsInputSize } from '../../../src/components/input/input-interface';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Input',
    component: 'wcs-input',
    argTypes: {
        ...getComponentArgs('wcs-input'),
        value: {
            control: 'text',
        },
    },
    parameters: {
        actions: {
            handles: [
                'wcsBlur',
                'wcsChange',
                'wcsFocus',
                'wcsInput'
            ]
        }
    },
    decorators: [withActions]
};
export default meta;

interface StoryParams {
    state: 'initial' | 'error';
    icon: string;
    type: TextFieldTypes;
    disabled; value: string | number;
    prefixLabel: string;
    suffixLabel: string;
    size: WcsInputSize;
}

const Template: StoryFn<Partial<StoryParams>> = (args) => html`
    <wcs-input id="input-demo-1" state=${args.state} icon=${args.icon} type=${args.type} ?disabled=${args.disabled} value=${args.value} prefix-label=${args.prefixLabel} suffix-label=${args.suffixLabel} size=${args.size}></wcs-input>
`;

const TemplateSizes: StoryFn<Partial<StoryParams>> = () => html`
    <div style="display: flex; gap: var(--wcs-base-margin)">
        <wcs-input id="input-demo-1" size="l" style="width: 300px" placeholder="Input L"></wcs-input>
        <wcs-input id="input-demo-2" size="m" style="width: 300px" placeholder="Input M (default)"></wcs-input>
        <wcs-input id="input-demo-3" size="s" style="width: 300px" placeholder="Input S (for grids)"></wcs-input>
    </div>
`;

export const Default = Template.bind({});
Default.args = {};

export const Sizes = TemplateSizes.bind({});
Sizes.args = {};

export const WithPrefixIcon = Template.bind({});
WithPrefixIcon.args = {
    icon: 'verified'
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    value: 'Champ non modifiable'
};

export const Date = Template.bind({});
Date.args = {
    type: 'date'
};

export const Password = Template.bind({});
Password.args = {
    type: 'password',
    value: 'superpassword'
};


export const PrefixSuffixLabel = Template.bind({});
PrefixSuffixLabel.args = {
    prefixLabel: 'https://',
    suffixLabel: '.sncf'
};
