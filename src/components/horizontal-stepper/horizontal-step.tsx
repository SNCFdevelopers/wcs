import { FunctionalComponent, h } from '@stencil/core';
import { HorizontalStepConfig, StepButton } from './horizontal-stepper-interface';

interface HorizontalStepProps {
    step: HorizontalStepConfig;
    checkOnComplete: boolean;
    complete: boolean;
    passed: boolean;
    active: boolean;
    first: boolean;
    disable: boolean;
    onClick: (step: HorizontalStepConfig) => void;
}

export const HorizontalStep: FunctionalComponent<HorizontalStepProps> = (
    {
        step,
        checkOnComplete,
        complete,
        passed,
        active,
        first,
        disable,
        onClick
    }) => {
    return (
        <div class="graphic-step" data-first={first}>
            {first ? null : (<wcs-progress-bar value={passed ? 100 : 0}></wcs-progress-bar>)}
            <wcs-button style={{'backgroundColor': 'white'}}
                        shape="round"
                        onClick={_ => onClick(step)}
                        mode={(active || complete) && !step.disable ? 'plain' : 'stroked'}
                        disabled={disable}>{getButtonContent(step.button, checkOnComplete, complete, active)}</wcs-button>
        </div>
    );
}

const getButtonContent = (stepButton: StepButton, checkOnComplete: boolean, complete: boolean, active: boolean) => {
    if (checkOnComplete && complete && !active) {
        return (<wcs-mat-icon size="m" icon="done" family="outlined"></wcs-mat-icon>);
    }
    switch (stepButton.kind) {
        case 'Icon':
            return (<wcs-mat-icon size="m" icon={stepButton.iconName}
                                  family={stepButton.family ? stepButton.family : 'outlined'}></wcs-mat-icon>);
        case 'Text':
            return (stepButton.text);
    }
}

