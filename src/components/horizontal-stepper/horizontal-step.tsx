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
        /*
        When using list-style: none in CSS, it removes the semantic of the list in Safari.
        So we add role="list" manually to provide semantic to screen readers
        https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
        https://css-tricks.com/snippets/css/remove-list-markers-without-affecting-semantics/ 
         */
        <li role="listitem" class="graphic-step" data-first={first}>
            {first ? null : (<wcs-progress-bar value={passed ? 100 : 0} aria-hidden="true"></wcs-progress-bar>)}
            <wcs-button style={{'backgroundColor': 'white'}}
                        aria-label={step.text}
                        onClick={_ => onClick(step)}
                        ref={(el: HTMLWcsButtonElement) => {
                            active ? el.setAriaAttribute('aria-current', 'step') : el.setAriaAttribute('aria-current', null)
                        }}
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

