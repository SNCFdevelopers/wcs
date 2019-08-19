import {
    Component,
    Element,
    State,
    Prop,
    Event,
    EventEmitter,
    Listen,
    ComponentInterface,
    Method,
    h
} from '@stencil/core';

import { SelectChangeEventDetail } from './select-interface';
import * as MDCRipple from '@material/ripple';
import { SelectArrow } from './select-arrow';
import { SelectOptionChosedEvent } from '../select-option/select-option-interface';
import { Machine, MachineConfig, interpret, Interpreter, MachineOptions } from 'xstate';

interface SelectStateSchema {
    states: {
        blurred: {};
        closed: {};
        opened: {};
    };
}

type SelectEvent
    = { type: 'OPEN' }
    | { type: 'CLOSE' }
    | { type: 'BLUR' }
    | { type: 'FOCUS' }
    | { type: 'CLICK' }
    | { type: 'OPTION_CLICKED', value: SelectOptionChosedEvent };

interface SelectContext {
    selectedIds: number[];
    isDisabled: boolean;
}

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

    /**
     * Open the component.
     */
    @Method()
    async open() {
        this.stateService.send('OPEN');
    }

    /**
     * Close the component.
     */
    @Method()
    async close() {
        this.stateService.send('OPEN');
    }

    private stateService!: Interpreter<SelectContext, SelectStateSchema, SelectEvent>;

    private optionsEl!: HTMLDivElement;
    private contentEl!: HTMLDivElement;
    private wrapperEl!: HTMLInputElement;

    componentDidLoad() {
        this.optionsEl = this.el.shadowRoot.querySelector('.wcs-select-options');
        this.contentEl = this.el.shadowRoot.querySelector('.wcs-select-content');
        this.wrapperEl = this.el.shadowRoot.querySelector('.wcs-select-wrapper');

        const initialState: SelectContext = { isDisabled: this.disabled, selectedIds: this.value };
        const stateMachine = Machine(
            this.initMachineConfig(),
            this.initMachineOptions(),
            initialState
        );
        this.stateService = interpret(stateMachine);
        this.stateService.onTransition(transition => {
            console.log(transition.value);
        });

        if (this.optionsEl.querySelector('slot') === null) {
            this.el.querySelectorAll('wcs-select-option')
                .forEach(option => {
                    this.el.removeChild(option);
                    this.optionsEl.appendChild(option);
                });
        }

        this.addRippleEffect();
        this.wrapperEl.addEventListener('focus', this.focus);
        this.wrapperEl.addEventListener('blur', this.blur);
        this.hasLoaded = true;
        this.stateService.start();
    }

    private initMachineConfig(): MachineConfig<SelectContext, SelectStateSchema, SelectEvent> {
        return {
            key: 'select',
            initial: 'blurred',
            states: {
                blurred: {
                    entry: ['blur'],
                    on: {
                        CLOSE: 'closed',
                        FOCUS: 'closed',
                        OPEN: 'opened',
                        CLICK: 'opened',
                    }
                },
                closed: {
                    entry: ['close'],
                    on: {
                        CLICK: 'opened',
                        OPEN: 'opened',
                        BLUR: 'blurred',
                    }
                },
                opened: {
                    entry: ['open'],
                    on: {
                        CLICK: 'closed',
                        CLOSE: 'closed',
                        BLUR: 'blurred',
                        OPTION_CLICKED: { actions: ['selectOption'] }
                    },
                },
            }
        };
    }

    private initMachineOptions(): Partial<MachineOptions<SelectContext, SelectEvent>> {
        return {
            actions: {
                open: () => {
                    this.expanded = true;
                    this.focused = true;
                },
                close: () => {
                    this.focused = true;
                    this.expanded = false;
                },
                blur: () => {
                    this.focused = false;
                },
                focus: () => {
                    this.focused = true;
                },
                selectOption: (_, event) => {
                    if (event.type === 'OPTION_CLICKED') {
                        console.log(event.value);
                        this.value = event.value.value;
                        this.displayText = event.value.displayText;
                        this.wcsChange.emit(event.value);
                        console.log('LAUNCH: ', 'select_option_close');
                        this.stateService.send('CLOSE');
                    }
                }
            }
        };
    }

    componentDidUnload() {
        // XXX: to be sure we have no dangling listeners.
        this.wrapperEl.removeEventListener('focus', this.focus);
        this.wrapperEl.addEventListener('blur', this.blur);
        this.stateService.stop();
    }


    private addRippleEffect() {
        // XXX: Unwrapped dependency over MDCRipple...
        const ripple = new MDCRipple.MDCRipple(this.contentEl);
        ripple.unbounded = true;
    }

    private get hasValue(): boolean {
        return this.displayText !== undefined;
    }

    @Listen('mousedown', { target: 'parent' })
    onMouseDown(_event: MouseEvent) {
        console.log('LAUNCH: ', 'parent_mousedown');
        this.stateService.send('CLICK');
    }

    @Listen('click', { target: 'window' })
    onWindowClickEvent(event: MouseEvent) {
        const clickedOnSelectOrChildren = event.target instanceof Node && this.el.contains(event.target);
        // TODO: Move in the state the machine the
        if (this.expanded && !clickedOnSelectOrChildren) {
            console.log('LAUNCH: ', 'window_click');
            this.stateService.send('BLUR');
        }
    }
    @Listen('wcsSelectOptionClick')
    selectedOptionChanged(event: CustomEvent<SelectOptionChosedEvent>) {
        console.log('LAUNCH: ', 'option_clicked');
        this.stateService.send({ type: 'OPTION_CLICKED', value: event.detail });
    }
    private focus = () => this.stateService.send('FOCUS');
    private blur = () => { console.log('LAUNCH: ', 'component_blur'); this.stateService.send('BLUR'); }

    render() {
        if (this.hasLoaded) {
            this.updateStyles();
        }
        return (
            <div class={this.wrapperClasses()} {...this.focusedAttributes()} >
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

    // XXX: Investigate if there is no way to do it with pure CSS.
    // It poses problem due to slot not allowing deep styling.
    private setMarginTopOnNotFirstOption() {
        const slot = this.optionsEl.querySelector('slot');
        let options: Element[] | NodeListOf<HTMLWcsSelectOptionElement>;
        if (slot && slot.assignedElements) {
            options = this.optionsEl.querySelector('slot').assignedElements();
        } else {
            options = this.optionsEl.querySelectorAll('wcs-select-option');
        }
        options.forEach((opt, key) => {
            if (key !== 0) {
                opt.setAttribute('style', `padding-top: 0.875rem;`);
            }
        });
    }

    private wrapperClasses() {
        return (this.expanded ? 'expanded ' : '')
            + (this.hasValue ? ' has-value ' : '')
            + (this.disabled ? ' disabled ' : '')
            + 'wcs-select-wrapper';
    }

    private focusedAttributes() {
        return !this.disabled ? { tabIndex: 0 } : {};
    }
}
