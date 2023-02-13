import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import selectDocumentation from './select-documentation.md';

const meta: Meta = {
    title: 'Components/Select',
    component: 'wcs-select',
    parameters: {
        docs: {
            description: {
                component: selectDocumentation
            }
        }
    }
};
export default meta;

const Template: StoryFn<Partial<{ value: string, placeholder: string, disabled: boolean, multiple: boolean, chips: boolean }>> = (args) => html`
    <style>
        wcs-select{
            width: 400px;
        }
    </style>
    <wcs-select placeholder="${args.placeholder}" id="leselect" value="${args.value}" ?disabled="${args.disabled}" ?multiple="${args.multiple}" ?chips="${args.chips}">
        <wcs-select-option value="1" chip-background-color="var(--wcs-pink)">One</wcs-select-option>
        <wcs-select-option value="2" chip-background-color="var(--wcs-yellow)" chip-color="var(--wcs-black)">Two</wcs-select-option>
        <wcs-select-option value="3" chip-background-color="var(--wcs-red)">Three</wcs-select-option>
    </wcs-select>
`;

export const Default = Template.bind({});
Default.args = {
    value: "",
    placeholder: 'Le select par défaut',
    disabled: false,
    multiple: false,
    chips: false
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: "",
    placeholder: 'Le select désactivé',
    disabled: true,
    multiple: false,
    chips: false
};

export const OneOptionSelected = Template.bind({});
OneOptionSelected.args = {
    value: "1",
    placeholder: 'Le select avec une option selectionnée',
    disabled: false,
    multiple: false,
    chips: false
};

export const MultipleMode = Template.bind({});
MultipleMode.args = {
    value: '',
    placeholder: 'Le select en mode multiple',
    disabled: false,
    multiple: true,
    chips: false
};

export const MultipleAndChipsMode = Template.bind({});
MultipleAndChipsMode.args = {
    value: '',
    placeholder: 'Le select en mode multiple',
    disabled: false,
    multiple: true,
    chips: true
};

const oneOptionDisabledTemplate: StoryFn<Partial<{ value: string, placeholder: string, disabled: boolean, multiple: boolean, chips: boolean}>> = (args) => html`
    <style>
        wcs-select{
            width: 400px;
        }
    </style>
    <wcs-select placeholder="${args.placeholder}" id="select-with-disable-option" value="${args.value}" ?disabled="${args.disabled}" ?multiple="${args.multiple}" ?chips="${args.chips}">
        <wcs-select-option value="1"> One</wcs-select-option>
        <wcs-select-option value="2" disabled>Two</wcs-select-option>
        <wcs-select-option value="3"> Three</wcs-select-option>
    </wcs-select>
`;

export const OneOptionDisable = oneOptionDisabledTemplate.bind({});
OneOptionDisable.args = {
    value: '',
    placeholder: 'Le select avec une option désactivée',
    disabled: false,
    multiple: false,
    chips: false
};
