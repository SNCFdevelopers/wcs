import { Meta } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
// @ts-ignore
import { RadioGroupMode } from '../../../src/components/radio-group/radio-group-interface';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';
import { ifDefined } from "lit-html/directives/if-defined.js";

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
    argTypes: {
        ...getComponentArgs('wcs-radio-group'),
        ariaLabel: {
            description: 'An optional aria-label can be added'
        },
        disabled: {
            description: 'Sets some wcs-radio as disabled'
        }
    },
    parameters: {
        actions: {
            handles: [
                'wcsChange',
                'wcsRadioClick',
                'wcsFocus',
                'wcsBlur'
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
    value: string,
    mode: RadioGroupMode,
    ariaLabel: string,
    name: string,
}

export const Default = {
    args: {
        disabled: false,
        mode: 'radio',
        ariaLabel: 'Default radio group',
        name: 'company',
    },
    render: (args: RadioGroupStoryData) => html`
        <wcs-radio-group name="${ifDefined(args.name)}"
                         value="${ifDefined(args.value)}"
                         aria-label=${args.ariaLabel ?? nothing}
                         mode=${ifDefined(args.mode)}>
            <wcs-radio label="SNCF" value="1" ?disabled=${args.disabled}></wcs-radio>
            <wcs-radio label="SNCF Réseau" value="2"></wcs-radio>
            <wcs-radio label="SNCF Voyageurs" value="3"></wcs-radio>
            <wcs-radio label="Gares & Connexions" value="4" ?disabled=${args.disabled}></wcs-radio>
        </wcs-radio-group>
    `
};

export const Disabled = {
    ...Default,
    args: {
        disabled: true,
        mode: 'radio',
        ariaLabel: 'Disabled radio group',
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
