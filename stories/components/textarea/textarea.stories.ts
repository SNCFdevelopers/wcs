import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

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

const Template: StoryFn<Partial<{ icon: string, autoGrow: boolean, disabled: boolean, placeholder: string, value: string, resize: string, state: string }>> = (args) => html`
    <wcs-textarea icon=${args.icon}
                  ?auto-grow="${args.autoGrow}"
                  ?disabled="${args.disabled}"
                  .state="${args.state}"
                  resize="${args.resize ?? 'auto'}"
                  placeholder=${args.placeholder}
                  value=${args.value}>
    </wcs-textarea>
`;

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Placeholder',
    disabled: false
};

export const WithPrefixIcon = Template.bind({});
WithPrefixIcon.args = {
    placeholder: 'Placeholder',
    disabled: false,
    icon: 'verified'
};

export const Disabled = Template.bind({});
Disabled.args = {
    placeholder: 'Placeholder',
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
                      value=${args.value}>
        </wcs-textarea>
    `,
    args: {
        ...Default.args,
        "--wcs-textarea-padding-left": "2rem",
        "--wcs-textarea-padding-right": "2rem"
    }
}