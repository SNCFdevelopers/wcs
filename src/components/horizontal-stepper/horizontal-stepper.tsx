import {
    Component,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    h,
    Host, Listen,
    Method,
    Prop,
    State,
    Watch
} from '@stencil/core';
import { HorizontalStepClickEvent, HorizontalStepConfig, HorizontalStepperMode } from './horizontal-stepper-interface';
import { HorizontalStep } from './horizontal-step';

/**
 * The horizontal-stepper is a representation of a user’s progress through a series of discrete steps.
 */
@Component({
    tag: 'wcs-horizontal-stepper',
    styleUrl: 'horizontal-stepper.scss',
    shadow: true,
})
export class HorizontalStepper implements ComponentInterface {
    @Element() private el!: HTMLWcsHorizontalStepperElement;
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
    @Prop() mode: HorizontalStepperMode = 'nonLinear';
    /**
     * Specifies whether a check should be displayed when a step is passed.
     */
    @Prop() checkOnComplete: boolean;
    /**
     * Emits when the user selects a new step.
     */
    @Event() wcsHorizontalStepClick!: EventEmitter<HorizontalStepClickEvent>

    /**
     * Used to know which current step index is selected (component internal calculations mainly for the animation)
     * @private
     */
    @State() private internalCurrentStepIndex: number;

    /**
     * To keep track of the focused step index for accessibility
     * @private
     */
    @State() private focusedStepIndex: number = this.currentStep ?? 0;

    componentWillLoad(): Promise<void> | void {
        this.internalCurrentStepIndex = this.currentStep;
        this.focusedStepIndex = this.currentStep;
        if (this.steps.length < 1) {
            throw new Error('You must add at least one step');
        }
    }

    @Watch('currentStep')
    onCurrentStepChange(newValue: number, oldValue: number) {
        //Check if the function is called before the component has finished its initialization in which case we do nothing
        if (this.internalCurrentStepIndex !== undefined) {
            const stepInterval = Math.abs(oldValue - newValue);
            this.el.style.setProperty('--wcs-progress-bar-animation-duration', 375 / stepInterval + 'ms');
            if (newValue !== oldValue) {
                for (let i = 0; i < stepInterval; i++) {
                    setTimeout(() => {
                        this.internalCurrentStepIndex -= (oldValue - newValue) > 0 ? 1 : -1;
                        
                        // Ensure the focusedStepIndex is changed only at the end of the animation
                        if (this.internalCurrentStepIndex === this.currentStep) {
                            this.focusedStepIndex = this.internalCurrentStepIndex;
                        }
                        
                        if (i === stepInterval - 1) {
                            this.el.style.removeProperty('--wcs-progress-bar-animation-duration');
                        }
                    }, (i * (375 / stepInterval)));
                }
            }
        }
    }

    @Method()
    async previous() {
        this.navigateToIndex(this.internalCurrentStepIndex - 1, 'backward');
    }

    @Method()
    async next() {
        this.navigateToIndex(this.internalCurrentStepIndex + 1, 'forward');
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
    
    private get stepsButtons(): HTMLButtonElement[] | [] {
        return Array.from(this.el.shadowRoot.querySelectorAll('.steps li .button-step'));
    }
    
    @Listen('keydown')
    handleKeyDown(ev: KeyboardEvent) {
        if (ev.key === 'ArrowRight') {
            this.focusClosestStep('next');
        } else if (ev.key === 'ArrowLeft') {
            this.focusClosestStep('previous');
        }
    }
    
    private focusClosestStep(direction: 'next' | 'previous') {
        const stepsButtons = this.stepsButtons;
        
        switch (direction) {
            case 'next':
                for (let i = this.focusedStepIndex + 1; i < stepsButtons.length; i++) {
                    if (!stepsButtons[i].disabled) {
                        this.focusedStepIndex = i;
                        this.focusStep(this.focusedStepIndex);
                        return;
                    }
                }
                break;
            case 'previous':
                for (let i = this.focusedStepIndex - 1; i >= 0; i--) {
                    if (!stepsButtons[i].disabled) {
                        this.focusedStepIndex = i;
                        this.focusStep(this.focusedStepIndex);
                        return;
                    }
                }
                break;
        }
    }
    
    focusStep(index: number) {
        const step = this.stepsButtons[index] as HTMLButtonElement;
        if (step) {
            requestAnimationFrame(() => step.focus());
        }
    }

    render(): any {
        return (
            <Host>
                <ul class="steps" role='tablist' aria-orientation={"horizontal"}>
                    {this.steps.map((step: HorizontalStepConfig, index) =>
                        (<HorizontalStep step={step}
                                         passed={index <= this.internalCurrentStepIndex}
                                         checkOnComplete={this.checkOnComplete}
                                         complete={this.isComplete(step, index)}
                                         active={index === this.internalCurrentStepIndex}
                                         first={index === 0}
                                         index={index + 1}
                                         tabIndex={this.focusedStepIndex === index ? 0 : -1}
                                         total={this.steps.length}
                                         disable={this.isDisable(step, index)}
                                         onClick={step => this.wcsHorizontalStepClick.emit({step, index})}
                            />
                        )
                    )}
                </ul>
                {this.renderLabels()}
            </Host>
        );
    }

    private isComplete(step: HorizontalStepConfig, index: number) {
        return index <= this.internalCurrentStepIndex || step.complete;
    }

    private renderLabels() {
        if (this.steps.map(s => s.text).every(s => !s)) {
            return null;
        } else {
            return <div class="label-container">
                {this.steps.map((step, index) =>
                    (<div data-first={index === 0} data-current={index === this.internalCurrentStepIndex && !step.disable}
                          data-disable={this.isDisable(step, index)} data-last={index === this.steps.length - 1}>
                        <span>{step.text}</span></div>)
                )}
            </div>;
        }
    }

    private isDisable(step, index) {
        return step.disable || (this.mode === 'linear' && (!this.isNextPossibleStep(index) && this.internalCurrentStepIndex < index));
    }

    private isNextPossibleStep(index) {
        if (index === 0) return true;
        if (this.steps[index - 1]?.disable || this.previousStepIsCompleteAndNotActive(index)) return this.isNextPossibleStep(index - 1);
        return this.internalCurrentStepIndex === index - 1;
    }

    private previousStepIsCompleteAndNotActive(index) {
        return this.steps[index - 1]?.complete && index - 1 !== this.internalCurrentStepIndex;
    }
}
