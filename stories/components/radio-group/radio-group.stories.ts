import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import { RadioGroupMode } from '../../../src/components/radio-group/radio-group-interface';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';

/**
 * Radio buttons are often used in forms or for other functions that let users select only one option from a list. With 
 * radio buttons, users cannot make multiple selections from options suggested (as they can with check boxes).
 *
 * ## ✅ Guidance
 *
 * If you use the `wcs-radio-group` component outside a `wcs-form-field`, you need to provide an `aria-label`
 * attribute to the `wcs-radio-group` component in order to have a proper behaviour for screen readers.
 */
const meta: Meta = {
    title: 'Components/Radio-group',
    component: 'wcs-radio-group',
    argTypes: getComponentArgs('wcs-radio-group'),
    parameters: {
        actions: {
            handles: [
                'wcsChange'
            ]
        },
    },
    subcomponents: {
        'WcsRadio': 'wcs-radio'
    },
    decorators: [withActions]
};
export default meta;

interface RadioGroupStoryData {
    disabled: boolean,
    defaultValue: string,
    mode: RadioGroupMode,
    label: string
}

export const Default = {
    args: {
        disabled: false,
        mode: 'radio',
        label: 'Default radio group'
    },
    render: (args: RadioGroupStoryData) => html`
        <wcs-radio-group value="${args.defaultValue}" aria-label=${args.label} mode=${args.mode}>
            <wcs-radio label="SNCF" name="company" value="1" ?disabled=${args.disabled}></wcs-radio>
            <wcs-radio label="SNCF Réseau" name="company" value="2"></wcs-radio>
            <wcs-radio label="SNCF Voyageurs" name="company" value="3"></wcs-radio>
            <wcs-radio label="Gares & Connexions" name="company" value="4" ?disabled=${args.disabled}></wcs-radio>
        </wcs-radio-group>
    `
};

export const Disabled = {
    ...Default,
    args: {
        disabled: true,
        mode: 'radio',
        label: 'Disabled radio group'
    },
};

export const OptionMode = {
    ...Default,
    args: {
        disabled: false,
        mode: 'option',
        label: 'Options mode radio group'
    },
};

export const OptionModeDisabled = {
    ...Default,
    args: {
        disabled: true,
        mode: 'option',
        label: 'Disabled options mode radio group'
    },
};

export const HorizontalMode = {
    ...Default,
    args: {
        disabled: false,
        mode: 'horizontal',
        label: 'Horizontal mode radio group'
    },
};

export const HorizontalModeDisabled = {
    ...Default,
    args: {
        disabled: true,
        mode: 'horizontal',
        label: 'Disabled horizontal mode radio group'
    },
};
