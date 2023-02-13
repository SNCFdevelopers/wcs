import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import {
    HorizontalStepClickEvent,
    HorizontalStepConfig,
    HorizontalStepperMode
} from '../../../src/components/horizontal-stepper/horizontal-stepper-interface';
import { createRef, ref } from 'lit-html/directives/ref.js';
import { HorizontalStepper } from '../../../src/components/horizontal-stepper/horizontal-stepper';
import { ifDefined } from 'lit-html/directives/if-defined.js';

const meta: Meta = {
    title: 'Components/HorizontalStepper',
    component: 'wcs-horizontal-stepper',
    parameters: {
        actions: {
            handles: [
                'wcsHorizontalStepClick'
            ]
        },
    }
};
export default meta;

const horizontalStepperRef = createRef();

const Template: StoryFn<Partial<{ checkOnComplete: boolean, mode: HorizontalStepperMode, steps: HorizontalStepConfig[], currentStep: number }>> = (args) => html`
    <wcs-horizontal-stepper ?check-on-complete=${args.checkOnComplete}
                            current-step=${ifDefined(args.currentStep)}
                            mode=${args.mode}
                            .steps=${args.steps}
                            id="horizontal-stepper"
                            ${ref(horizontalStepperRef)}
                            @wcsHorizontalStepClick=${stepClickHandler}></wcs-horizontal-stepper>
    <br/>
    <wcs-button mode="clear" @click=${onPreviousButtonClick}>Previous</wcs-button>
    <wcs-button mode="clear" @click=${onNextButtonClick}>Next</wcs-button>
`;

const stepClickHandler = (event: CustomEvent<HorizontalStepClickEvent>) => {
    (event.target as any as HorizontalStepper).currentStep = event.detail.index;
}

const onPreviousButtonClick = _ => {
    (horizontalStepperRef.value as any as HorizontalStepper).previous();
}

const onNextButtonClick = _ => {
    (horizontalStepperRef.value as any as HorizontalStepper).next();
}

export const Default = Template.bind({});
Default.args = {
    steps: [
        {text: 'Initialisation', button: {kind: 'Icon', iconName: 'location_on'}},
        {text: 'Désactivé', disable: true, button: {kind: 'Icon', iconName: 'remove_circle_outline'}},
        {text: 'Informations personnelles', button: {kind: 'Icon', iconName: 'person'}},
        {text: 'Dossier', button: {kind: 'Icon', iconName: 'folder'}},
        {text: 'Finalisation', button: {kind: 'Icon', iconName: 'analytics', family: 'filled'}}
    ]
};



export const TextWithoutLabelLinear = Template.bind({});
TextWithoutLabelLinear.args = {
    checkOnComplete: true,
    mode: 'linear',
    steps: [
        {button: {kind: 'Text', text: '1'}},
        {button: {kind: 'Text', text: '2'}},
        {button: {kind: 'Text', text: '3'}},
        {disable: true, button: {kind: 'Text', text: '4'}},
        {button: {kind: 'Text', text: '5'}},
        {complete: true, button: {kind: 'Text', text: '6'}},
        {button: {kind: 'Text', text: '7'}},
    ]
};
