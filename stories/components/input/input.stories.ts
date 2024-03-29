import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { AutocompleteTypes, TextFieldTypes, WcsInputSize } from '../../../src/components/input/input-interface';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';

/**
 * ## Accessibility
 *
 * `wcs-input` is a wrapper around the native input element which is located inside its shadow DOM. All the
 * **aria attributes** you set on `wcs-input` are passed to the **native input** element **during the first render of 
 * the component**. If you need to use them as you would with a native input, you can do so.
 *
 * If you need to **dynamically change the aria attributes after the first render**, you can use the `setAriaAttribute` 
 * js method of `wcs-input`.
 *
 * ```javascript
 * const wcsInput = document.querySelector('wcs-input');
 * await wcsInput.setAriaAttribute('aria-label', 'new label');
 * ```
 * 
 * If you use wcs-input outside a wcs-form-field, you have to manage the label and the error message yourself.
 * You can use the `aria-label` attribute to provide a label for screen readers but adds no visual label.
 **/
const meta: Meta = {
    title: 'Components/Input',
    component: 'wcs-input',
    argTypes: {
        ...getComponentArgs('wcs-input'),
        value: {
            control: 'text',
        },
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

interface InputArgs {
    accept: string;
    autocapitalize: string;
    autocomplete: AutocompleteTypes;
    autocorrect: 'on' | 'off';
    autofocus: boolean;
    clearInput: boolean;
    clearOnEdit?: boolean;
    debounce: number;
    prefixLabel: string;
    suffixLabel: string;
    disabled: boolean;
    enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    size: WcsInputSize;
    icon: string;
    inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
    max?: string;
    maxlength?: number;
    min?: string;
    minlength?: number;
    multiple?: boolean;
    name: string;
    pattern?: string;
    placeholder?: string | null;
    ariaLabel?: string;
    readonly: boolean;
    required: boolean;
    spellcheck: boolean;
    state: 'initial' | 'error';
    step?: string;
    type: TextFieldTypes;
    value?: string | number | null;
    fireFocusEvents: boolean;
}

const Template: StoryFn<Partial<InputArgs>> = (args: Partial<InputArgs>) => html`
    <wcs-input id="input-demo-1"
               accept=${args.accept ?? nothing}
               autocapitalize=${args.autocapitalize ?? nothing}
               autocomplete=${args.autocomplete ?? nothing}
               autocorrect=${args.autocorrect ?? nothing}
               ?autofocus=${args.autofocus}
               ?clearInput=${args.clearInput}
               ?clearOnEdit=${args.clearOnEdit}
               debounce=${args.debounce ?? nothing}
               prefix-label=${args.prefixLabel ?? nothing}
               suffix-label=${args.suffixLabel ?? nothing}
               ?disabled=${args.disabled}
               enterkeyhint=${args.enterkeyhint ?? nothing}
               size=${args.size ?? nothing}
               icon=${args.icon ?? nothing}
               inputmode=${args.inputmode ?? nothing}
               max=${args.max ?? nothing}
               maxlength=${args.maxlength ?? nothing}
               min=${args.min ?? nothing}
               minlength=${args.minlength ?? nothing}
               ?multiple=${args.multiple}
               name=${args.name ?? nothing}
               pattern=${args.pattern ?? nothing}
               placeholder=${args.placeholder ?? nothing}
               aria-label=${args.ariaLabel ?? nothing}
               ?readonly=${args.readonly}
               ?required=${args.required}
               ?spellcheck=${args.spellcheck}
               state=${args.state ?? nothing}
               step=${args.step ?? nothing}
               type=${args.type ?? nothing}
               value=${args.value ?? nothing}
               ?fireFocusEvents=${args.fireFocusEvents}></wcs-input>
`;

/**
 * It is advised to wrap your `wcs-input` inside a [wcs-form-field](.?path=/docs/components-form-field--documentation).
 */
export const Default: StoryObj = {
    render: (args: InputArgs) => Template(args, this),
    args: {
        placeholder: 'Placeholder',
        ariaLabel: 'Input field default',
    }
}

/**
 * Change the size of the input by setting this property. The available sizes are "l" (large), "m" (medium),
 * "s" (small, only meant for grids).
 */
export const Sizes: StoryObj = {
    render: () => html`
        <div style="display: flex; gap: var(--wcs-base-margin)">
            <wcs-input id="input-demo-1" size="l" style="width: 300px" aria-label="Input size L" placeholder="Input L"></wcs-input>
            <wcs-input id="input-demo-2" size="m" style="width: 300px" aria-label="Input size M" placeholder="Input M (default)"></wcs-input>
            <wcs-input id="input-demo-3" size="s" style="width: 300px" aria-label="Input size S" placeholder="Input S (for grids)"></wcs-input>
        </div>
    `,
    args: {
        ...Default.args
    }
}

/**
 * Add a prefix icon before the input field to improve the semantics of your forms.  
 * The `icon` property changes the type of material icon displayed.
 * The rendered `wcs-mat-icon` will always be size="m" and family="filled".
 */
export const WithPrefixIcon: StoryObj = {
    render: (args: InputArgs) => Template(args, this),
    args: {
        ...Default.args,
        icon: 'verified',
        ariaLabel: 'Input field with prefix icon'
    }
}

/**
 * Add a prefix or suffix text label around the input field (these are not included in the value).
 */
export const PrefixSuffixLabel: StoryObj = {
    render: (args: InputArgs) => Template(args, this),
    args: {
        ...Default.args,
        prefixLabel: 'https://',
        suffixLabel: '.sncf',
        ariaLabel: 'Input field with prefix and suffix label'
    }
}


/**
 * The input can be disabled by setting the `disabled` property to `true`.
 * It will prevent the user from interacting with the component.
 */
export const Disabled: StoryObj = {
    render: (args: InputArgs) => Template(args, this),
    args: {
        ...Default.args,
        disabled: true,
        value: 'Disabled field',
        ariaLabel: 'Input field disabled'
    }
}

/**
 * The input can be in readonly mode by setting the `readonly` property to `true`.  
 * It will prevent the user from editing the value inside the field,
 * but allows keyboard and mouse interactivity (unlike the `disabled` property).
 */
export const Readonly: StoryObj = {
    render: (args: InputArgs) => Template(args, this),
    args: {
        ...Default.args,
        readonly: true,
        value: 'Readonly field',
        ariaLabel: 'Input field readonly'
    }
}

/**
 * The `type="date"` property will display a native date picker. Appearance depends on the user-agent.
 */
export const Date: StoryObj = {
    render: (args: InputArgs) => Template(args, this),
    args: {
        ...Default.args,
        type: 'date',
        ariaLabel: 'Input field date'
    }
}

/**
 * The `type="password"` property will display a native password field, with hidden characters and a
 * "show password" clickable icon.
 */
export const Password: StoryObj = {
    render: (args: InputArgs) => Template(args, this),
    args: {
        ...Default.args,
        type: 'password',
        value: 'superpassword',
        ariaLabel: 'Input field password'
    }
}
