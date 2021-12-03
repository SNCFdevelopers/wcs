import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { CheckboxLabelAlignment } from '../../src/components/checkbox/checkbox-interface';

export default {
    title: 'Example/Checkbox',
    component: 'wcs-checkbox',
    parameters: {
        actions: {
            handles: [
                'wcsChange'
            ]
        }
    },
} as Meta;

const Template: Story<Partial<{ checked: boolean, indeterminate: boolean, name: string, label: string, labelAlignment: CheckboxLabelAlignment }>> = (args) => html`
    <wcs-checkbox ?checked=${args.checked} ?indeterminate=${args.indeterminate} name=${args.name} label-alignment=${args.labelAlignment}>
        ${args.label}
    </wcs-checkbox>
`;

export const Default = Template.bind({});
Default.args = {
    checked: false,
    indeterminate: false,
    name: 'checkbox-id',
    label: 'Une checkbox',
    labelAlignment: 'center'
};
