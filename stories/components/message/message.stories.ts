import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { withActions } from 'storybook/actions/decorator';
import { WcsAlertIntent } from '../../../src/components/alert/alert-interface';
import { WcsMessageBackground } from '../../../src/components/message/message-interface';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Message',
    component: 'wcs-message',
    argTypes: getComponentArgs('wcs-message'),
    decorators: [withActions],
    parameters: {
        actions: {
            handles: [
            'wcsMessageDismiss'
            ]
        }
    },
};
export default meta;

type MessageStoryArgs = {
    intent?: WcsAlertIntent;
    background?: WcsMessageBackground;
    showCloseButton?: boolean;
    title?: string;
    subtitle?: string;
    showBorder?: boolean
};

const renderWcsMessage = (args: MessageStoryArgs) => html`
    <wcs-message
        intent=${ifDefined(args.intent)}
        background=${ifDefined(args.background)}
        ?show-border=${args.showBorder}
        ?show-close-button=${args.showCloseButton}
    >
        ${args.title ? html`<span slot="title">${args.title}</span>` : nothing}
        ${args.subtitle ? html`<span slot="subtitle">${args.subtitle}</span>` : nothing}
    </wcs-message>
`;

export const Default: StoryObj<MessageStoryArgs> = {
    render: (args) => renderWcsMessage(args),
    args: {
        intent: 'information',
        background: 'lightest',
        showCloseButton: true,
        title: 'Titre du message',
        subtitle: 'Ceci est un message informatif.',
    }
};

export const SubtitleOnly: StoryObj<MessageStoryArgs> = {
    render: (args) => renderWcsMessage(args),
    args: {
        intent: 'information',
        showCloseButton: true,
        subtitle: 'Ceci est un message informatif.',
    }
};

export const Intents: StoryObj<MessageStoryArgs> = {
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: var(--wcs-semantic-spacing-base)">
            ${renderWcsMessage({ ...args, intent: 'information', title: 'Information', subtitle: 'Message informatif.', showCloseButton: true })}
            ${renderWcsMessage({ ...args, intent: 'success',     title: 'Succès',      subtitle: 'Message de succès.', showCloseButton: true })}
            ${renderWcsMessage({ ...args, intent: 'warning',     title: 'Attention',   subtitle: 'Message d\'avertissement.', showCloseButton: true })}
            ${renderWcsMessage({ ...args, intent: 'error',       title: 'Erreur',      subtitle: 'Message d\'erreur.', showCloseButton: true })}
        </div>
    `,
};

export const Backgrounds: StoryObj<MessageStoryArgs> = {
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: var(--wcs-semantic-spacing-base)">
            ${renderWcsMessage({ ...args, background: 'lightest', subtitle: 'Background lightest (défaut).', showCloseButton: true })}
            ${renderWcsMessage({ ...args, background: 'lighter',  subtitle: 'Background lighter.', showCloseButton: true })}
        </div>
    `,
};

export const WithoutCloseButton: StoryObj<MessageStoryArgs> = {
    render: (args) => renderWcsMessage(args),
    args: {
        showCloseButton: false,
        subtitle: 'Ce message ne peut pas être fermé.',
    }
};

export const WithBorder: StoryObj<MessageStoryArgs> = {
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: var(--wcs-semantic-spacing-base)">
            ${renderWcsMessage({ ...args, intent: 'information', title: 'Information', subtitle: 'Message informatif.' })}
            ${renderWcsMessage({ ...args, intent: 'success', title: 'Succès', subtitle: 'Message de succès.' })}
            ${renderWcsMessage({ ...args, intent: 'warning', title: 'Attention', subtitle: 'Message d\'avertissement.' })}
            ${renderWcsMessage({ ...args, intent: 'error', title: 'Erreur', subtitle: 'Message d\'erreur.' })}
        </div>
    `,
    args: {
        showBorder: true,
        subtitle: 'Message',
    }
};

/**
 * Example of forms with `wcs-message` to illustrate the use of message component in a real use case
 */
export const ExampleUsage: StoryObj<MessageStoryArgs> = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: var(--wcs-semantic-spacing-base-200)">
            <wcs-form-field>
                <wcs-label>Nom</wcs-label>
                <wcs-input type="text" value="Perrault"></wcs-input>
            </wcs-form-field>
            <wcs-form-field>
                <wcs-label>Prénom</wcs-label>
                <wcs-input type="text" value="René"></wcs-input>
            </wcs-form-field>

            <wcs-form-field>
                <wcs-label>Adresse</wcs-label>
                <wcs-input type="text" value="Rennes (Ille-et-Vilaine), rue de la Poterie"></wcs-input>
            </wcs-form-field>

            <wcs-message style="margin-bottom: var(--wcs-semantic-spacing-base-200);" intent="warning" background="lightest">
                <span slot="subtitle">Une vérification sera demandée lors de l'envoi du formulaire</span>
            </wcs-message>
            
            <wcs-button type="submit">Enregistrer</wcs-button>
        </div>
    `,
};