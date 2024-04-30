import { FunctionalComponent, h } from '@stencil/core';
import { HorizontalStepConfig, StepButton } from './horizontal-stepper-interface';

interface HorizontalStepProps {
    step: HorizontalStepConfig;
    checkOnComplete: boolean;
    complete: boolean;
    passed: boolean;
    active: boolean;
    index: number;
    tabIndex: number;
    total: number;
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
        index,
        tabIndex,
        total,
        onClick
    }) => {
    return (
        <li class="graphic-step" data-first={first} aria-label={step.text}>
            {first ? null : (<wcs-progress-bar value={passed ? 100 : 0}></wcs-progress-bar>)}
            <button class={{'button-step': true, 'active': active, 'complete': complete, 'disable': disable}}
                        role={'tab'}
                        tabindex={tabIndex}
                        aria-label={step.text}
                        aria-selected={active ? 'true' : 'false'}
                        aria-posinset={index}
                        aria-setsize={total}
                        onClick={_ => onClick(step)}
                        disabled={disable}>{getButtonContent(step.button, checkOnComplete, complete, active)}</button>
            <wcs-button style={{'backgroundColor': 'white'}}
                        tabindex={-1}
                        onClick={_ => onClick(step)}
                        shape="round" mode={(active || complete) && !step.disable ? 'plain' : 'stroked'}
                        disabled={disable}>
                {getButtonContent(step.button, checkOnComplete, complete, active)}
            </wcs-button>
        </li>
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

