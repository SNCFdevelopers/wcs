import { MaterialIconFamily } from '../mat-icon/mat-icon-interface';

/**
 * Stepper configuration interface
 */
export interface HorizontalStepConfig {
    /** Text displayed below the step button */
    text?: string;
    /** Specifies if the step is clickable or not */
    disable?: boolean;
    /** Specifies if the step is completed */
    complete?: boolean;
    /** Step button configuration */
    button: StepButton;
}

export type HorizontalStepperMode = 'linear' | 'nonLinear';

export type StepButton = StepIconButton | StepTextButton;

export interface StepIconButton {
    kind: 'Icon';
    iconName: string;
    family?: MaterialIconFamily;
}

export interface StepTextButton {
    kind: 'Text';
    text: string;
}

export interface HorizontalStepClickEvent {
    step: HorizontalStepConfig;
    index: number;
}
