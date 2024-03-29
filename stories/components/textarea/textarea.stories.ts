import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

/**
 * ## Accessibility
 * 
 * `wcs-textarea` is a wrapper around the native textarea element which is located inside its shadow DOM. All the
 * **aria attributes** you set on `wcs-textarea` are passed to the **native textarea** element **during the first render 
 * of the component**. If you need to use them as you would with a native textarea, you can do so.
 * 
 * If you need to **dynamically change the aria attributes after the first render**, you can use the `setAriaAttribute`
 * js method of `wcs-textarea`.
 * 
 * ```javascript
 * const wcsTextarea = document.querySelector('wcs-textarea');
 * await wcsTextarea.setAriaAttribute('aria-label', 'new label');
 * ```
 * 
 * If you use wcs-textarea outside a wcs-form-field, you have to manage the label and the error message yourself.
 * You can use the `aria-label` attribute to provide a label for screen readers but adds no visual label.
 */
const meta: Meta = {
    title: 'Components/Textarea',
    component: 'wcs-textarea',
    argTypes: getComponentArgs('wcs-textarea'),
    parameters: {
        actions: {
            handles: [
                'wcsBlur',
                'wcsChange',
                'wcsFocus',
                'wcsInput'
            ]
        }
    }
};

export default meta;

const Template: StoryFn<Partial<{ icon: string, autoGrow: boolean, disabled: boolean, ariaLabel: string, placeholder: string, value: string, resize: string, state: string }>> = (args) => html`
    <wcs-textarea icon=${args.icon}
                  ?auto-grow="${args.autoGrow}"
                  ?disabled="${args.disabled}"
                  .state="${args.state}"
                  resize="${args.resize ?? 'auto'}"
                  placeholder=${args.placeholder}
                  aria-label=${args.ariaLabel}
                  value=${args.value}>
    </wcs-textarea>
`;

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Placeholder',
    ariaLabel: 'Textarea default',
    disabled: false
};

export const WithPrefixIcon = Template.bind({});
WithPrefixIcon.args = {
    placeholder: 'Placeholder',
    ariaLabel: 'Textarea with prefix icon',
    disabled: false,
    icon: 'verified'
};

export const Disabled = Template.bind({});
Disabled.args = {
    placeholder: 'Placeholder',
    ariaLabel: 'Textarea disabled',
    disabled: true
};

/**
 * You can customize the padding-left and padding-right of the textarea by overriding the following css variables:
 * - `--wcs-textarea-padding-left`
 * - `--wcs-textarea-padding-right`
 */
export const CustomPaddings: StoryObj = {
    render: (args) => html`
        <style>
            .custom-padding {
                --wcs-textarea-padding-left: ${args["--wcs-textarea-padding-left"]};
                --wcs-textarea-padding-right: ${args["--wcs-textarea-padding-right"]};
            }
        </style>
        <wcs-textarea icon=${args.icon}
                      class="custom-padding"
                      ?auto-grow="${args.autoGrow}"
                      ?disabled="${args.disabled}"
                      .state="${args.state}"
                      resize="${args.resize ?? 'auto'}"
                      placeholder=${args.placeholder}
                      aria-label=${args.ariaLabel}
                      value=${args.value}>
        </wcs-textarea>
    `,
    args: {
        ...Default.args,
        ariaLabel: 'Textarea custom paddings',
        "--wcs-textarea-padding-left": "2rem",
        "--wcs-textarea-padding-right": "2rem"
    }
}
