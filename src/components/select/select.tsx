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

import { interpret, Interpreter, Machine, MachineConfig, MachineOptions } from 'xstate';
import { isWcsSelectSize, SelectChangeEventDetail, WcsSelectSize, WcsSelectSizeValue } from './select-interface';
import { SelectArrow } from './select-arrow';
import { SelectOptionChosedEvent, SelectOptionValue } from '../select-option/select-option-interface';
import {
    isDownArrowKey,
    isElement,
    isEnterKey,
    isEscapeKey,
    isHomeKey,
    isLeftArrowKey,
    isPageDownKey,
    isPageUpKey,
    isRightArrowKey,
    isTabKey,
    isUpArrowKey,
    generateUniqueId,
    findItemLabel,
    isSpaceKey,
} from '../../utils/helpers';
import { SelectChips } from './select-chips';
import { MDCRipple } from '@material/ripple';
import { createPopper, Instance } from '@popperjs/core';
import { isEqual } from 'lodash-es';

interface SelectStateSchema {
    states: {
        closed: {};
        opened: {};
    };
}

type SelectEvent
    = { type: 'OPEN' }
    | { type: 'CLOSE', value: { shouldBlur?: boolean } }
    | { type: 'CLICK' }
    | { type: 'OPTION_SELECTED', value: SelectOptionChosedEvent };

