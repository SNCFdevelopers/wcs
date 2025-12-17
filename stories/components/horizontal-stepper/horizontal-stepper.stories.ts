import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import {
    HorizontalStepClickEvent,
    HorizontalStepConfig,
    HorizontalStepperMode
} from '../../../src/components/horizontal-stepper/horizontal-stepper-interface';
import { createRef, Ref, ref } from 'lit-html/directives/ref.js';
import { HorizontalStepper } from '../../../src/components/horizontal-stepper/horizontal-stepper';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { withActions } from 'storybook/actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';


const meta: Meta = {
    title: 'Components/HorizontalStepper',
    component: 'wcs-horizontal-stepper',
    argTypes: {
        ...getComponentArgs('wcs-horizontal-stepper'),
        steps: {
            table: {
                type: {
                    detail: `
text?: string;
disable?: boolean;
complete?: boolean;
button: StepButton;

👉 \`StepButton\` can be a \`StepIconButton\` or a \`StepTextButton\` :

StepIconButton {
  kind: "Icon";
  iconName: string;
  family?: MaterialIconFamily;
}

StepTextButton {
  kind: "Text";
  text: string;
}
`
                }
            }
        },
    },
    parameters: {
        actions: {
            handles: [
                'wcsHorizontalStepClick'
            ]
        },
    },
    decorators: [withActions]
};
export default meta;

type HorizontalStepperArgs = {
    checkOnComplete: boolean,
    mode: HorizontalStepperMode,
    steps: HorizontalStepConfig[],
    currentStep: number
}

const Template = (args: HorizontalStepperArgs, stepperRef: Ref<Element>) => html`
    <wcs-horizontal-stepper ?check-on-complete=${args.checkOnComplete}
                            current-step=${ifDefined(args.currentStep)}
                            mode=${args.mode}
                            .steps=${args.steps}
                            id="horizontal-stepper"
                            ${ref(stepperRef)}
                            @wcsHorizontalStepClick=${stepClickHandler}></wcs-horizontal-stepper>
    <br/>
    <wcs-button mode="clear" @click=${(e: MouseEvent) => onPreviousButtonClick(e, stepperRef)}>Previous</wcs-button>
    <wcs-button mode="clear" @click=${(e: MouseEvent) => onNextButtonClick(e, stepperRef)}>Next</wcs-button>
`;

const stepClickHandler = (event: CustomEvent<HorizontalStepClickEvent>) => {
    (event.target as HorizontalStepper).currentStep = event.detail.index;
}

const onPreviousButtonClick = (_: Event, ref: Ref<Element>) => {
    (ref.value as HorizontalStepper).previous();
}

const onNextButtonClick = (_: Event, ref: Ref<Element>) => {
    (ref.value as any as HorizontalStepper).next();
}

export const Default: StoryObj<HorizontalStepperArgs> = {
    render: (args) => {
        const defaultHorizontalStepperRef = createRef();
        return Template(args, defaultHorizontalStepperRef)
    },
    args: {
        mode: 'linear',
        checkOnComplete: false,
        steps: [
            {text: 'Initialisation', button: {kind: 'Icon', iconName: 'location_on'}},
            {text: 'Désactivé', disable: true, button: {kind: 'Icon', iconName: 'remove_circle_outline'}},
            {text: 'Informations personnelles', button: {kind: 'Icon', iconName: 'person'}},
            {text: 'Dossier', button: {kind: 'Icon', iconName: 'folder'}},
            {text: 'Finalisation', button: {kind: 'Icon', iconName: 'analytics', family: 'filled'}}
        ]
    }
};

/**
 * When using the stepper in `linear` mode with steps that do not have a descriptive text label (e.g., just numbers),
 * it is mandatory (for accessibility reasons) to set the `ariaLabel` property for each step.
 * This provides a descriptive label for screen readers, ensuring the component is accessible.
 */
export const TextWithoutLabelLinear: StoryObj<HorizontalStepperArgs> = {
    render: (args) => {
        const textWithoutLabelLinearHorizontalStepperRef = createRef();
        return Template(args, textWithoutLabelLinearHorizontalStepperRef)
    },
    args: {
        checkOnComplete: true,
        mode: 'linear',
        steps: [
            {ariaLabel: "Étape 1", button: {kind: 'Text', text: '1'}},
            {ariaLabel: "Étape 2", button: {kind: 'Text', text: '2'}},
            {ariaLabel: "Étape 3", button: {kind: 'Text', text: '3'}},
            {ariaLabel: "Étape 4", disable: true, button: {kind: 'Text', text: '4'}},
            {ariaLabel: "Étape 5", button: {kind: 'Text', text: '5'}},
            {ariaLabel: "Étape 6", complete: true, button: {kind: 'Text', text: '6'}},
            {ariaLabel: "Étape 7", button: {kind: 'Text', text: '7'}},
        ]
    }
}
