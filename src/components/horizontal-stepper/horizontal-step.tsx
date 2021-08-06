import { FunctionalComponent, h } from '@stencil/core';
import { HorizontalStepConfig, StepButton } from './horizontal-stepper-interface';

interface HorizontalStepProps {
    step: HorizontalStepConfig;
    complete: boolean;
    active: boolean;
    first: boolean;
    disable: boolean;
    onClick: (step: HorizontalStepConfig) => void;
}

export const HorizontalStep: FunctionalComponent<HorizontalStepProps> = (
    {
        step,
        complete,
        active ,
        first,
        disable,
        onClick
    }) => {
    return (
        <div class="graphic-step" data-first={first}>
            {first ? null : (<wcs-progress-bar value={complete ? 100 : 0}></wcs-progress-bar>)}
            <wcs-button style={{'backgroundColor': 'white'}}
                        shape="round"
                        onClick={_ => onClick(step)}
                        mode={active && !step.disable ? 'plain' : 'stroked'}
                        disabled={disable}>{getButtonContent(step.button)}</wcs-button>
        </div>
    );
}

const getButtonContent = (stepButton: StepButton) => {
    switch (stepButton.kind) {
        case 'Icon':
            return (<wcs-mat-icon size="m" icon={stepButton.iconName} family={stepButton.family ? stepButton.family : 'outlined'}></wcs-mat-icon>);
        case 'Text':
            return (stepButton.text);
    }
}

