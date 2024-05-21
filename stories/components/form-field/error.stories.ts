import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Form Field/Error',
    component: 'wcs-error',
};

export default meta;

export const Default: StoryObj = {
    render: () => html`
        <wcs-form-field is-error="true">
            <wcs-label>Full name</wcs-label>
            <wcs-input placeholder="John Doe"></wcs-input>
            <wcs-error>Your name is not valid, please do what is necessary
                <a href="https://www.service-public.fr/particuliers/vosdroits/F1656">here</a>.
            </wcs-error>
        </wcs-form-field>
    `
}