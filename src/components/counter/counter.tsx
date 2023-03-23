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
 * For larger or specific ranges, please use <a href=".?path=/docs/components-input--documentation">wcs-input (type number)</a>
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
     * The current value of the counter.
     */
    @Prop({mutable: true}) value!: number;

    /**
     * The label of the counter.<br/>
     * e.g. Number of passengers, train carriages, railroad tracks...
     */
    @Prop({mutable: false}) label!: string;

    /**
     * The minimum value of the counter.
     */
    @Prop({mutable: true}) min: number;

    /**
     * The maximum value of the counter.
     */
    @Prop({mutable: true}) max: number;

    /**
     * Defines by how much the counter will be incremented or decremented.
     */
    @Prop({mutable: true}) step: number = 1;

    /**
     * Emitted when the value of the counter has changed.
     */
    @Event() wcsChange!: EventEmitter<CounterChangeEventDetail>;

    /**
     * Only for animation and display purpose
     */
    @State() private displayedValue: number;

    componentWillLoad() {
        this.displayedValue = this.value;

        if (!isWcsCounterSize(this.size)) {
            console.error(`Invalid size value for wcs-counter : "${this.size}". Must be one of "${WcsCounterSizeValues.join(', ')}"`);
            this.size = "m"; // Default fallback value
        }
    }

    componentWillUpdate(): Promise<void> | void {
        this.displayedValue = this.value;
    }

    @Watch('value')
    valueChanged(newValue: number) {
        if(this.value > this.max) {
            this.value = this.max;
        } else if(this.value < this.min) {
            this.value = this.min;
        } else {
            console.log(newValue);
            this.value = newValue;
        }
        this.wcsChange.emit({
            value: this.value
        });
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
            this.value = this.min;
            this.displayedValue = this.value;
        }
        if (isEndKey(_event)) {
            _event.preventDefault();
            this.value = this.max
            this.displayedValue = this.value;
        }
    }

    private getCounterContainer = (): HTMLDivElement => {
        return Array.from(this.el.shadowRoot.children)
            .find(el => el.tagName === 'DIV') as HTMLDivElement;
    }

    private handleDecrement = () => {
        if (this.value > this.min) {
            this.value -= this.step;
            this.animate('up');
        }
    };

    private handleIncrement = () => {
        if (this.value < this.max) {
            this.value += this.step;
            this.animate('down');
        }
    };

    private animate = (direction: 'up' | 'down') => {
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
        }, 1000 * ANIMATION_DURATION - 20);
    }

    render() {
        return (
            <Host>
                <wcs-button class="wcs-primary"
                            shape="round"
                            size="s"
                            onClick={() => this.handleDecrement()}
                            disabled={this.value === this.min}>
                    <wcs-mat-icon icon="remove" size="s"></wcs-mat-icon>
                </wcs-button>
                <div class="counter-container">
                    <span class="outliers hidden" aria-hidden="true">{this.displayedValue - this.step}</span>
                    <span tabindex="0"
                          role="spinbutton"
                          class="current-value"
                          onKeyDown={(event) => this.onKeyDown(event)}
                          aria-valuenow={this.value}
                          aria-valuetext={this.value}
                          aria-valuemin={this.min}
                          aria-valuemax={this.max}
                          aria-label={this.label}>{this.displayedValue}</span>
                    <span class="outliers hidden" aria-hidden="true">{this.displayedValue + this.step}</span>
                </div>
                <wcs-button class="wcs-primary"
                            shape="round"
                            size="s"
                            onClick={() => this.handleIncrement()}
                            disabled={this.value === this.max}>
                    <wcs-mat-icon icon="add" size="s"></wcs-mat-icon>
                </wcs-button>
            </Host>
        );
    }
}
