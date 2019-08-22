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
    h,
    Host
} from '@stencil/core';

import { SelectChangeEventDetail } from './select-interface';
import * as MDCRipple from '@material/ripple';
import { SelectArrow } from './select-arrow';
import { SelectOptionChosedEvent, SelectOptionValue } from '../select-option/select-option-interface';
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

    /** The currently selected value. */
    @Prop({ mutable: true, reflect: true })
    value?: any | null;

    /** The text to display when the select is empty. */
    @Prop({ mutable: true, reflect: true })
    placeholder?: string | null;

    /** If `true`, the user cannot interact with the select. */
    @Prop({ mutable: true }) disabled = false;

    /** If `true`, the user can select multiple values at once. */
    @Prop({ reflect: true }) multiple = false;

    /** The name of the control, which is submitted with the form data. */
    @Prop() name?: string;

    // FIXME: This seems to be deprecated.
    /** Reference to the window. */
    @Prop({ context: 'window' }) window!: Window;

    /** Emitted when the value has changed. */
    @Event() wcsChange!: EventEmitter<SelectChangeEventDetail>;

    /** Emitted when the select has focus. */
    @Event() wcsFocus!: EventEmitter<void>;

    /** Emitted when the select loses focus. */
    @Event() wcsBlur!: EventEmitter<void>;

    /** Open the component. */
    @Method()
    async open() {
        this.stateService.send('OPEN');
    }

    /** Close the component. */
    @Method()
    async close() {
        this.stateService.send('CLOSE');
    }

    private stateService!: Interpreter<any, SelectStateSchema, SelectEvent>;

    private optionsEl!: HTMLDivElement;
    private contentEl!: HTMLDivElement;

    // Only used for multiples.
    private values: SelectOptionValue[];

    componentDidLoad() {
        this.optionsEl = this.el.shadowRoot.querySelector('.wcs-select-options');
        this.contentEl = this.el.shadowRoot.querySelector('.wcs-select-content');

        const stateMachine = Machine(
            this.initMachineConfig(),
            this.initMachineOptions()
        );
        this.stateService = interpret(stateMachine);

        if (this.multiple) {
            this.values = [];
            this.options
                .forEach((opt: HTMLWcsSelectOptionElement) => opt.multiple = true);
        }

        this.addRippleEffect();
        // TODO: is this still usefull for anything ?
        this.hasLoaded = true;
        this.stateService.start();
    }

    private get options() {
        const opts = this.optionsEl.querySelectorAll('wcs-select-option');
        return opts.length !== 0
            ? opts
            : this.optionsEl.querySelector('slot').assignedElements();
    }

    private initMachineConfig(): MachineConfig<any, SelectStateSchema, SelectEvent> {
        return {
            key: 'select',
            initial: 'blurred',
            states: {
                blurred: {
                    entry: ['blur'],
                    on: {
                        CLOSE: { target: 'closed', cond: 'enabled' },
                        FOCUS: { target: 'closed', cond: 'enabled' },
                        OPEN: { target: 'opened', cond: 'enabled' },
                        CLICK: { target: 'opened', cond: 'enabled' },
                    }
                },
                closed: {
                    entry: ['close'],
                    on: {
                        CLICK: 'opened',
                        OPEN: 'opened',
                        BLUR: 'blurred',
                    },
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

    private initMachineOptions(): Partial<MachineOptions<any, SelectEvent>> {
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
                    this.expanded = false;
                },
                focus: () => {
                    this.focused = true;
                },
                selectOption: (_, event) => {
                    if (event.type === 'OPTION_CLICKED') {
                        this.handleClickEvent(event.value);
                    }
                }
            },
            guards: {
                enabled: () => !this.disabled
            }
        };
    }

    private handleClickEvent(event: SelectOptionChosedEvent) {
        if (this.multiple) {
            this.handleClickOnMultiple(event);
        } else {
            this.handleNormalClick(event);
        }
        this.wcsChange.emit({
            value: this.value
        });
    }

    private handleClickOnMultiple(event: SelectOptionChosedEvent) {
        const index = this.values.findIndex(v => v.value === event.value);
        if (index === -1) {
            const { value, displayText } = event;
            this.values.push({ value, displayText });
            event.source.selected = true;
        } else {
            event.source.selected = false;
            this.values.splice(index, 1);
        }
        // TODO: Let user provide sorting function and use this if defined.
        // this.values = this.values.sort((a, b) => a.value - b.value);
        this.value = `[${this.values.map(v => v.value).join(', ')}]`;
        this.displayText = this.values.length !== 0
            ? this.values.map(v => v.displayText).join(', ')
            : undefined;
    }

    private handleNormalClick(event: SelectOptionChosedEvent) {
        // Reset other options to false if they were selected.
        this.options
            .forEach(option => {
                if (option.selected) option.selected = false;
            });

        event.source.selected = true;
        this.value = event.value;
        this.displayText = event.displayText;
        this.stateService.send('CLOSE');
    }

    componentDidUnload() {
        this.stateService.stop();
    }

    private addRippleEffect() {
        // TODO: wrap MDCRipple dependency so we can eventually write our own or at least decouple a bit.
        const ripple = new MDCRipple.MDCRipple(this.contentEl);
        ripple.unbounded = true;
    }

    private get hasValue(): boolean {
        // TODO: change this behavior.
        return this.displayText !== undefined;
    }

    @Listen('mousedown')
    onMouseDown(_event: MouseEvent) {
        this.stateService.send('CLICK');
    }

    @Listen('click', { target: 'window' })
    onWindowClickEvent(event: MouseEvent) {
        const clickedOnSelectOrChildren = event.target instanceof Node && this.el.contains(event.target);
        // TODO: Move this logic in the state machine
        if (this.expanded && !clickedOnSelectOrChildren) {
            this.stateService.send('BLUR');
        }
    }
    @Listen('wcsSelectOptionClick')
    selectedOptionChanged(event: CustomEvent<SelectOptionChosedEvent>) {
        this.stateService.send({ type: 'OPTION_CLICKED', value: event.detail });
    }
    @Listen('focus')
    focus() { this.stateService.send('FOCUS'); }
    @Listen('blur')
    blur() { this.stateService.send('BLUR'); }

    render() {
        if (this.hasLoaded) {
            this.updateStyles();
        }
        return (
            <Host class={this.expanded ? 'expanded ' : ''} {...this.focusedAttributes()}>
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
            </Host>
        );
    }

    private updateStyles() {
        // Make the options container width the same width as everything.
        const borderSize = 1;
        // TODO: Consider using a mutation observer to rerender the size each time ?
        // Be cautious as it may cause infinite loop with render ?
        this.optionsEl.setAttribute(
            'style',
            `width: calc(${Math.ceil(this.el.getBoundingClientRect().width)}px - ${2 * borderSize}px);`
        );
    }

    private focusedAttributes() {
        return !this.disabled ? { tabIndex: 0 } : {};
    }
}
