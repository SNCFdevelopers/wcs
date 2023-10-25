import {
    Component,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Prop,
    State,
    Watch
} from '@stencil/core';
import { isEndKey, isHomeKey, isKeydown, isKeyup } from '../../utils/helpers';
import { CounterChangeEventDetail, isWcsCounterSize, WcsCounterSize, WcsCounterSizeValues } from './counter-interface';

const ANIMATION_DURATION = 0.175 // seconds

/**
 * Counter component, meant to be used for small range of values (e.g : 0 - 5).<br>
 * For larger or specific ranges, please use [wcs-input (type number)](.?path=/docs/components-input--documentation)
 */
@Component({
    tag: 'wcs-counter',
    styleUrl: 'counter.scss',
    shadow: true,
})
export class Counter implements ComponentInterface {
    @Element() private el!: HTMLElement;

    /**
     * Specify the size (height) of the counter.
     */
    @Prop({reflect: true}) size: WcsCounterSize = 'm';

    /**
     * The label of the counter.<br/>
     * e.g. Number of passengers, train carriages, railroad tracks...
     */
    @Prop({mutable: false}) label!: string;

    /**
     * The minimum value of the counter.
     * If the value of the min attribute isn't set, then the element has no minimum value.
     */
    @Prop({mutable: true}) min?: number;

    /**
     * The maximum value of the counter.
     * If the value of the max attribute isn't set, then the element has no maximum value.
     */
    @Prop({mutable: true}) max?: number;

    /**
     * Defines by how much the counter will be incremented or decremented.
     */
    @Prop({mutable: true}) step: number = 1;

    /**
     * Emitted when the value of the counter has changed.
     */
    @Event() wcsChange!: EventEmitter<CounterChangeEventDetail>;

    /**
     * The current value of the counter.
     */
    @Prop({mutable: true}) value!: number;

    /**
     * Only for animation and display purpose
     */
    @State() private displayedValue: number;

    private animateRunning = false;

    /**
     * Emitted when the counter loses focus.
     */
    @Event() wcsBlur!: EventEmitter<FocusEvent>;

    componentWillLoad() {
        this.handleValueChange();

        if (!isWcsCounterSize(this.size)) {
            console.error(`Invalid size value for wcs-counter : "${this.size}". Must be one of "${WcsCounterSizeValues.join(', ')}"`);
            this.size = "m"; // Default fallback value
        }
    }

    /**
     * Current value change => handle event and interval
     */
    @Watch('value')
    valueChange(newVal: any, oldVal: any) {
        if(oldVal === newVal) return;

        this.handleValueChange();
    }

    private handleValueChange() {
        this.setMinimumIfValueIsUndefinedOrNull();
        this.ensureValueIsNotOutOfMinMax();
        this.updateDisplayValueIfNoAnimationRunning();
    }

    private updateDisplayValueIfNoAnimationRunning() {
        if (!this.animateRunning) {
            this.displayedValue = this.value;
        }
    }

    private ensureValueIsNotOutOfMinMax() {
        if (this.max !== undefined && this.value > this.max) {
            this.value = this.max;
        } else if (this.min !== undefined && this.value < this.min) {
            this.value = this.min;
        }
    }

    private setMinimumIfValueIsUndefinedOrNull() {
        if (this.value === undefined || this.value === null) {
            this.value = this.min ?? 0;
        }
    }

    onKeyDown(_event: KeyboardEvent) {
        if (isKeyup(_event)) {
            _event.preventDefault();
            this.handleIncrement()
        }
        if (isKeydown(_event)) {
            _event.preventDefault();
            this.handleDecrement()
        }
        if (isHomeKey(_event)) {
            _event.preventDefault();
            if (this.min != null) {
                this.value = this.min;
                this.displayedValue = this.value;
                this.notifyChange();
            }
        }
        if (isEndKey(_event)) {
            _event.preventDefault();
            if (this.max != null) {
                this.value = this.max;
                this.displayedValue = this.value;
                this.notifyChange();
            }
        }
    }

    private notifyChange() {
        this.wcsChange.emit({
            value: this.value
        });
    }
    
    private getCounterContainer = (): HTMLDivElement => {
        return Array.from(this.el.shadowRoot.children)
            .find(el => el.tagName === 'DIV') as HTMLDivElement;
    }

    private handleDecrement = () => {
        if (this.min === undefined || this.value > this.min) {
            // we set animateRunning here to prevent the watch method on value prop from affecting the displayed value
            // before the animation runs.
            this.animateRunning = true; 
            this.value -= this.step;
            this.notifyChange();
            this.animate('up');
        }
    };

    private handleIncrement = () => {
        if (this.max === undefined || this.value < this.max) {
            // we set animateRunning here to prevent the watch method on value prop from affecting the displayed value
            // before the animation runs.
            this.animateRunning = true; 
            this.value += this.step;
            this.notifyChange();
            this.animate('down');
        }
    };

    private animate = (direction: 'up' | 'down'): void => {
        // In case someone call animate function, we want ensured that animateRunning is set to true to prevent other 
        // method to mutate the displayedValue.
        this.animateRunning = true;  

        const counterContainer = this.getCounterContainer();
        const outliers = Array.from(counterContainer.children)
            .filter((span: HTMLSpanElement) => span.classList.contains('outliers'));

        counterContainer.classList.add('animate-' + direction);
        outliers.forEach((span: HTMLSpanElement) => {
            span.classList.remove('hidden')
        });
        setTimeout(() => {
            counterContainer.classList.remove('animate-' + direction);
            outliers.forEach((span: HTMLSpanElement) => {
                span.classList.add('hidden')
            });
            this.displayedValue = this.value;

            this.animateRunning = false;
        }, 1000 * ANIMATION_DURATION - 20);
    }

    render() {
        return (
            <Host>
                <wcs-button class="wcs-primary"
                            shape="round"
                            size="s"
                            tabindex={-1}
                            onClick={() => this.handleDecrement()}
                            onBlur={(event) => this.wcsBlur.emit(event)}
                            disabled={this.value === this.min}>
                    <wcs-mat-icon icon="remove" size="s"></wcs-mat-icon>
                </wcs-button>
                <div class="counter-container">
                    <span id="outlier-down" class="outliers hidden"
                          aria-hidden="true">{this.displayedValue - this.step}</span>
                    <span tabindex="0"
                          role="spinbutton"
                          class="current-value"
                          onBlur={(event) => this.wcsBlur.emit(event)}
                          onKeyDown={(event) => this.onKeyDown(event)}
                          aria-valuenow={this.value}
                          aria-valuetext={this.value}
                          aria-valuemin={this.min}
                          aria-valuemax={this.max}
                          aria-label={this.label}>{this.displayedValue}</span>
                    <span id="outlier-up" class="outliers hidden"
                          aria-hidden="true">{this.displayedValue + this.step}</span>
                </div>
                <wcs-button class="wcs-primary"
                            shape="round"
                            size="s"
                            tabindex={-1}
                            onClick={() => this.handleIncrement()}
                            onBlur={(event) => this.wcsBlur.emit(event)}
                            disabled={this.value === this.max}>
                    <wcs-mat-icon icon="add" size="s"></wcs-mat-icon>
                </wcs-button>
            </Host>
        );
    }
}
