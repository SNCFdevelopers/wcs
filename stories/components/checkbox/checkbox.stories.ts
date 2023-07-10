import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { CheckboxLabelAlignment } from '../../../src/components/checkbox/checkbox-interface';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Checkbox',
    component: 'wcs-checkbox',
    argTypes: getComponentArgs('wcs-checkbox'),
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
const Template: StoryFn<Partial<{ checked: boolean, indeterminate: boolean, name: string, label: string, labelAlignment: CheckboxLabelAlignment, disabled: boolean }>> = (args) => html`
    <wcs-checkbox ?checked=${args.checked}
                  ?indeterminate=${args.indeterminate}
                  name=${args.name}
                  label-alignment=${args.labelAlignment}
                  ?disabled=${args.disabled}>
        ${args.label}
    </wcs-checkbox>
`;

export const Default = Template.bind({});
Default.args = {
    checked: false,
    indeterminate: false,
    name: 'checkbox-id',
    label: 'Une checkbox',
    labelAlignment: 'center',
    disabled: false
};

export const Disabled = Template.bind({});
Disabled.args = {
    checked: false,
    indeterminate: false,
    name: 'checkbox-id',
    label: 'Une checkbox',
    labelAlignment: 'center',
    disabled: true
};
