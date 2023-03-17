import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { TextFieldTypes } from '../../../src/components/input/input-interface';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';

const meta: Meta = {
    title: 'Components/Input',
    component: 'wcs-input',
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

const Template: StoryFn<Partial<{state: 'initial' | 'error', icon: string, type: TextFieldTypes, disabled, value: string | number, prefixLabel: string, suffixLabel: string}>> = (args) => html`
    <wcs-input id="input-demo-1" state=${args.state} icon=${args.icon} type=${args.type} ?disabled=${args.disabled} value=${args.value} prefix-label=${args.prefixLabel} suffix-label=${args.suffixLabel}></wcs-input>
`;

export const Default = Template.bind({});
Default.args = {};

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
