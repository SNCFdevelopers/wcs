import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import {
    EditableFieldType,
    FormatFn,
    ValidateFn,
    WcsEditableFieldSize
} from '../../../src/components/editable-field/editable-field-interface';
// @ts-ignore
import editableFieldDocumentation from './editable-field-documentation.md'
import { ifDefined } from 'lit-html/directives/if-defined.js';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';


const meta: Meta = {
    title: 'Components/Editable-field',
    component: 'wcs-editable-field',
    argTypes: getComponentArgs('wcs-editable-field'),
    parameters: {
        actions: {
            handles: [
                'wcsChange',
            ]
        },
        docs: {
            description: {
                component: editableFieldDocumentation
            }
        }
    },
    decorators: [withActions]
};
export default meta;

const Template: StoryFn<Partial<
    {
        errorMsg: string,
        formatFn: FormatFn<any>,
        label: string,
        readonly: boolean,
        type: EditableFieldType,
        validateFn: ValidateFn<any>,
        size: WcsEditableFieldSize,
        value: any
    }>> = (args) => html`
    <wcs-editable-field error-msg=${args.errorMsg}
                        .validateFn=${ifDefined(args.validateFn)}
                        .formatFn=${ifDefined(args.formatFn)}
                        label=${args.label}
                        ?readonly=${args.readonly}
                        type=${args.type}
                        value=${args.value}
                        size=${args.size}
                        id="editable-field-ex-1">
        ${args.type === 'input' ? html`
            <wcs-input id="test" size=${args.size}></wcs-input>
        ` : ''}
        ${args.type === 'textarea' ? html`
            <wcs-textarea></wcs-textarea>
        ` : ''}
        ${args.type === 'select' ? html`
            <wcs-select placeholder="Le select" size=${args.size}>
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
            </wcs-select>
        ` : ''}
`;

export const Default = Template.bind({});
Default.args = {
    validateFn: (value) => value.includes('SNCF'),
    formatFn: (value) => 'Formatted : ' + value,
    label: 'Nom du champ',
    value: 'Initial value',
    errorMsg: 'SNCF doit apparaitre dans la valeur',
    type: 'input'
};

export const Textarea = Template.bind({});
Textarea.args = {
    label: 'Un autre champ',
    value: 'Initial value',
    type: 'textarea'
};

export const Select = Template.bind({});
Select.args = {
    label: 'Un autre champ',
    value: '1',
    type: 'select'
};

export const Readonly = Template.bind({});
Readonly.args = {
    label: 'Un autre champ',
    value: 'Initial value',
    readonly: true,
    type: 'input'
};
