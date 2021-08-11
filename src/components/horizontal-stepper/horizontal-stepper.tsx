import {
    Component,
    ComponentInterface,
    Host,
    h,
    State,
    Prop,
    Element,
    EventEmitter,
    Event, Watch, Method
} from '@stencil/core';
import { WcsButtonMode } from '../button/button-interface';
import { HorizontalStepClickEvent, HorizontalStepConfig } from './horizontal-stepper-interface';
import { HorizontalStep } from './horizontal-step';

@Component({
    tag: 'wcs-horizontal-stepper',
    styleUrl: 'horizontal-stepper.scss',
    shadow: true,
})
export class HorizontalStepper implements ComponentInterface {
    @Element() el!: HTMLWcsHorizontalStepperElement;
    /**
     * index of the active step. The index corresponds to the index of the step in the 'steps' list
     */
    @Prop({mutable: true}) currentStep: number = 0;
    /**
     * steps to display
     */
    @Prop() steps: HorizontalStepConfig[];
    /**
     * Specifies if the stepper is in linear mode (the user can only click on the next step)
     * or non-linear (the user can click on any step)
     */
    @Prop() mode: 'linear' | 'nonLinear' = 'nonLinear';
    /**
     * Specifies whether a check should be displayed when a step is passed.
     */
    @Prop() checkOnComplete: boolean;
    /**
     * Emits when the user selects a new step.
     */
    @Event() wcsHorizontalStepClick!: EventEmitter<HorizontalStepClickEvent>
    @State() buttonMode: WcsButtonMode = 'stroked';
    @State() internalCurrentStep;

    componentWillLoad(): Promise<void> | void {
        this.internalCurrentStep = this.currentStep;
        if (this.steps.length < 1) {
            throw new Error('You must add at least one step');
        }
    }

    @Watch('currentStep')
    // @ts-ignore
    private onCurrentStepChange(newValue: number, oldValue: number) {
        const stepInterval = Math.abs(oldValue - newValue);
        this.el.style.setProperty('--wcs-progress-bar-animation-duration', 375 / stepInterval + 'ms');
        if (newValue !== oldValue) {
            for (let i = 0; i < stepInterval; i++) {
                setTimeout(() => {
                    this.internalCurrentStep -= (oldValue - newValue) > 0 ? 1 : -1;
                    if (i === stepInterval - 1) {
                        this.el.style.removeProperty('--wcs-progress-bar-animation-duration');
                    }
                }, (i * (375 / stepInterval)));
            }
        }
    }

    @Method()
    async previous() {
        this.navigateToIndex(this.internalCurrentStep - 1, 'backward');
    }

    @Method()
    async next() {
        this.navigateToIndex(this.internalCurrentStep + 1, 'forward');
    }

    private navigateToIndex(index: number, direction: 'backward' | 'forward'): void {
        if (index >= 0 && index <= this.steps.length - 1) {
            if (this.steps[index]?.complete || this.steps[index]?.disable) {
                this.navigateToIndex(index + (direction === 'forward' ? 1 : -1), direction)
            } else {
                this.currentStep = index;
            }
        }
    }

    render(): any {
        return (
            <Host>
                <div class="steps">
                    {this.steps.map((step, index) =>
                        (<HorizontalStep step={step}
                                         passed={index <= this.internalCurrentStep}
                                         checkOnComplete={this.checkOnComplete}
                                         complete={this.isComplete(step, index)}
                                         active={index === this.internalCurrentStep}
                                         first={index === 0}
                                         disable={this.isDisable(step, index)}
                                         onClick={step => this.wcsHorizontalStepClick.emit({step, index})}
                            />
                        )
                    )}
                </div>
                {this.renderLabels()}
            </Host>
        );
    }

    private isComplete(step: HorizontalStepConfig, index: number) {
        return index <= this.internalCurrentStep || step.complete;
    }

    private renderLabels() {
        if (this.steps.map(s => s.text).every(s => !s)) {
            return null;
        } else {
            return <div class="label-container">
                {this.steps.map((step, index) =>
                    (<div data-first={index === 0} data-current={index === this.internalCurrentStep && !step.disable}
                          data-disable={this.isDisable(step, index)} data-last={index === this.steps.length - 1}>
                        <span>{step.text}</span></div>)
                )}
            </div>;
        }
    }

    private isDisable(step, index) {
        return step.disable || (this.mode === 'linear' && (!this.isNextPossibleStep(index) && this.internalCurrentStep < index));
    }

    private isNextPossibleStep(index) {
        if (index === 0) return true;
        if (this.steps[index - 1]?.disable || this.previousStepIsCompleteAndNotActive(index)) return this.isNextPossibleStep(index - 1);
        return this.internalCurrentStep === index - 1;
    }

    private previousStepIsCompleteAndNotActive(index) {
        return this.steps[index - 1]?.complete && index - 1 !== this.internalCurrentStep;
    }
}
