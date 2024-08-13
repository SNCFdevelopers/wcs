import { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { withActions } from '@storybook/addon-actions/decorator';

import { getComponentArgs } from '../../utils/args-generation';
import {
    WcsTextareaInputMode,
    WcsTextareaEnterKeyHint,
    WcsTextareaResize,
    WcsTextareaInputState,
    WcsTextareaWrap
} from '../../../src/components/textarea/textarea-interface';

const meta: Meta = {
    title: 'Components/Textarea',
    component: 'wcs-textarea',
    argTypes: getComponentArgs('wcs-textarea'),
    args: {
        placeholder: 'Placeholder',
    },
    parameters: {
        actions: {
            handles: ['wcsBlur', 'wcsChange', 'wcsFocus', 'wcsInput'],
        },
    },
    decorators: [withActions],
};

export default meta;

type TextareaStoryArgs = {
    ariaLabel: string;
    autocapitalize?: string;
    autofocus?: boolean;
    autoGrow?: boolean;
    class?: string;
    cols?: number;
    debounce?: number;
    disabled?: boolean;
    enterkeyhint?: WcsTextareaEnterKeyHint;
    icon?: string;
    inputmode?: WcsTextareaInputMode;
    maxlength?: number;
    minlength?: number;
    name?: string;
    placeholder: string;
    readonly?: boolean;
    required?: boolean;
    resize?: WcsTextareaResize;
    rows?: number;
    spellcheck?: boolean;
    state?: WcsTextareaInputState;
    value?: string | null;
    wrap?: WcsTextareaWrap;
    '--wcs-textarea-padding-left'?: string;
    '--wcs-textarea-padding-right'?: string;
};

const renderWcsTextarea = (args: TextareaStoryArgs) => html`
    <wcs-textarea
        aria-label=${args.ariaLabel || nothing}
        autocapitalize=${ifDefined(args.autocapitalize)}
        ?autofocus=${args.autofocus}
        ?auto-grow=${args.autoGrow}
        class=${ifDefined(args.class)}
        cols=${ifDefined(args.cols)}
        debounce=${ifDefined(args.debounce)}
        ?disabled=${args.disabled}
        enterkeyhint=${ifDefined(args.enterkeyhint)}
        icon=${ifDefined(args.icon)}
        inputmode=${ifDefined(args.inputmode)}
        maxlength=${ifDefined(args.maxlength)}
        minlength=${ifDefined(args.minlength)}
        name=${ifDefined(args.name)}
        placeholder=${args.placeholder}
        ?readonly=${args.readonly}
        ?required=${args.required}
        rows=${ifDefined(args.rows)}
        ?spellcheck=${args.spellcheck}
        resize=${ifDefined(args.resize)}
        state=${ifDefined(args.state)}
        value=${ifDefined(args.value)}
        wrap=${ifDefined(args.wrap)}
    >
    </wcs-textarea>
`;

/**
 * If you're using a `wcs-textarea` in a form, it is advised to wrap it inside a [wcs-form-field](.?path=/docs/components-form-field--documentation).
 */
export const Default: StoryObj<TextareaStoryArgs> = {
    render: (args) => renderWcsTextarea(args),
    args: {
        ariaLabel: 'Textarea default',
    },
};

/**
 * Add a prefix icon before the input field to improve the semantics of your forms.  
 * The `icon` property changes the type of material icon displayed.
 * The rendered `wcs-mat-icon` will always be size="m" and family="filled".
 */
export const WithPrefixIcon: StoryObj<TextareaStoryArgs> = {
    render: (args) => renderWcsTextarea(args),
    args: {
        ariaLabel: 'Textarea with prefix icon',
        icon: 'verified',
    },
};

/**
 * The input can be disabled by setting the `disabled` property to `true`.
 * It will prevent the user from interacting with the component.
 */
export const Disabled: StoryObj<TextareaStoryArgs> = {
    render: (args) => renderWcsTextarea(args),
    args: {
        ariaLabel: 'Textarea disabled',
        disabled: true,
    },
};

/**
 * You can customize the padding-left and padding-right of the textarea by overriding the following css variables:
 * - `--wcs-textarea-padding-left`
 * - `--wcs-textarea-padding-right`
 */
export const CustomPaddings: StoryObj<TextareaStoryArgs> = {
    render: (args) => html`
        <style>
            .custom-padding {
                --wcs-textarea-padding-left: ${args['--wcs-textarea-padding-left']};
                --wcs-textarea-padding-right: ${args['--wcs-textarea-padding-right']};
            }
        </style>
        ${renderWcsTextarea({ ...args, class: 'custom-padding' })}
    `,
    args: {
        ariaLabel: 'Textarea custom paddings',
        '--wcs-textarea-padding-left': '2rem',
        '--wcs-textarea-padding-right': '2rem',
    },
};

/**
 * At the moment horizontal resizing is only possible if you add some custom CSS to the component,
 * for example by overriding the `width` or `max-width` property value.
 */
export const Resizing: StoryObj<TextareaStoryArgs> = {
    render: (args) => html`
        <style>
            .resizing {
                width: fit-content;
            }
        </style>
        ${renderWcsTextarea({ ...args, class: 'resizing' })}
    `,
    args: {
        ariaLabel: 'Textarea custom size',
        resize: 'both',
    },
};
