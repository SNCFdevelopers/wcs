import { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { withActions } from '@storybook/addon-actions/decorator';

import {
    AutocompleteTypes,
    TextFieldTypes,
    WcsInputSize,
    WcsInputAutocorrect,
    WcsInputEnterKeyHint,
    WcsInputInputMode,
    WcsInputState
} from '../../../src/components/input/input-interface';
import { getComponentArgs } from '../../utils/args-generation';


const meta: Meta = {
    title: 'Components/Input',
    component: 'wcs-input',
    argTypes: {
        ...getComponentArgs('wcs-input'),
        ariaLabel: {
            description: 'An optional aria-label can be added'
        },
        value: {
            control: 'text',
        },
    },
    args: {
        placeholder: 'Placeholder'
    },
    parameters: {
        actions: {
            handles: [
                'wcsBlur',
                'wcsChange',
                'wcsFocus',
                'wcsInput'
            ]
        }
    },
    decorators: [withActions]
};
export default meta;

type InputStoryArgs = {
    accept?: string;
    ariaLabel?: string;
    autocapitalize?: string;
    autocomplete?: AutocompleteTypes;
    autocorrect?: WcsInputAutocorrect;
    autofocus?: boolean;
    clearInput?: boolean;
    clearOnEdit?: boolean;
    debounce?: number;
    disabled?: boolean;
    enterkeyhint?: WcsInputEnterKeyHint;
    fireFocusEvents?: boolean;
    icon?: string;
    inputmode?: WcsInputInputMode;
    max?: string;
    maxlength?: number;
    min?: string;
    minlength?: number;
    multiple?: boolean;
    name?: string;
    pattern?: string;
    placeholder: string | null;
    prefixLabel?: string;
    readonly?: boolean;
    required?: boolean;
    size?: WcsInputSize;
    spellcheck?: boolean;
    state?: WcsInputState
    step?: string;
    style?: string;
    suffixLabel?: string;
    type?: TextFieldTypes;
    value?: string | number | null;
};

const renderWcsInput = (args: InputStoryArgs) => html`
    <wcs-input
        accept=${ifDefined(args.accept)}
        aria-label=${args.ariaLabel || nothing}
        autocapitalize=${ifDefined(args.autocapitalize)}
        autocomplete=${ifDefined(args.autocomplete)}
        autocorrect=${ifDefined(args.autocorrect)}
        ?autofocus=${args.autofocus}
        ?clear-input=${args.clearInput}
        ?clear-on-edit=${args.clearOnEdit}
        debounce=${ifDefined(args.debounce)}
        ?disabled=${args.disabled}
        enterkeyhint=${ifDefined(args.enterkeyhint)}
        ?fireFocusEvents=${args.fireFocusEvents}
        icon=${ifDefined(args.icon)}
        inputmode=${ifDefined(args.inputmode)}
        max=${ifDefined(args.max)}
        maxlength=${ifDefined(args.maxlength)}
        min=${ifDefined(args.min)}
        minlength=${ifDefined(args.minlength)}
        ?multiple=${args.multiple}
        name=${ifDefined(args.name)}
        pattern=${ifDefined(args.pattern)}
        placeholder=${ifDefined(args.placeholder)}
        prefix-label=${ifDefined(args.prefixLabel)}
        ?readonly=${args.readonly}
        ?required=${args.required}
        size=${ifDefined(args.size)}
        ?spellcheck=${args.spellcheck}
        state=${ifDefined(args.state)}
        step=${ifDefined(args.step)}
        style=${ifDefined(args.style)}
        suffix-label=${ifDefined(args.suffixLabel)}
        type=${ifDefined(args.type)}
        value=${ifDefined(args.value)}
    >
    </wcs-input>
`;

/**
 * If you're using a `wcs-input` in a form, it is advised to wrap it inside a [wcs-form-field](.?path=/docs/components-form-field--documentation).
 */
export const Default: StoryObj<InputStoryArgs> = {
    render: (args) => renderWcsInput(args),
    args: {
        ariaLabel: 'Input field default',
    }
}

/**
 * Change the size of the input by setting this property. The available sizes are "l" (large), "m" (medium),
 * "s" (small, only meant for grids).
 */
export const Sizes: StoryObj<InputStoryArgs> = {
    render: (args) => html`
        <div style="display: flex; gap: var(--wcs-base-margin)">
            ${renderWcsInput({ ...args, size: 'l', ariaLabel: 'Input size L', placeholder: 'Input L' })}
            ${renderWcsInput({ ...args, size: 'm', ariaLabel: 'Input size M', placeholder: 'Input M (default)' })}
            ${renderWcsInput({ ...args, size: 's', ariaLabel: 'Input size S', placeholder: 'Input S (for grids)' })}
        </div>
    `,
    args: {
        style:'width: 300px'
    }
}

/**
 * Add a prefix icon before the input field to improve the semantics of your forms.  
 * The `icon` property changes the type of material icon displayed.
 * The rendered `wcs-mat-icon` will always be size="m" and family="filled".
 */
export const WithPrefixIcon: StoryObj<InputStoryArgs> = {
    render: (args) => renderWcsInput(args),
    args: {
        ariaLabel: 'Input field with prefix icon',
        icon: 'verified',
    }
}

/**
 * Add a prefix or suffix text label around the input field (these are not included in the value).
 */
export const PrefixSuffixLabel: StoryObj<InputStoryArgs> = {
    render: (args) => renderWcsInput(args),
    args: {
        ariaLabel: 'Input field with prefix and suffix label',
        prefixLabel: 'https://',
        suffixLabel: '.sncf',
    }
}


/**
 * The input can be disabled by setting the `disabled` property to `true`.
 * It will prevent the user from interacting with the component.
 */
export const Disabled: StoryObj<InputStoryArgs> = {
    render: (args) => renderWcsInput(args),
    args: {
        ariaLabel: 'Input field disabled',
        disabled: true,
        value: 'Disabled field',
    }
}

/**
 * The input can be in readonly mode by setting the `readonly` property to `true`.  
 * It will prevent the user from editing the value inside the field,
 * but allows keyboard and mouse interactivity (unlike the `disabled` property).
 */
export const Readonly: StoryObj<InputStoryArgs> = {
    render: (args) => renderWcsInput(args),
    args: {
        ariaLabel: 'Input field readonly',
        readonly: true,
        value: 'Readonly field'
    }
}

/**
 * The `type="date"` property will display a native date picker. Appearance depends on the user-agent.
 */
export const Date: StoryObj<InputStoryArgs> = {
    render: (args) => renderWcsInput(args),
    args: {
        ariaLabel: 'Input field date',
        type: 'date',
    }
}

/**
 * The `type="password"` property will display a native password field, with hidden characters and a
 * "show password" clickable icon.
 */
export const Password: StoryObj<InputStoryArgs> = {
    render: (args) => renderWcsInput(args),
    args: {
        ariaLabel: 'Input field password',
        type: 'password',
        value: 'superpassword'
    }
}
