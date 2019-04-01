import { Component, Element, State, Prop, Event, EventEmitter, Listen, ComponentInterface } from '@stencil/core';

import { SelectChangeEventDetail } from './select-interface';
import MDCRipple from '@material/ripple';
import { SelectArrow } from './select-arrow';

/**
 * Select component, use in conjuction with wcs-select-option.
 *
 * @example ```hmtl
 *  <wcs-select>
 *      <wcs-select-option value="1">One</wcs-select-option>
 *  </wcs-select>```
 * @todo Complete keyboard navigation.
 */
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

    /** Reference to the window. */
    @Prop({ context: 'window' }) window!: Window;

    /** Emitted when the value has changed. */
    @Event() wcsChange!: EventEmitter<SelectChangeEventDetail>;

    /** Emitted when the select has focus. */
    @Event() wcsFocus!: EventEmitter<void>;

    /** Emitted when the select loses focus. */
    @Event() wcsBlur!: EventEmitter<void>;

    private optionsEl!: HTMLDivElement;
    private contentEl!: HTMLDivElement;
    private wrapperEl!: HTMLInputElement;

    componentDidLoad() {
        this.optionsEl = this.el.shadowRoot.querySelector('.wcs-select-options');
        this.contentEl = this.el.shadowRoot.querySelector('.wcs-select-content');
        this.wrapperEl = this.el.shadowRoot.querySelector('.wcs-select-wrapper');
        this.expandOnClick();
        this.addRippleEffect();
        this.wrapperEl.addEventListener('focus', this.focus);
        this.wrapperEl.addEventListener('blur', this.blur);
        this.hasLoaded = true;
    }

    componentDidUnload() {
        // XXX: to be sure we have no dangling listeners.
        this.window.removeEventListener('keydown', this.handleExpandedKeyEvents);
        this.wrapperEl.removeEventListener('focus', this.focus);
        this.wrapperEl.addEventListener('blur', this.blur);
    }

    private expandOnClick() {
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
        this.window.addEventListener('keydown', this.handleExpandedKeyEvents);
        // TODO: add focus on options and focus the first.
        this.expanded = true;
    }

    // XXX: We use fat arrow to have a reference to the function and
    // being able to unregister it later on.
    private handleExpandedKeyEvents = (keyEvent: KeyboardEvent) => {
        if (keyEvent.code === 'Escape') {
            this.unExpand();
        } else if (keyEvent.code === 'Tab') {
            this.unExpand();
            // XXX: so we preserve default select behavior, that is:
            // When expanded, pressing tab only unexpand and does not blur
            keyEvent.preventDefault();
        } else if (keyEvent.code === 'ArrowDown') {
            keyEvent.preventDefault();
            console.log('ArrowDown');
            // Select next value
        } else if (keyEvent.code === 'ArrowUp') {
            // Select previous value
            console.log('ArrowUp');
            keyEvent.preventDefault();
        }
    }

    private unExpand() {
        this.expanded = false;
        this.window.removeEventListener('keydown', this.handleExpandedKeyEvents);
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
            this.unExpand();
        }
    }

    @Listen('wcsSelectOptionClick')
    selectedOptionChanged(event: CustomEvent) {
        this.value = event.detail.value;
        this.displayText = event.detail.displayText;
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
        const padding = 1.25; // XXX: This doesn't use the css variable.
        const borderSize = 1;
        this.optionsEl.setAttribute(
            'style',
            `width: calc(${Math.ceil(this.el.getBoundingClientRect().width)}px - ${2 * padding}rem - ${2 * borderSize}px);`
        );
        this.setMarginTopOnNotFirstOption();
    }

    private focus = () => {
        this.wrapperEl.focus();
        this.wcsFocus.emit();
        this.wrapperEl.addEventListener('keydown', this.handleFocusedKeyEvents);
        console.log('Select focused');
    }

    private handleFocusedKeyEvents = (keyEvent: KeyboardEvent) => {
        if (keyEvent.code === 'Escape') {
            this.blur();
        } else if (keyEvent.code === 'Space') {
            this.expand();
            // Focus on selected or first value.
            // XXX: so the page doesn't scroll down.
            keyEvent.preventDefault();
            this.wrapperEl.removeEventListener('keydown', this.handleFocusedKeyEvents);
        }
    }

    private blur = () => {
        this.wrapperEl.blur();
        this.wcsBlur.emit();
        this.wrapperEl.removeEventListener('keydown', this.handleFocusedKeyEvents);
        console.log('Select blured');
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

    render() {
        if (this.hasLoaded) {
            this.updateStyles();
        }
        return (
            <div class={this.wrapperClasses()} {...this.focusedAttributes()}>
                <div class="wcs-select-content">
                    <label class="wcs-select-text">{this.hasValue
                        ? this.displayText
                        : this.placeholder
                    }</label>
                    <SelectArrow up={this.expanded} />
                </div>
                <div class="wcs-select-options">
                    <slot name="wcs-select-option" />
                </div>
            </div>
        );
    }
}

