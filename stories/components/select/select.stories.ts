import { Meta } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
// @ts-ignore
import selectDocumentation from './select-documentation.md';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Select',
    component: 'wcs-select',
    argTypes: getComponentArgs('wcs-select'),
    parameters: {
        docs: {
            description: {
                component: selectDocumentation
            }
        }
    }
};
export default meta;

export const Default = {
    render: (args) => html`
        <style>
            wcs-select{
                width: 400px;
            }
        </style>
        <wcs-form-field>
            <wcs-label>Le select customisé</wcs-label>
            <wcs-select placeholder="${args.placeholder ?? nothing}" id="leselect" value="${args.value ?? nothing}"
                        ?disabled="${args.disabled}" ?multiple="${args.multiple}" ?chips="${args.chips}" size=${args.size ?? nothing} name="${args.name ?? nothing}">
                <wcs-select-option value="1" chip-background-color="var(--wcs-pink)">One</wcs-select-option>
                <wcs-select-option value="2" chip-background-color="var(--wcs-yellow)" chip-color="var(--wcs-black)">Two</wcs-select-option>
                <wcs-select-option value="3" chip-background-color="var(--wcs-red)">Three</wcs-select-option>
            </wcs-select>
        </wcs-form-field>
    `,
    args: {
        value: "",
        placeholder: 'Le select par défaut',
        disabled: false,
        multiple: false,
        chips: false,
        size: 'm',
        name: "Le select"
    }
};

export const Sizes = {
    render: () => html`
        <div style="display: flex; gap: var(--wcs-base-margin)">
            <wcs-select placeholder="Select L" id="leselect-l" size="l" style="width: 200px;">
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
            </wcs-select>
            <wcs-select placeholder="Select M (default)" id="leselect-m" size="m" style="width: 200px;">
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
            </wcs-select>
        </div>
    `
};

export const Disabled = {
    ...Default,
    args: {
        ...Default.args,
        disabled: true
    }
}

export const OneOptionSelected = {
    ...Default,
    args: {
        ...Default.args,
        value: "1",
        placeholder: 'Le select avec une option selectionnée',
        disabled: false,
        multiple: false,
        chips: false,
        size: 'm'
    }
};

export const MultipleMode = {
    ...Default,
    args: {
        value: '',
        placeholder: 'Le select en mode multiple',
        disabled: false,
        multiple: true,
        chips: false,
        size: 'm'
    }
};

export const MultipleAndChipsMode = {
    ...Default,
    args: {
        value: '',
        placeholder: 'Le select en mode multiple',
        disabled: false,
        multiple: true,
        chips: true,
        size: 'm'
    }
};

export const OneOptionDisabled = {
    render: (args) => html`
    <style>
        wcs-select {
            width: 400px;
        }
    </style>
    <wcs-form-field>
        <wcs-label>Le select avec une option désactivée</wcs-label>
        <wcs-select placeholder="${args.placeholder}" id="select-with-disable-option" value="${args.value}"
                    ?disabled="${args.disabled}" ?multiple="${args.multiple}" ?chips="${args.chips}">
            <wcs-select-option value="1"> One</wcs-select-option>
            <wcs-select-option value="2" disabled>Two</wcs-select-option>
            <wcs-select-option value="3"> Three</wcs-select-option>
        </wcs-select>
    </wcs-form-field>
    `,
    args: {
        value: '',
        placeholder: 'Le select avec une option désactivée',
        disabled: false,
        multiple: false,
        chips: false
    }
}
