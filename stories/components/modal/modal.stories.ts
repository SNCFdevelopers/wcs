import { Meta, StoryFn } from '@storybook/web-components';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { createRef, ref } from 'lit-html/directives/ref.js';
import { ModalSize } from '../../../src/components/modal/modal-interface';
import { html } from 'lit-html';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Modal',
    component: 'wcs-modal',
    argTypes: getComponentArgs('wcs-modal'),
    parameters: {
        actions: {
            handles: [
                'wcsDialogClosed',
            ]
        }
    },
    decorators: [withActions]
};

export default meta;

const Template: StoryFn<Partial<{ withoutBackdrop: boolean, show: boolean, showCloseButton: boolean, size: ModalSize, hideActions: boolean }>> = (args) => {
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
                   size=${ifDefined(args.size)}
                   ?hide-actions=${args.hideActions}>
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
    show: false,
    showCloseButton: true
};

export const WithoutBackdrop = Template.bind({});
WithoutBackdrop.args = {
    show: false,
    withoutBackdrop: true,
    showCloseButton: true
};

export const WithoutCloseButton = Template.bind({});
WithoutCloseButton.args = {
    show: false,
    showCloseButton: false
};

export const WithoutActions = Template.bind({});
WithoutActions.args = {
    show: false,
    showCloseButton: true,
    hideActions: true
};

const SizeTemplate: StoryFn<Partial<{ withoutBackdrop: boolean, show: boolean, showCloseButton: boolean, size: ModalSize, hideActions: boolean }>> = (args, context) => html`
    <p>For this story, the size param is not configurable, it is set manually for each button to easily show all
        the different available sizes.</p>
    ${Template({...args, show: false, size: 's'}, context)}
    ${Template({...args, show: false, size: 'm'}, context)}
    ${Template({...args, show: false, size: 'l'}, context)}
    ${Template({...args, show: false, size: 'xl'}, context)}
`;

export const Sizes = SizeTemplate.bind({});
Sizes.args = {
    show: true,
    showCloseButton: true,
};