const SELECT_MACHINE_CONFIG: MachineConfig<any, SelectStateSchema, SelectEvent> = {
    key: 'select',
    initial: 'closed',
    states: {
        closed: {
            entry: ['close'],
            on: {
                CLICK: 'opened',
                OPEN: 'opened',
                OPTION_SELECTED: {actions: ['selectOption']}
            },
        },
        opened: {
            entry: ['open'],
            on: {
                CLICK: 'closed',
                CLOSE: 'closed',
                OPTION_SELECTED: {actions: ['selectOption']}
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
 */
@Component({
    tag: 'wcs-select',
    styleUrl: 'select.scss',
    shadow: true
})
export class Select implements ComponentInterface {
    private stateService!: Interpreter<any, SelectStateSchema, SelectEvent>;

    private selectId = `wcs-select-${selectIds++}`;
    private labelElement: HTMLWcsLabelElement;
    private optionsEl!: HTMLDivElement;
    private optionsId = generateUniqueId("OPTIONS");
    private controlEl!: HTMLDivElement;

    // Only used for multiples.
    private values: SelectOptionValue[];

    /**
     * This attribute mutate when a new option is selected
     * @private
     */
    private lastModifiedOptionElement: HTMLWcsSelectOptionElement | null;
    /**
     * It serves for accessibility feature: keyboard navigation. It serves to focus the option if defined when the select
     * is opened based on which key pressed.
     * 
     * When the select is <b>opened</b> user can navigate through options with keyboard:
     * 
     * - Arrow right | down: `lastFocusedOptionElement` equals to the next option of `lastFocusedOptionElement` or
     * the first if `lastFocusedOptionElement` is not defined
     * - Arrow left | top: `lastFocusedOptionElement` equals to the previous enabled option of `lastFocusedOptionElement`
     * or the first if `lastFocusedOptionElement` is not defined
     * - Page up: `lastFocusedOptionElement` equals to the first enabled option
     * - Page down: `lastFocusedOptionElement` equals to the last enabled option
     * @private
     */
    private lastFocusedOptionElement: HTMLWcsSelectOptionElement | null;

    @Element() private el!: HTMLWcsSelectElement;

    /** Wether the select is expanded */
    @State()
    private expanded = false;

    /**
     * Specify the size (height) of the select.
     */
    @Prop({reflect: true}) size: WcsSelectSize = 'm';

    /** Wether the component is fully loaded in the DOM. */
    @State()
    // @ts-ignore
    private hasLoaded = false;

    /** Text to display for the selected option, when no option is selected, the value is undefined. */
    @State()
    private displayText: string;

    /** When the host is focused. */
    @State()
    // @ts-ignore
    private focused: boolean;

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
    compareWith?: (optionValue: any, selectedValue: any) => boolean = (optionValue, selectedValue) => isEqual(optionValue, selectedValue);

    private popper: Instance;

    @State() private overlayDirection: 'bottom' | 'top' = 'bottom';

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

        // if the select is inside a wcs-form-field, we set an id to the wcs-label if present
        // the wcs-label element reference is kept to compute aria-label value during the rendering
        this.labelElement = findItemLabel(this.el);
        if (this.labelElement) {
            this.labelElement.id = this.selectId + "-lbl";
        }

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

    componentWillLoad(): Promise<void> | void {
        if (!isWcsSelectSize(this.size)) {
            console.error(`Invalid size value for wcs-select : "${this.size}". Must be one of "${WcsSelectSizeValue.join(', ')}"`);
            this.size = "m"; // Default fallback value
        }
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

    private get notDisabledOptions(): HTMLWcsSelectOptionElement[] {
        const opts = this.el?.querySelectorAll('wcs-select-option:not([disabled])');
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
                        this.focused = false;
                        if(this.notDisabledOptions.length > 0) {
                            this.lastFocusedOptionElement = this.lastModifiedOptionElement ?? this.notDisabledOptions[0];
                            requestAnimationFrame(() => {
                                this.lastFocusedOptionElement?.focus();
                            });
                        }
                    }
                },
                close: (_, event: SelectEvent) => {
                    if (event.type === 'CLOSE') {
                        if (event.value?.shouldBlur) {
                            this.el.closest("wcs-select")?.focus();
                            this.focused = false;
                        } else {
                            this.el.focus();
                            this.focused = true
                        }
                    }
                    this.expanded = false;
                },
                selectOption: (_, event) => {
                    if (event.type === 'OPTION_SELECTED') {
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
            this.lastModifiedOptionElement = event.source;
        } else {
            event.source.selected = false;
            this.values.splice(index, 1);
            if (this.lastModifiedOptionElement === event.source) this.lastModifiedOptionElement = null;
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
        this.lastModifiedOptionElement = event.source;
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
        const firstSelectInEventPath = event.composedPath().filter(x => (x as HTMLElement).nodeName === 'WCS-SELECT')[0];
        const clickOnCurrentSelect = firstSelectInEventPath === this.el;
        // TODO: Move this logic in the state machine
        // FIXME: Doesnt work with single + disabled option
        if (this.expanded && !clickOnCurrentSelect) {
            this.stateService.send('CLOSE');
        }
    }

    @Listen('keydown')
    onKeyDown(_event: KeyboardEvent) {
        // close
        if (this.stateService.getSnapshot().matches("closed")) {
            if (isEnterKey(_event) || (_event.altKey && isDownArrowKey(_event)) || isSpaceKey(_event)) {
                _event.preventDefault();
                _event.stopPropagation();
                this.stateService.send('OPEN');
                return;
            }
            if (this.multiple) {
                if (isDownArrowKey(_event)) {
                    this.stateService.send('OPEN');
                }
            } else {
                if (isDownArrowKey(_event) || isRightArrowKey(_event)) {
                    _event.preventDefault();
                    this.selectClosestOption("next");
                }
                if (isUpArrowKey(_event) || isLeftArrowKey(_event)) {
                    _event.preventDefault();
                    this.selectClosestOption("previous");
                } else if (isPageDownKey(_event)) {
                    _event.preventDefault();
                    this.selectLastOption();
                } else if (isPageUpKey(_event) || isHomeKey(_event)) {
                    _event.preventDefault();
                    this.selectFirstOption();
                }
            }
        }
        // open
        else if (this.stateService.getSnapshot().matches("opened")) {
            if (isEscapeKey(_event) || (_event.altKey && isUpArrowKey(_event))) {
                this.stateService.send({type: "CLOSE", value: {shouldBlur: false}});
            } else if (isTabKey(_event) || (_event.shiftKey && isTabKey(_event))) {
                this.stateService.send({type: "CLOSE", value: {shouldBlur: true}});
            } else if (isDownArrowKey(_event)) {
                _event.preventDefault();
                this.focusClosestOption("next");
            } else if (isUpArrowKey(_event)) {
                _event.preventDefault();
                this.focusClosestOption("previous");
            } else if (isPageUpKey(_event) || isHomeKey(_event)) {
                _event.preventDefault();
                this.focusFirstOption();
            } else if (isPageDownKey(_event)) {
                _event.preventDefault();
                this.focusLastOption();
            }
        }
    }

    private getClosestActiveOptionIndexForState(direction: 'next' | 'previous', state: 'focused' | 'selected'): number | 'nothing' {
        let currentIndex = Array.from(this.notDisabledOptions).indexOf(state === 'focused' ? this.lastFocusedOptionElement : this.lastModifiedOptionElement);

        if (direction === 'next' && currentIndex < this.notDisabledOptions.length - 1) {
            currentIndex++;
        } else if (direction === 'previous' && currentIndex > 0) {
            currentIndex--;
        } else {
            return 'nothing';
        }
        return currentIndex;
    }

    /**
     * Selects the non-disabled option with the index passed as a parameter. 
     * The method sends an event to the state machine (the same as when clicking on an option with the mouse)
     * @param indexToSelect Option index within non-deactivated options list
     * @private
     */
    private selectOption(indexToSelect: number) {
        const optionToSelect = this.notDisabledOptions[indexToSelect];
        
        if(!optionToSelect) return;
        
        this.sendOptionSelectedToStateMachine({
            source: optionToSelect,
            value: optionToSelect.value,
            displayText: optionToSelect.innerText
        });
    }

    private selectClosestOption(direction: 'next' | 'previous'): void {
        const indexToSelect = this.getClosestActiveOptionIndexForState(direction, 'selected');
        if(indexToSelect === 'nothing') return;
        this.selectOption(indexToSelect);
    }

    private selectFirstOption() {
        if(this.notDisabledOptions.length < 1) {
            return;
        }

        this.selectOption(0);
    }

    private selectLastOption() {
        if(this.notDisabledOptions.length < 1) {
            return;
        }

        this.selectOption(this.notDisabledOptions.length - 1);
    }

    private focusOption(indexToFocus: number) {
        this.lastFocusedOptionElement = this.notDisabledOptions[indexToFocus];
        this.lastFocusedOptionElement?.focus();
        this.el.setAttribute("aria-activedescendant", this.lastFocusedOptionElement.id);
    }

    private focusClosestOption(direction: 'next' | 'previous'): void {
        const indexToFocus = this.getClosestActiveOptionIndexForState(direction, 'focused');
        if(indexToFocus === 'nothing') return;

        this.focusOption(indexToFocus);
    }

    private focusFirstOption() {
        this.focusOption(0);
    }

    private focusLastOption() {
        this.focusOption(this.notDisabledOptions.length - 1);
    }

    @Listen('wcsSelectOptionClick')
    selectedOptionChanged(event: CustomEvent<SelectOptionChosedEvent>) {
        this.sendOptionSelectedToStateMachine(event.detail);
    }

    sendOptionSelectedToStateMachine(event: SelectOptionChosedEvent) {
        this.stateService.send({type: 'OPTION_SELECTED', value: event});
    }

    onSlotchange() {
        this.updateSelectedValue(this.value);
    }

    removeChip(v: SelectOptionValue) {
        this.options
            .forEach(opt => {
                if (opt.value === v.value) {
                    this.sendOptionSelectedToStateMachine({
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
        const ariaLabelValue = `${this.labelElement ? this.labelElement.innerText : ''} ${this.hasValue ? this.displayText : ''}`.trimEnd();
        return (
            <Host class={this.expanded ? 'expanded ' : ''}
                  overlayDirection={this.overlayDirection} {...this.focusedAttributes()}
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-disabled={this.disabled ? 'true' : null}
                  aria-expanded={this.expanded ? 'true' : 'false'}
                  aria-controls={this.optionsId}
                  aria-owns={this.optionsId}
                  aria-multiselectable={this.multiple ? 'true' : 'false'}
                  aria-label={ariaLabelValue}>
                <div class="wcs-select-control">
                    <div class="wcs-select-value-container">
                    {this.hasValue
                        ?
                        (this.chips ?
                            this.values.map((option: SelectOptionValue) =>
                                    <SelectChips disabled={this.disabled} option={option}
                                                  onRemove={this.removeChip.bind(this)}/>
                            )
                            : <label class="wcs-select-value">{this.displayText}</label>)
                        : <label class="wcs-select-placeholder">{this.placeholder}</label>
                    }
                    </div>
                    <SelectArrow up={this.expanded}/>
                </div>
                <div class="wcs-select-options" id={this.optionsId} role="listbox">
                    <slot name="wcs-select-option" onSlotchange={this.onSlotchange.bind(this)}/>
                </div>
            </Host>
        );
    }

    private focusedAttributes() {
        return !this.disabled ? {tabIndex: 0} : {};
    }
}

let selectIds = 0;
