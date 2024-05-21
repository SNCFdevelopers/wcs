import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Form Field/Label',
    component: 'wcs-label',
};

export default meta;

export const Default: StoryObj = {
    render: (args) => html`
        <wcs-form-field>
            <wcs-label .required=${args.required}>Full name</wcs-label>
            <wcs-input .required=${args.required} placeholder="John Doe"></wcs-input>
        </wcs-form-field>
    `,
    args: {
        required: false,
    }
}
