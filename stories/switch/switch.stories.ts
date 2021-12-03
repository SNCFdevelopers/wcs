import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { SwitchLabelAlignment } from '../../src/components/switch/switch-interface';

export default {
    title: 'Example/Switch',
    component: 'wcs-switch',
    parameters: {
        actions: {
            handles: [
                'wcsChange'
            ]
        }
    },
} as Meta;

const Template: Story<Partial<{ checked: boolean, name: string, label: string, labelAlignment: SwitchLabelAlignment, disabled: boolean }>> = (args) => html`
    <wcs-switch ?checked=${args.checked}
                name=${args.name}
                label-alignment=${args.labelAlignment}
                ?disabled=${args.disabled}>
        ${args.label}
    </wcs-switch>
`;

export const Default = Template.bind({});
Default.args = {
    checked: false,
    name: 'switch-id',
    label: 'Un switch',
    labelAlignment: 'center',
    disabled: false
};

export const Disabled = Template.bind({});
Disabled.args = {
    checked: false,
    name: 'switch-id',
    label: 'Un switch',
    labelAlignment: 'center',
    disabled: true
};
