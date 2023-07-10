import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Form Field/Hint',
    component: 'wcs-hint',
    argTypes: getComponentArgs('wcs-hint'),
};

export default meta;

const Template: StoryFn<Partial<{small: boolean}>> = (args) => html`
    <wcs-form-field>
        <wcs-label>Enter your name</wcs-label>
        <wcs-input placeholder="John doe"></wcs-input>
        <wcs-hint ?small=${args.small}>A name is something that describe a person, like you can call the person by his name, you get it?
        </wcs-hint>
        <wcs-error>Your name is not valid, please do the needful following <a
            href="https://www.service-public.fr/particuliers/vosdroits/F1656">this</a>.
        </wcs-error>
    </wcs-form-field>
`;
export const Default: StoryObj = Template.bind({});
Default.args = {
    small: false,
}
