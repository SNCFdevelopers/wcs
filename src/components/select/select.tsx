import {
    Component,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Listen,
    Method,
    Prop,
    State,
    Watch
} from '@stencil/core';

import _ from 'lodash';
import { interpret, Interpreter, Machine, MachineConfig, MachineOptions } from 'xstate';

import { SelectChangeEventDetail } from './select-interface';
import { SelectArrow } from './select-arrow';
import { SelectOptionChosedEvent, SelectOptionValue } from '../select-option/select-option-interface';
import { isElement } from '../../utils/helpers';
import { SelectChips } from './select-chips';
import { MDCRipple } from '@material/ripple';
import { createPopper, Instance } from '@popperjs/core';

interface SelectStateSchema {
    states: {
        closed: {};
        opened: {};
    };
}

type SelectEvent
    = { type: 'OPEN' }
    | { type: 'CLOSE' }
    | { type: 'CLICK' }
    | { type: 'OPTION_CLICKED', value: SelectOptionChosedEvent };

const SELECT_MACHINE_CONFIG: MachineConfig<any, SelectStateSchema, SelectEvent> = {
    key: 'select',
    initial: 'closed',
    states: {
        closed: {
            entry: ['close'],
            on: {
                CLICK: 'opened',
                OPEN: 'opened',
                OPTION_CLICKED: {actions: ['selectOption']}
            },
        },
        opened: {
            entry: ['open'],
            on: {
                CLICK: 'closed',
                CLOSE: 'closed',
                OPTION_CLICKED: {actions: ['selectOption']}
            },
        },
    }
};

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
    private stateService!: Interpreter<any, SelectStateSchema, SelectEvent>;

    private optionsEl!: HTMLDivElement;
    private controlEl!: HTMLDivElement;

    // Only used for multiples.
    private values: SelectOptionValue[];

    @Element() el!: HTMLWcsSelectElement;

    /** Wether the select is expanded */
    @State()
    expanded = false;

    /** Wether the component is fully loaded in the DOM. */
    @State()
    hasLoaded = false;

    /** Text to display for the selected option, when no option is selected, the value is undefined. */
    @State()
    displayText: string;

    /** When the host is focused. */
    @State()
    focused: boolean;

    /** The currently selected value. */
    @Prop({mutable: true})
    value?: any | null;

    /** The text to display when the select is empty. */
    @Prop({mutable: true, reflect: true})
    placeholder?: string | null;

    /** If `true`, the user cannot interact with the select. */
    @Prop({mutable: true})
    disabled = false;

    /** If `true`, the user can select multiple values at once. */
    @Prop({reflect: true})
    multiple = false;

    /** If `true`, selected items are shown in chips mode. */
    @Prop({reflect: true})
    chips = false;

    /** The name of the control, which is submitted with the form data. */
    @Prop()
    name?: string;

    /** Function used to compare options, default : deep comparison. */
    @Prop()
    compareWith?: (optionValue: any, selectedValue: any) => boolean = (optionValue, selectedValue) => _.isEqual(optionValue, selectedValue);

    private popper: Instance;

    @State() overlayDirection: 'bottom' | 'top' = 'bottom';

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

    @Watch('value')
    onValueChangeHandler(newValue: any) {
        this.updateSelectedValue(newValue);
        this.emitChange(this.value);
    }

    private updateSelectedValue(value: any) {
        // If no value is passed, the select is reset.
        if (!value) {
            this.reset();
        }
        if (this.multiple) {
            // If user don't give an array, we provide one
            if (!Array.isArray(value)) {
                value = [value];
            }
            this.values = [];

            this.options.forEach((opt: HTMLWcsSelectOptionElement) => {
                const isSelected = value ?
                    value.findIndex(v => this.compareWith(opt.value, v)) !== -1
                    : false;
                if (isSelected) {
                    this.values.push({
                        value: opt.value,
                        displayText: opt.innerText,
                        chipColor: opt.chipColor,
                        chipBackgroundColor: opt.chipBackgroundColor
                    });
                }
                opt.selected = isSelected;
            });
            // update select placeholder text
            this.displayText = this.values.length !== 0
                ? this.values.map(v => v.displayText).join(', ')
                : undefined;
        } else {
            this.options.forEach((opt: HTMLWcsSelectOptionElement) => {
                const isSelected = this.compareWith(opt.value, value);
                if (isSelected) {
                    this.displayText = opt.innerText;
                }
                opt.selected = isSelected;
            });
        }
    }

    /**
     * Reset the select: unselects all options for multiple mode and displays the placeholder
     * @private
     */
    private reset() {
        this.values = [];
        this.displayText = undefined;
        this.options.forEach((opt: HTMLWcsSelectOptionElement) => {
            opt.selected = false;
        });
    }

    componentDidLoad() {
        this.optionsEl = this.el.shadowRoot.querySelector('.wcs-select-options');
        this.controlEl = this.el.shadowRoot.querySelector('.wcs-select-control');

        const stateMachine = Machine(
            SELECT_MACHINE_CONFIG,
            this.initMachineOptions()
        );
        // FIXME: type checking failed...
        // @ts-ignore
        this.stateService = interpret(stateMachine);

        if (this.multiple) {
            this.values = [];
        }

        this.addRippleEffect();
        this.stateService.start();
        if (this.optionsEl.querySelector('slot') === null) {
            this.replaceOptions_firefoxBefore63();
            this.listenDomUpdate_firefoxBefore63();
        }

        if (this.value !== undefined) {
            this.updateSelectedValue(this.value);
        }

        this.popper = this.createPopperInstance();

        // TODO: is this still usefull for anything ?
        this.hasLoaded = true;
    }

    private createPopperInstance() {
        return createPopper(this.controlEl, this.optionsEl, {
            placement: "bottom",
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 4] // we want 4px between select control and select options
                    }
                }
            ]
        });
    }

    private emitChange(newValue: any): void {
        this.wcsChange.emit({
            value: newValue
        });
    }

    private replaceOptions_firefoxBefore63() {
        Array.from(this.el.querySelectorAll('wcs-select-option'))
            .forEach(option => {
                if (option.parentNode === this.el) {
                    this.el.removeChild(option);
                    this.optionsEl.appendChild(option);
                }
            });
    }

    private listenDomUpdate_firefoxBefore63() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    this.replaceOptions_firefoxBefore63();
                }
            }
        });
        observer.observe(this.el, {childList: true});
    }

    componentWillUpdate() {
        if (this.multiple) {
            this.options
                .forEach((opt: HTMLWcsSelectOptionElement) => opt.multiple = true);
        }
    }

    private get options(): HTMLWcsSelectOptionElement[] {
        const opts = this.el?.querySelectorAll('wcs-select-option');
        if (opts && opts.length !== 0) {
            return opts as any as HTMLWcsSelectOptionElement[];
        }
        return [];
    }

    private initMachineOptions(): Partial<MachineOptions<any, SelectEvent>> {
        return {
            actions: {
                open: () => {
                    if (!this.disabled) {
                        this.expanded = true;
                        this.focused = true;
                    }
                },
                close: () => {
                    this.focused = true;
                    this.expanded = false;
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
    }

    private handleClickOnMultiple(event: SelectOptionChosedEvent) {
        const index = this.values.findIndex(v => v.value === event.value);
        if (index === -1) {
            const {value, displayText, chipColor, chipBackgroundColor} = event;
            this.values.push({value, displayText, chipColor, chipBackgroundColor});
            event.source.selected = true;
        } else {
            event.source.selected = false;
            this.values.splice(index, 1);
        }
        this.updateValueWithValues();
    }

    private updateValueWithValues() {
        this.value = this.values.map(v => v.value);
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

    disconnectedCallback() {
        this.stateService?.stop();
    }

    private addRippleEffect() {
        // TODO: wrap MDCRipple dependency so we can eventually write our own or at least decouple a bit.
        const ripple = new MDCRipple(this.controlEl);
        ripple.unbounded = false;
    }

    private get hasValue(): boolean {
        // TODO: change this behavior.
        return this.displayText !== undefined;
    }

    @Listen('mousedown')
    onMouseDown(event: MouseEvent) {
        const clickOnScroll = isElement(event.target)
            && (event.offsetX > event.target.clientWidth
                || event.offsetY > event.target.clientHeight // If the click il located bellow the component height the click happen in the overlay
                || event.offsetY < 0); // If the click is made above the component

        const clickOnRemoveChip = event.composedPath()
            .filter(x => {
                const el = (x as HTMLElement);
                return el.nodeName === 'svg' && el.classList.contains('chip');
            })
            .length > 0;

        if (!clickOnScroll && !clickOnRemoveChip) {
            this.stateService.send('CLICK');
        }
    }

    @Listen('click', {target: 'window'})
    onWindowClickEvent(event: MouseEvent) {
        // TODO: Move this logic in the state machine
        // FIXME: Doesnt work with single + disabled option
        if (this.expanded && !this.el.contains(event.target as Node)) {
            this.stateService.send('CLOSE');
        }
    }

    @Listen('wcsSelectOptionClick')
    selectedOptionChanged(event: CustomEvent<SelectOptionChosedEvent>) {
        this.sendOptionClickedToStateMachine(event.detail);
    }

    sendOptionClickedToStateMachine(event: SelectOptionChosedEvent) {
        this.stateService.send({type: 'OPTION_CLICKED', value: event});
    }

    onSlotchange() {
        this.updateSelectedValue(this.value);
    }

    removeChip(v: SelectOptionValue) {
        this.options
            .forEach(opt => {
                if (opt.value === v.value) {
                    this.sendOptionClickedToStateMachine({
                        ...v,
                        source: opt
                    });
                }
            });
    }

    componentDidRender() {
        this.popper?.update();
    }

    render() {
        return (
            <Host class={this.expanded ? 'expanded ' : ''}
                  overlayDirection={this.overlayDirection} {...this.focusedAttributes()}>
                <div class="wcs-select-control">
                    {this.hasValue
                        ? (this.chips ?
                            this.values.map((option: SelectOptionValue) =>
                                <SelectChips disabled={this.disabled} option={option}
                                             onRemove={this.removeChip.bind(this)}/>
                            )
                            : <label class="wcs-select-value">{this.displayText}</label>)
                        : <label class="wcs-select-placeholder">{this.placeholder}</label>
                    }
                    <SelectArrow up={this.expanded}/>
                </div>
                <div class="wcs-select-options">
                    <slot name="wcs-select-option" onSlotchange={this.onSlotchange.bind(this)}/>
                </div>
            </Host>
        );
    }

    private focusedAttributes() {
        return !this.disabled ? {tabIndex: 0} : {};
    }
}
