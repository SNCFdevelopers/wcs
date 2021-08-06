import { MaterialIconFamily } from '../mat-icon/mat-icon-interface';

export interface HorizontalStepConfig {
    text?: string;
    disable?: boolean;
    button: StepButton;
}

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
