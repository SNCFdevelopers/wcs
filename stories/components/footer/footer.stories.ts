import { Meta, StoryFn } from '@storybook/web-components';
// @ts-ignore
import footerDocumentation from './footer-documentation.md'
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Footer',
    component: 'wcs-footer',
    parameters: {
        docs: {
            description: {
                component: footerDocumentation
            }
        }
    }
};
export default meta;

const Template: StoryFn = () => html`
    <wcs-footer>
        <p>Contenu libre</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel neque et dolor egestas posuere nec sed neque.
            In porttitor orci vitae orci maximus, eget convallis nisi auctor. Nunc maximus vulputate maximus. Mauris ornare
            tortor mi. Quisque laoreet, erat sit amet volutpat ornare, ligula ante pharetra lacus, sit amet ornare libero
            odio eget nunc. Cras facilisis sem id tellus tempor, consectetur laoreet erat ornare. Sed aliquam tortor et quam
            viverra, nec finibus lacus mattis.</p>
        <a slot="end-left" href="#">Plan du site</a>
        <a slot="end-left" href="#">Mentions légales & CGU</a>
        <a slot="end-left" href="#">Données personnelles & cookies</a>
        <a slot="end-left" href="#">Portail de la cybersécurité</a>
        <span slot="end-right" href="#">Séléction de la langue</span>
    </wcs-footer>
`;

export const Default = Template.bind({});
