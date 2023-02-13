import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Textarea',
    component: 'wcs-textarea',
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

const Template: StoryFn<Partial<{ icon: string, autoGrow: boolean, disabled: boolean, placeholder: string, value: string }>> = (args) => html`
    <wcs-textarea icon=${args.icon}
                  ?auto-grow="${args.autoGrow}"
                  ?disabled="${args.disabled}"
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
