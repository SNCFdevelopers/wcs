import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
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

interface ModalStoryArgs {
    modalTriggerControlsId: string,
    withoutBackdrop: boolean,
    show: boolean,
    showCloseButton: boolean,
    size: ModalSize,
    hideActions: boolean
}

const Template: StoryFn<Partial<ModalStoryArgs>> = (args) => {
    // FIXME
    // @ts-ignore
    const modalRef = createRef<HTMLWcsModalElement>();
    return html`
        <wcs-button @click="${_ => {
            modalRef.value.show = true;
        }}" id=${args.modalTriggerControlsId}>Show Modal ${args.size ? '(size: ' + args.size + ')' : null}
        </wcs-button>
        <wcs-modal ?show=${args.show}
                   modal-trigger-controls-id=${args.modalTriggerControlsId}
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

export const Default: StoryObj<ModalStoryArgs> = {
    render: (args, context) => Template(args, context),
    args: {
        show: false,
        showCloseButton: true,
        modalTriggerControlsId: "modal-trigger-controls-0"
    }
};

/**
 * **Remove the gray background**  
 * The modal can be displayed without the default gray backdrop with `withoutBackdrop="true"`.
 */
export const WithoutBackdrop: StoryObj<ModalStoryArgs> = {
    render: (args, context) => Template(args, context),
    args: {
        show: false,
        withoutBackdrop: true,
        showCloseButton: true,
        modalTriggerControlsId: "modal-trigger-controls-2"
    }
};

/**
 * **Remove the default close button**  
 * The modal can be displayed without the default close button with `showCloseButton="false"`.
 */
export const WithoutCloseButton: StoryObj<ModalStoryArgs> = {
    render: (args, context) => Template(args, context),
    args: {
        show: false,
        showCloseButton: false,
        modalTriggerControlsId: "modal-trigger-controls-3"
    }
};

/**
 * **Remove the slot actions**  
 * The modal can be displayed without the default slot actions with `hideActions="true"`.
 * If you hide the actions, make sure you keep the `showCloseButton`, otherwise the modal will be closable only
 * with Escape (bad UX practice).
 */
export const WithoutActions: StoryObj<ModalStoryArgs> = {
    render: (args, context) => Template(args, context),
    args: {
        show: false,
        showCloseButton: true,
        hideActions: true,
        modalTriggerControlsId: "modal-trigger-controls-4"
    }
};

/**
 * For this story, the size param is not configurable, it is set manually for each button to easily show all the
 * different available sizes.
 */
export const Sizes: StoryObj<ModalStoryArgs> = {
    render: (args, context) => html`
        ${Template({...args, show: false, size: 's', modalTriggerControlsId: "modal-trigger-controls-5-s"}, context)}
        ${Template({...args, show: false, size: 'm', modalTriggerControlsId: "modal-trigger-controls-5-m"}, context)}
        ${Template({...args, show: false, size: 'l', modalTriggerControlsId: "modal-trigger-controls-5-l"}, context)}
        ${Template({...args, show: false, size: 'xl', modalTriggerControlsId: "modal-trigger-controls-5-xl"}, context)}
    `,
    args: {
        show: true,
        showCloseButton: true
    }
};
