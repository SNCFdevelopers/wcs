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
    closeButtonAriaLabel: string,
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
                   close-button-aria-label=${args.closeButtonAriaLabel}
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
        closeButtonAriaLabel: 'Fermer',
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

/**
 * **Control large content behavior**  
 * When the content is too long, the modal can be customized with a max-height and an overflow. The CSS variables are :
 * - `--wcs-modal-max-height` for controlling the max-height _(default: 80%)_
 * - `--wcs-modal-overflow-y` for controlling the overflow-y _(default: auto)_
 * - For `overflow-x`, adapt the modal size to your needs instead of adding a scrollbar
 * _(see [Sizes story](.?path=/docs/components-modal--documentation#sizes))_
 */
export const OverflowAndMaxHeight: StoryObj = {
    render: (args) => {
        // FIXME
        // @ts-ignore
        const modalRef = createRef<HTMLWcsModalElement>();
        return html`
            <style>
                .custom-variables {
                    --wcs-modal-max-height: ${args["--wcs-modal-max-height"]};
                    --wcs-modal-overflow-y: ${args["--wcs-modal-overflow-y"]};
                }
            </style>
            <wcs-button @click="${_ => {
                modalRef.value.show = true;
            }}" id=${args.modalTriggerControlsId}>Show Modal ${args.size ? '(size: ' + args.size + ')' : null}
            </wcs-button>
            <wcs-modal ?show=${args.show}
                       modal-trigger-controls-id=${args.modalTriggerControlsId}
                       class="custom-variables"
                       ${ref(modalRef)}
                       ?without-backdrop=${args.withoutBackdrop}
                       ?show-close-button=${args.showCloseButton}
                       close-button-label=${args.closeButtonLabel}
                       size=${ifDefined(args.size)}
                       ?hide-actions=${args.hideActions}>
                <div slot="header">Custom height and overflow modal</div>
                <p><b>I have this in my CSS, edit me in the arguments !</b></p>
                <ul>
                    <li><code>--wcs-modal-max-height: 400px;</code></li>
                    <li><code>--wcs-modal-overflow-y: auto;</code></li>
                </ul>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                    dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
                    ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie,
                    enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa,
                    scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero
                    pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio
                    eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus
                    orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque
                    fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                </p>
                <p>
                    Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit
                    pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh,
                    in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur
                    aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit
                    amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien.
                    Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis
                    vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique
                    ligula justo vitae magna.
                </p>
                <p>
                    Curabitur eget fringilla ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam
                    efficitur mi vel luctus porta. Proin sollicitudin tempor nisi, nec dapibus ipsum blandit et. Aenean
                    sit amet sem consectetur, malesuada enim at, condimentum ligula. Donec venenatis lobortis metus in
                    pharetra. Curabitur dignissim lectus euismod aliquet ullamcorper. Suspendisse et nunc eget tortor
                    scelerisque mattis. Curabitur a est finibus, maximus nisi eu, volutpat libero. Ut commodo massa
                    diam, a tincidunt nibh luctus nec. Nam molestie volutpat nibh, eu finibus justo accumsan quis. Sed
                    efficitur, turpis vel scelerisque lacinia, nibh est posuere lorem, efficitur dignissim erat turpis
                    maximus neque. Donec consequat eros metus, vitae pharetra metus sollicitudin id. Praesent ut gravida
                    erat. Donec nec ornare quam.
                </p>
                <div slot="actions">
                    <wcs-button @click="${_ => { modalRef.value.show = false; }}" mode="stroked">Annuler</wcs-button>
                    <wcs-button @click="${_ => {modalRef.value.show = false; }}">OK</wcs-button>
                </div>
            </wcs-modal>
        `;
    },
    args: {
        ...Default.args,
        modalTriggerControlsId: "modal-trigger-controls-5",
        "--wcs-modal-max-height": "400px",
        "--wcs-modal-overflow-y": "auto"
    }
}
