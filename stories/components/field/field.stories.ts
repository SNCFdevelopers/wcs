import { Meta } from '@storybook/web-components';

// @ts-ignore
import fieldDocumentation from './field-documentation.md'
import { html } from 'lit-html';
import { getComponentArgs } from "../../utils/args-generation";

const meta: Meta = {
    title: 'Components/Field',
    component: 'wcs-field',
    argTypes: getComponentArgs('wcs-field'),
    subcomponents: {
        'WcsFieldLabel': 'wcs-field-label',
        'WcsFieldContent': 'wcs-field-content',
    }
};
export default meta;

export const Default = {
    render: () => html`
        <wcs-field>
            <wcs-field-label>Le nom du champ</wcs-field-label>
            <wcs-field-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec massa mi, hendrerit dictum
                dui
                sed, porttitor ullamcorper diam.
            </wcs-field-content>
        </wcs-field>
        <wcs-field>
            <wcs-field-label>Autre label</wcs-field-label>
            <wcs-field-content>In hac habitasse platea dictumst.</wcs-field-content>
        </wcs-field>
    `,
}
