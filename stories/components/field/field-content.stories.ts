import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from "../../utils/args-generation";

const meta: Meta = {
    title: 'Components/Field/Field Content',
    component: 'wcs-field-content',
    argTypes: getComponentArgs('wcs-field-content'),
};

export default meta;

export const Default = {
    render: () => html`
        <wcs-field>
            <wcs-field-label>Le nom du champ</wcs-field-label>
            <wcs-field-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec massa mi, hendrerit dictum dui sed, porttitor ullamcorper diam. 👈 (This is the field content)
            </wcs-field-content>
        </wcs-field>
        <wcs-field>
            <wcs-field-label>Autre label</wcs-field-label>
            <wcs-field-content>In hac habitasse platea dictumst.  👈 (This is the field content)</wcs-field-content>
        </wcs-field>
    `,
}
