import { Meta, Story } from '@storybook/web-components';

// @ts-ignore
import fieldDocumentation from './field-documentation.md'
import { html } from 'lit-html';

export default {
    title: 'Components/Field',
    component: 'wcs-field',
    parameters: {
        docs: {
            description: {
                component: fieldDocumentation
            }
        }
    },
    subcomponents: {
        'WcsFieldLabel': 'wcs-field-label',
        'WcsFieldContent': 'wcs-field-content',
    }
} as Meta;

const Template: Story = () => html`
    <wcs-field>
        <wcs-field-label>Le nom du champs</wcs-field-label>
        <wcs-field-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec massa mi, hendrerit dictum dui
            sed, porttitor ullamcorper diam.
        </wcs-field-content>
    </wcs-field>
    <wcs-field>
        <wcs-field-label>Autre label</wcs-field-label>
        <wcs-field-content>In hac habitasse platea dictumst.</wcs-field-content>
    </wcs-field>
`;

export const Default = Template.bind({});
