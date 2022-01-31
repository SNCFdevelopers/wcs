import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { createRef, ref } from 'lit-html/directives/ref';
import { ModalSize } from '../../src/components/modal/modal-interface';

export default {
    title: 'Example/Modal',
    component: 'wcs-modal',
    parameters: {
        actions: {
            handles: [
                'wcsDialogClosed',
            ]
        }
    }
} as Meta;

const Template: Story<Partial<{ withoutBackdrop: boolean, show: boolean, showCloseButton: boolean, size: ModalSize }>> = (args) => {
    // FIXME
    // @ts-ignore
    const modalRef = createRef<HTMLWcsModalElement>();
    return html`
        <wcs-button @click="${_ => {
            modalRef.value.show = true;
        }}">Show Modal ${args.size ? '(size: ' + args.size + ')' : null}
        </wcs-button>
        <wcs-modal ?show=${args.show}
                   ${ref(modalRef)}
                   ?without-backdrop=${args.withoutBackdrop}
                   ?show-close-button=${args.showCloseButton}
                   size=${ifDefined(args.size)}>
            <div slot="header">Titre de la modale</div>
            Voulez-vous quittez la page ?
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a cursus mi. Nullam et sem mi. Interdum et
                malesuada fames ac ante ipsum primis in faucibus. Fusce sollicitudin pellentesque libero nec elementum.
            </p>
            <div slot="actions">
                <wcs-button @click="${_ => {
                    modalRef.value.show = false;
                }}" mode="stroked">Annuler
                </wcs-button>
                <wcs-button @click="${_ => {
                    modalRef.value.show = false;
                }}">OK
                </wcs-button>
            </div>
        </wcs-modal>
    `;
};

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

const SizeTemplate: Story<Partial<{ withoutBackdrop: boolean, show: boolean, showCloseButton: boolean, size: ModalSize }>> = (args) => html`
    <p>For this story, the size param is not configurable, it is set manually for each button to easily show all
        the different available sizes.</p>
    ${Template({...args, show: false, size: 's'})}
    ${Template({...args, show: false, size: 'm'})}
    ${Template({...args, show: false, size: 'l'})}
    ${Template({...args, show: false, size: 'xl'})}
`;

export const Sizes = SizeTemplate.bind({});
Sizes.args = {
    show: true,
    showCloseButton: true,
};
