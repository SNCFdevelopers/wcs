import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from "../../utils/args-generation";

const meta: Meta = {
    title: 'Components/Field/Field Label',
    component: 'wcs-field-label',
    argTypes: getComponentArgs('wcs-field-label'),
};

export default meta;

export const Default = {
    render: () => html`
        <wcs-field>
            <wcs-field-label>Le nom du champ 👈 (This is the field label)</wcs-field-label>
            <wcs-field-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec massa mi, hendrerit dictum dui sed, porttitor ullamcorper diam.
            </wcs-field-content>
        </wcs-field>
        <wcs-field>
            <wcs-field-label>Autre label 👈 (This is the field label)</wcs-field-label>
            <wcs-field-content>In hac habitasse platea dictumst.</wcs-field-content>
        </wcs-field>
    `,
}
