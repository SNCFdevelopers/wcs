import { Component, Element, State, Prop, Event, EventEmitter, Watch, Listen, FunctionalComponent, ComponentInterface } from '@stencil/core';

import { SelectChangeEventDetail } from './select-interface';
import MDCRipple from '@material/ripple';

@Component({
    tag: 'wcs-select',
    styleUrl: 'select.scss',
    shadow: true
})
export class Select implements ComponentInterface {
    @Element() el!: HTMLWcsSelectElement;

    /** Wether the select is expanded */
    @State() expanded = false;

    /** Wether the component is fully loaded in the DOM. */
    @State() hasLoaded = false;

    /** Text to display for the selected option, when no option is selected, the value is undefined. */
    @State() displayText: string;

    /** When the host is focused. */
    @State() focused: boolean;

    /** If `true`, the user cannot interact with the select. */
    @Prop() disabled = false;

    /** The text to display when the select is empty. */
    @Prop({ mutable: true }) placeholder?: string | null;

    /** The name of the control, which is submitted with the form data. */
    @Prop() name?: string;

    /** The currently selected value. */
    @Prop({ mutable: true }) value?: any | null;

    @Prop({ context: 'window' }) window!: Window;

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

    private optionsEl!: HTMLElement;
    private contentEl!: HTMLInputElement;

    @Watch('disabled')
    disabledChanged() {
        // TODO: remove ripple effect, grey out component
    }

    componentDidLoad() {
        this.optionsEl = this.el.shadowRoot.querySelector('.wcs-select-options');
        this.contentEl = this.el.shadowRoot.querySelector('.wcs-select-content');
        this.expandOnClick();
        this.addRippleEffect();
        this.hasLoaded = true;
    }

    private expandOnClick() {
        /**
         * Keyboard navigation:
         * Focused:
         * - Space => Expanded + First value focused
         * Expanded:
         * - Esc => !Expanded + All value not focusable
         *
         * Value:focused:
         * - Enter => Select
         */
        this.el.addEventListener('mousedown', () => {
            if (!this.disabled) {
                if (this.expanded) {
                    this.unExpand();
                } else {
                    this.expand();
                }
            }
        });
    }

    private expand() {
        this.window.addEventListener('keydown', this.unExpandOnEscape);
        this.expanded = true;
    }

    // XXX: We use fat arrow to have a reference to the function and
    // being able to unregister it from the events.
    private unExpandOnEscape = (keyEvent: KeyboardEvent) => {
        if (keyEvent.code === 'Escape') {
            this.unExpand();
        }
    }

    private unExpand() {
        this.window.removeEventListener('keydown', this.unExpandOnEscape);
        this.expanded = false;
    }

    private addRippleEffect() {
        // XXX: Unwrapped dependency over MDCRipple...
        const ripple = new MDCRipple.MDCRipple(this.contentEl);
        ripple.unbound = true;
    }

    @Listen('window:click')
    onWindowClickEvent(event: MouseEvent) {
        if (this.expanded
            && event.target !== this.el) {
            this.expanded = false;
        }
    }

    @Listen('wcsSelectOptionClick')
    selectedOptionChanged(event: CustomEvent) {
        this.value = event.detail.value;
        this.displayText = event.detail.displayText;
    }

    render() {
        if (this.hasLoaded) {
            this.updateStyles();
            this.updateFocus();
        }
        return (
            <div class={this.wrapperClasses()}>
                <div class="wcs-select-content" {...this.focusedAttributes()}>
                    <label class="wcs-select-text">{this.hasValue
                        ? this.displayText
                        : this.placeholder
                    }</label>
                    <RightArrow up={this.expanded} />
                </div>
                <div class="wcs-select-options">
                    <slot name="wcs-select-option" />
                </div>
            </div>
        );
    }

    private wrapperClasses() {
        return (this.expanded ? 'expanded ' : '')
            + (this.hasValue ? ' has-value ' : '')
            + (this.disabled ? ' disabled ' : '')
            + 'wcs-select-wrapper';
    }

    private get hasValue(): boolean {
        return this.displayText !== undefined;
    }

    private updateStyles() {
        // Make the options container width the same width as everything.
        this.optionsEl.setAttribute('style', `width: calc(${this.el.getBoundingClientRect().width}px - 2.50rem - 2px);`);
        this.setMarginTopOnNotFirstOption();
    }

    private updateFocus() {
        if (this.focused && !this.expanded) {
            // TODO: try not to set focus if it going to be expanded.
            this.contentEl.focus();
        } else {
            this.contentEl.blur();
        }
    }

    private focusedAttributes() {
        return !this.disabled ? { tabIndex: 0 } : {};
    }

    // XXX: Investigate if there is no way to do it with pure CSS.
    // It poses problem due to slot not allowing deep styling.
    private setMarginTopOnNotFirstOption() {
        this.optionsEl.querySelector('slot')
            .assignedElements()
            .forEach((opt, key) => {
                if (key !== 0) {
                    opt.setAttribute('style', `margin-top: 0.875rem;`);
                }
            });
    }
}

const RightArrow: FunctionalComponent<{ up: boolean }> = ({ up }) => (
    <svg style={{ marginLeft: 'auto' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <style type="text/css">{`
            .arrow-group {
                transform-origin: 50% 50%;
                transition: transform 175ms ease-in-out;
            }
            .up {
                transform: scaleY(1);
            }
            .down {
                transform: scaleY(-1);
            }
        `}</style>
        <g fill="none" class={(up ? 'up' : 'down') + ' arrow-group'} >
            <path class="arrow" fill="black" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </g>
    </svg>
);
