import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { SwitchLabelAlignment } from '../../../src/components/switch/switch-interface';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Switch',
    component: 'wcs-switch',
    argTypes: getComponentArgs('wcs-switch'),
    parameters: {
        actions: {
            handles: [
                'wcsChange'
            ]
        }
    },
    decorators: [withActions]
};

export default meta;

const Template: StoryFn<Partial<{ checked: boolean, name: string, label: string, labelAlignment: SwitchLabelAlignment, disabled: boolean }>> = (args) => html`
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
