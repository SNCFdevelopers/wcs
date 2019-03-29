import { Component, Element, State, Prop, Event, EventEmitter, Watch, Listen } from '@stencil/core';

import { SelectCompareFn, SelectChangeEventDetail } from './select-interface';
import MDCRipple from '@material/ripple';

@Component({
    tag: 'wcs-select',
    styleUrl: 'select.scss',
    shadow: true
})
export class Select {

    @Element() el!: HTMLWcsSelectElement;

    @State() isExpanded = false;
    @State() hasLoaded = false;

    /**
     * If `true`, the user cannot interact with the select.
     */
    @Prop() disabled = false;

    /**
     * The text to display when the select is empty.
     */
    @Prop({ mutable: true }) placeholder?: string | null;

    /**
     * The name of the control, which is submitted with the form data.
     */
    @Prop() name?: string;

    /**
     * If `true`, the select can accept multiple values.
     */
    @Prop() multiple = false;

    /**
     * A property name or function used to compare object values
     */
    @Prop() compareWith?: string | SelectCompareFn | null;

    /**
     * the value of the select.
     */
    @Prop({ mutable: true }) value?: any | null;

    /**
     * Emitted when the value has changed.
     */
    @Event() wcsChange!: EventEmitter<SelectChangeEventDetail>;

    /**
     * Emitted when the select has focus.
     */
    @Event() wcsFocus!: EventEmitter<void>;

    /**
     * Emitted when the select loses focus.
     */
    @Event() wcsBlur!: EventEmitter<void>;
    didInit: boolean;

    @Watch('disabled')
    disabledChanged() {
        // this.emitStyle();
    }

    @Watch('isExpanded')
    isExpandedChanged() {
        console.log(this.isExpanded);
        // TODO : Add css classes to show the select options
    }

    private addRippleEffect() {
        const ripple = new MDCRipple.MDCRipple(this.el.shadowRoot.querySelector('.wcs-select-text'));
        ripple.unbound = true;
    }

    componentDidLoad() {
        this.el.addEventListener('click', () => this.isExpanded = !this.isExpanded);
        this.hasLoaded = true;
        this.addRippleEffect();
    }

    hostData() {
        return {
            'class': {
                'is-expanded': this.isExpanded
            }
        };
    }

    @Listen('wcsSelectOptionClick')
    testing(event: CustomEvent) {
        this.value = event.detail.value;
        this.placeholder = event.detail.displayText;
    }

    render() {
        if (this.hasLoaded) {
            this.el.shadowRoot.querySelector('.wcs-select-options')
                .setAttribute('style', `width: calc(${this.el.offsetWidth}px - 2.50rem - 2px);`);
        }
        return (
            <div class={this.isExpanded ? 'is-expanded' : '' + ' wcs-select-wrapper'}>
                <div class="wcs-select-text">
                    <p>{this.placeholder}</p>
                    <div></div>
                </div>
                <div class="wcs-select-options">
                    <slot name="wcs-select-option" />
                </div>
            </div>
        );
    }
}
