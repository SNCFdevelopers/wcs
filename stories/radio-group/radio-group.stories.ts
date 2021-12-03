import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import radioGroupDocumentation from './radio-group-documentation.md'
import { RadioGroupMode } from '../../src/components/radio-group/radio-group-interface';

export default {
    title: 'Example/Radio-group',
    component: 'wcs-radio-group',
    parameters: {
        actions: {
            handles: [
                'wcsChange'
            ]
        },
        docs: {
            description: {
                component: radioGroupDocumentation
            }
        }
    },
    subcomponents: {
        'WcsRadio': 'wcs-radio'
    }
} as Meta;

const Template: Story<Partial<{ disabled: boolean, defaultValue: string, mode: RadioGroupMode }>> = (args) => html`
    <wcs-radio-group value="${args.defaultValue}" mode=${args.mode}>
        <wcs-radio label="SNCF" value="1" ?disabled=${args.disabled}></wcs-radio>
        <wcs-radio label="SNCF Réseau" value="2"></wcs-radio>
        <wcs-radio label="SNCF Voyageurs" value="3"></wcs-radio>
        <wcs-radio label="Gares & Connexions" value="4" ?disabled=${args.disabled}></wcs-radio>
    </wcs-radio-group>
`;

export const Default = Template.bind({});
Default.args = {
    disabled: false,
    mode: 'radio'
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    mode: 'radio'
};

export const OptionMode = Template.bind({});
OptionMode.args = {
    disabled: false,
    mode: 'option'
};

export const OptionModeDisabled = Template.bind({});
OptionModeDisabled.args = {
    disabled: true,
    mode: 'option'
};
