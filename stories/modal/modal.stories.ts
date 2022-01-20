import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
    title: 'Example/Modal',
    component: 'wcs-modal',
    parameters: {
        actions: {
            handles: [
                'wcsDialogClosed'
            ]
        }
    }
} as Meta;

const Template: Story<Partial<{ withoutBackdrop: boolean, show: boolean, showCloseButton: boolean }>> = (args) => html`
    <wcs-modal ?show=${args.show}
               ?without-backdrop=${args.withoutBackdrop}
               ?show-close-button=${args.showCloseButton}>
        <div slot="header">Titre de la modale</div>
        Voulez-vous quittez la page ?
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a cursus mi. Nullam et sem mi. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Fusce sollicitudin pellentesque libero nec elementum.
        </p>
        <div slot="actions">
            <wcs-button @click="${_ => alert('Annuler')}" mode="stroked">Annuler</wcs-button>
            <wcs-button @click="${_ => alert('OK')}">OK</wcs-button>
        </div>
    </wcs-modal>
`;

export const Default = Template.bind({});
Default.args = {
    show: true,
    showCloseButton: true
};

export const WithoutBackdrop = Template.bind({});
WithoutBackdrop.args = {
    show: true,
    withoutBackdrop: true,
    showCloseButton: true
};

export const WithoutCloseButton = Template.bind({});
WithoutCloseButton.args = {
    show: true,
    showCloseButton: false
};

const TemplateWithoutActions: Story<Partial<{}>> = (_) => html`
    <wcs-modal show show-close-button>
        <div slot="header">Titre de la modale</div>
        Une modale avec du contenu uniquement mais pas d'actions.
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a cursus mi. Nullam et sem mi. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Fusce sollicitudin pellentesque libero nec elementum.
        </p>
    </wcs-modal>
`;

export const WithoutActions = TemplateWithoutActions.bind({});
WithoutActions.args = {};
