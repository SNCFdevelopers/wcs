import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
    title: 'Example/Textarea',
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
} as Meta;

const Template: Story<Partial<{ icon: string, autoGrow: boolean, disabled: boolean, placeholder: string, value: string }>> = (args) => html`
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
