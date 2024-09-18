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
import {
    isWcsSelectSize,
    SelectChangeEventDetail,
    SelectFilterChangeEventDetail,
    WcsDefaultSelectFilterFn,
    WcsSelectFilterFn,
    WcsSelectSize,
    WcsSelectSizeValue
} from './select-interface';
import { SelectArrow } from './select-arrow';
import { SelectOptionChosedEvent, SelectOptionValue } from '../select-option/select-option-interface';
import {
    isElement,
    generateUniqueId,
    findItemLabel,
    inheritAriaAttributes,
    inheritAttributes, setOrRemoveAttribute
} from '../../utils/helpers';
import { SelectChips } from './select-chips';
import { MDCRipple } from '@material/ripple';
import { createPopper, Instance } from '@popperjs/core';
import { isEqual } from 'lodash-es';
import { getActionForKeyboardEvent, KeyboardEventAssociatedAction } from './select-keyboard-event';
import { isFocusable } from '../../utils/accessibility';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

interface SelectStateSchema {
    states: {
        closed: {};
        opened: {};
    };
}

type SelectEvent
    = { type: 'OPEN' }
    | { type: 'CLOSE', value: { shouldBlur?: boolean, fromKeyboard: boolean } }
    | { type: 'CLICK' }
    | { type: 'OPTION_SELECTED', value: { option: SelectOptionChosedEvent, fromKeyboard: boolean } };

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

const SELECT_INHERITED_ATTRS = ['tabindex', 'title'];

/**
 * The select component (also named combobox) is a form component that allows users to select one or more options
 * from a list.
 * Use it with several slotted `wcs-select-option` inside.
 *
 * @slot filter-no-result Contains the customizable "No result found" div (autocomplete mode only).
 */
@Component({
    tag: 'wcs-select',
    styleUrl: 'select.scss',
    shadow: true
})
export class Select implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLWcsSelectElement;
    private inheritedAttributes: { [k: string]: any } = {};
    
    private stateService!: Interpreter<any, SelectStateSchema, SelectEvent>;

    private selectId = `wcs-select-${selectIds++}`;
    private labelElement: HTMLWcsLabelElement;
    private optionsEl!: HTMLDivElement;
    private optionsId = generateUniqueId("OPTIONS");
    private controlEl!: HTMLDivElement;

    // Only used for multiples.
    private values: SelectOptionValue[];

    /**
     * This attribute mutate when a new option is selected OR unselected
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

    // Only used for autocomplete.
    private lastHighlightedOptionElement: HTMLWcsSelectOptionElement | null;
    private autocompleteInput: HTMLInputElement;

    /** Wether the select is expanded */
    @State()
    private expanded = false;

    /**
     * Specify the size (height) of the select.
     */
    @Prop({reflect: true}) size: WcsSelectSize = 'm';

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

    /** If `true`, the select acts as an autocomplete field to filter your results. */
    @Prop({reflect: true})
    autocomplete = false;

    /**
     * **Only works with `autocomplete` mode.**  
     * If `true`, the server mode disables the client-side filtering on your select and allows you to handle
     * which options should be present in your DOM.
     */
    @Prop({reflect: true})
    serverMode = false;

    /**
     * **Only works with `autocomplete` mode.**  
     * Customizable sort function to change the comparison of values. If not provided, uses the default behavior :
     * `option.textContent.toLowerCase().startsWith(filter.toLowerCase())`
     */
    @Prop({attribute: null}) filterFn: WcsSelectFilterFn;

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

    /**
     * Boolean to toggle the text "No result found" (only for autocomplete with filter)
     * @private
     */
    @State() private showNoResultFoundLabel = false;

    /**
     * Value of the autocomplete input field
     * @private
     */
    @State() private autocompleteValue = undefined;

    @State() private overlayDirection: 'bottom' | 'top' = 'bottom';

    /** Emitted when the value has changed. */
    @Event() wcsChange!: EventEmitter<SelectChangeEventDetail>;

    /** Emitted when the select has focus. */
    @Event() wcsFocus!: EventEmitter<FocusEvent>;

    /** Emitted when the select loses focus. */
    @Event() wcsBlur!: EventEmitter<FocusEvent>;

    /** Emitted when the autocomplete filter has changed. */
    @Event() wcsFilterChange!: EventEmitter<SelectFilterChangeEventDetail>;

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
                    if (this.autocomplete) {
                        this.autocompleteValue = opt.innerText;
                    }
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
    
    componentWillRender(): Promise<void> | void {
        if (this.multiple) {
            this.options
              .forEach((opt: HTMLWcsSelectOptionElement) => opt.multiple = true);
        }
    }

    componentWillLoad(): Promise<void> | void {
        if (!isWcsSelectSize(this.size)) {
            console.warn(`Invalid size value for wcs-select : "${this.size}". Must be one of "${WcsSelectSizeValue.join(', ')}"`);
            this.size = "m"; // Default fallback value
        }
        
        // XXX : special case on this component for attribute inheritance
        // We only move attributes on the native input when autocomplete is true.
        // Otherwise, all attributes are on the Host, so we do not need to inherit those.
        if (this.autocomplete) {
            this.inheritedAttributes = {
                ...inheritAriaAttributes(this.el),
                ...inheritAttributes(this.el, SELECT_INHERITED_ATTRS),
            };
        }
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        if(this.autocomplete === false) {
            setOrRemoveAttribute(this.el, attr, value);
        } else {
            setOrRemoveAttribute(this.autocompleteInput, attr, value);
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
        const opts = this.el?.querySelectorAll('wcs-select-option:not([disabled]):not([aria-hidden])');
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
                        if(this.multiple === false && this.autocomplete && this.hasValue === false) {
                            // If we open the select in single autocomplete mode, we update the autocomplete value at 
                            // the blur event so that the displayed value reflect the current select value. 
                            // Indeed, we have to tell the component to take the current filter state manually at the 
                            // opening (because the input event of the autocomplete field is not fired at this point).
                            if (this.autocompleteValue && this.autocompleteValue !== '') {
                                this.handleAutocompleteValueChange(this.autocompleteValue);
                            }
                        }
                        this.clearHighlightOnLastHighlightedOption();
                        if (this.notDisabledOptions.length > 0) {
                            this.lastFocusedOptionElement = this.lastModifiedOptionElement ?? this.notDisabledOptions[0];
                            requestAnimationFrame(() => {
                                this.autocomplete
                                    ? this.autocompleteInput?.focus()
                                    : this.lastFocusedOptionElement?.focus();
                            });
                        }
                    }
                },
                close: (_, event: SelectEvent) => {
                    if (event.type === 'CLOSE') {
                        this.clearHighlightOnLastHighlightedOption();
                        if (event.value?.shouldBlur) {
                            this.focused = false;
                        } else {
                            if (this.autocomplete && event.value?.fromKeyboard) {
                                // If we're in autocomplete mode, a keyboard event (e.g. escape) doesn't change the 
                                // focus (so this.el.focus() aren't called because the select was already focused)
                                // but you still have to go back to the autocomplete input.
                                this.focusAutocompleteInput();
                            } else {
                                // Otherwise, we focus the select element
                                this.el.focus();
                            }
                            this.focused = true;
                        }
                    }
                    this.expanded = false;
                },
                selectOption: (_, event) => {
                    if (event.type === 'OPTION_SELECTED') {
                        if (this.multiple) {
                            this.handleOptionSelectedOnMultiple(event.value.option);
                        } else {
                            this.handleOptionSelectedOnSingle(event.value.option);
                            this.stateService.send('CLOSE', {value: {fromKeyboard: event.value.fromKeyboard}});
                        }

                        if (this.autocomplete) {
                            if (this.multiple) {
                                requestAnimationFrame(() => {
                                    this.autocompleteInput.focus();
                                })
                            } else {
                                this.autocompleteValue = event.value.option.displayText;
                            }
                        }
                        this.emitChange(this.value);
                    }
                }
            },
            guards: {
                enabled: () => !this.disabled
            }
        };
    }

    private handleOptionSelectedOnMultiple(event: SelectOptionChosedEvent) {
        const index = this.values.findIndex(v => v.value === event.value);
        if (index === -1) {
            const {value, displayText, chipColor, chipBackgroundColor} = event;
            this.values.push({value, displayText, chipColor, chipBackgroundColor});
            event.source.selected = true;
        } else {
            event.source.selected = false;
            this.values.splice(index, 1);
        }
        this.lastModifiedOptionElement = event.source;
        this.updateValueWithValues();
    }

    private updateValueWithValues() {
        this.value = this.values.map(v => v.value);
        this.displayText = this.values.length !== 0
            ? this.values.map(v => v.displayText).join(', ')
            : undefined;
    }

    private handleOptionSelectedOnSingle(event: SelectOptionChosedEvent) {
        // Reset other options to false if they were selected.
        this.options
            .forEach(option => {
                if (option.selected) option.selected = false;
            });

        event.source.selected = true;
        this.value = event.value;
        this.displayText = event.displayText;
        this.lastModifiedOptionElement = event.source;
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
            this.stateService.send({type: 'CLOSE', value: {shouldBlur: true, fromKeyboard: false}});
        }
    }

    @Listen('keydown')
    onKeyDown(_event: KeyboardEvent) {
        const currentState = this.stateService.getSnapshot().matches("closed") ? 'closed' : 'opened';
        let type: 'autocomplete_unique' | 'autocomplete_multiple' | 'unique' | 'multiple';
        if (this.autocomplete) {
            type = this.multiple ? 'autocomplete_multiple' : 'autocomplete_unique';
        } else {
            type = this.multiple ? 'multiple' : 'unique';
        }
        const actionsFromKeyboardEvents: KeyboardEventAssociatedAction[] = getActionForKeyboardEvent(_event, currentState, type);
        
        // If we have at least one associated actions, we prevent the default behavior of the event. 
        // Except if the action is a focus move (we have to handle the preventDefault behavior ourselves in the action implementation)
        if (actionsFromKeyboardEvents.length != 0 && actionsFromKeyboardEvents.filter(a => a.kind === 'MoveFocus').length === 0) {
            _event.preventDefault();
        }

        for (const actionFromKeyboardEvent of actionsFromKeyboardEvents) {
            this.doActionFromKeyboardEventAssociatedAction(actionFromKeyboardEvent, _event);
        }
    }

    doActionFromKeyboardEventAssociatedAction(actionFromKeyboardEvent: KeyboardEventAssociatedAction, event: KeyboardEvent) {
        switch (actionFromKeyboardEvent.kind) {
            case "CloseSelect":
                this.stateService.send({
                    type: 'CLOSE',
                    value: {shouldBlur: actionFromKeyboardEvent.shouldBlur, fromKeyboard: true}
                });
                break;
            case "OpenSelect":
                this.stateService.send('OPEN');
                break;
            case "SelectOption":
                switch (actionFromKeyboardEvent.target) {
                    case "next":
                        this.selectClosestOption('next');
                        break;
                    case "previous":
                        this.selectClosestOption('previous');
                        break;
                    case "first":
                        this.selectFirstOption();
                        break;
                    case "last":
                        this.selectLastOption();
                        break;
                    case "lastHighlighted": {
                        // We have to handle enterKey here because with autocomplete mode, a wcs-select-option
                        // is only highlighted, therefore the event is not fired
                        const indexToSelect = Array.from(this.notDisabledOptions).indexOf(this.lastHighlightedOptionElement);

                        if (indexToSelect !== -1) {
                            this.lastModifiedOptionElement = this.lastHighlightedOptionElement;
                            this.selectOption(indexToSelect, true);
                        }
                        break;
                    }
                }
                break;
            case "ClearAutocompleteInput":
                this.autocompleteValue = '';
                break;
            case "ClearHighlight":
                this.clearHighlightOnLastHighlightedOption();
                break;
            case "HighlightOption":
                switch (actionFromKeyboardEvent.target) {
                    case "next":
                        this.highlightClosestOption('next');
                        break;
                    case "previous":
                        this.highlightClosestOption('previous');
                        break;
                    case "first":
                        this.highlightFirstOption();
                        break;
                    case "last":
                        this.highlightLastOption();
                        break;
                    default:
                        break;
                }
                break;
            case "FocusOption":
                switch (actionFromKeyboardEvent.target) {
                    case "next":
                        this.focusClosestOption('next');
                        break;
                    case "previous":
                        this.focusClosestOption('previous')
                        break;
                    case "first":
                        this.focusFirstOption()
                        break;
                    case "last":
                        this.focusLastOption();
                        break;
                    case "lastFocused":
                        if (this.lastFocusedOptionElement != null) {
                            this.focusOption(Array.from(this.notDisabledOptions).indexOf(this.lastFocusedOptionElement));
                        }
                        break;
                    default:
                        break;
                }
                break;
            case "MoveFocus":
                switch (actionFromKeyboardEvent.target) {
                    case "previous": {
                        let elementToFocus: Element = this.el.previousElementSibling ?? this.el.parentElement;
                        while (elementToFocus) {
                            if (isFocusable(elementToFocus)) break;
                            elementToFocus = elementToFocus.previousElementSibling ?? elementToFocus.parentElement;
                        }
                        if (elementToFocus) {
                            event.preventDefault();
                            (elementToFocus as HTMLElement).focus();
                        }
                        break;
                    }
                    default:
                        break;
                }
                break;
            default:
                throw new Error("Internal error");
        }
    }

    private getClosestActiveOptionIndexForState(direction: 'next' | 'previous', state: 'highlighted' | 'focused' | 'modified'): number | 'nothing' {
        let concernedOption: HTMLWcsSelectOptionElement | null;
        switch (state) {
            case 'focused':
                concernedOption = this.lastFocusedOptionElement;
                break;
            case 'modified':
                concernedOption = this.lastModifiedOptionElement;
                break;
            case 'highlighted':
                concernedOption = this.lastHighlightedOptionElement;
                break;
            default:
                concernedOption = null;
        }
        let currentIndex = Array.from(this.notDisabledOptions).indexOf(concernedOption);

        const MIN_INDEX = 0;
        const MAX_INDEX = this.notDisabledOptions.length - 1;

        if (direction === 'next' && currentIndex < MAX_INDEX) {
            currentIndex++;
        } else if (direction === 'previous' && currentIndex > MIN_INDEX) {
            currentIndex--;
        } else {
            if (!this.autocomplete)
                return 'nothing';

            // Used to scroll options infinitely with keyboard (autocomplete mode only)
            if (direction === 'next' && currentIndex >= MAX_INDEX) {
                currentIndex = 0;
            }
            if (direction === 'previous' && currentIndex === MIN_INDEX) {
                currentIndex = MAX_INDEX;
            }
        }
        return currentIndex;
    }

    /**
     * Selects the non-disabled option with the index passed as a parameter.
     * The method sends an event to the state machine (the same as when clicking on an option with the mouse)
     * @param indexToSelect Option index within non-deactivated options list
     * @param fromKeyboard
     * @private
     */
    private selectOption(indexToSelect: number, fromKeyboard = false) {
        const optionToSelect = this.notDisabledOptions[indexToSelect];

        if (!optionToSelect) return;

        this.sendOptionSelectedToStateMachine({
            source: optionToSelect,
            value: optionToSelect.value,
            displayText: optionToSelect.innerText
        }, fromKeyboard);
    }

    private selectClosestOption(direction: 'next' | 'previous'): void {
        const indexToSelect = this.getClosestActiveOptionIndexForState(direction, 'modified');
        if (indexToSelect === 'nothing') return;
        this.selectOption(indexToSelect, true);
    }

    private selectFirstOption() {
        if (this.notDisabledOptions.length < 1) {
            return;
        }

        this.selectOption(0, true);
    }

    private selectLastOption() {
        if (this.notDisabledOptions.length < 1) {
            return;
        }

        this.selectOption(this.notDisabledOptions.length - 1, true);
    }

    private focusOption(indexToFocus: number) {
        this.lastFocusedOptionElement = this.notDisabledOptions[indexToFocus];
        this.lastFocusedOptionElement?.focus();
        this.el.setAttribute("aria-activedescendant", this.lastFocusedOptionElement.id);
    }

    private focusClosestOption(direction: 'next' | 'previous'): void {
        const indexToFocus = this.getClosestActiveOptionIndexForState(direction, 'focused');
        if (indexToFocus === 'nothing') return;

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

    sendOptionSelectedToStateMachine(event: SelectOptionChosedEvent, fromKeyboard = false) {
        this.stateService.send({type: 'OPTION_SELECTED', value: {option: event, fromKeyboard}});
    }

    onSlotchange() {
        this.updateSelectedValue(this.value);
        
        // Server-mode only : "no result" slot should be visible dynamically if no option is present in the slot
        if (this.autocomplete && this.serverMode) {
            this.showNoResultFoundLabel = this.options.length < 1 ;
        }
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

    //region Autocomplete mode

    private highlightOption(indexToHighlight: number) {
        this.clearHighlightOnLastHighlightedOption();
        this.lastHighlightedOptionElement = this.notDisabledOptions[indexToHighlight];
        if (this.lastHighlightedOptionElement) {
            this.lastHighlightedOptionElement.highlighted = true;
            this.autocompleteInput.setAttribute("aria-activedescendant", this.lastHighlightedOptionElement.id);
            requestAnimationFrame(() => {
                this.lastHighlightedOptionElement.scrollIntoView({block: "nearest", inline: "nearest"});
            })
        }
    }

    private highlightFirstOption() {
        this.highlightOption(0);
    }

    private highlightLastOption() {
        this.highlightOption(this.notDisabledOptions.length - 1);
    }

    private highlightClosestOption(direction: 'next' | 'previous'): void {
        const indexToHighlight = this.getClosestActiveOptionIndexForState(direction, 'highlighted');
        if (indexToHighlight === 'nothing') return;

        this.highlightOption(indexToHighlight);
    }

    /**
     * This method removes the highlight that applies to the last highlighted option if any.
     * This is used only for accessibility of autocomplete mode.
     * @private
     */
    private clearHighlightOnLastHighlightedOption() {
        if (this.lastHighlightedOptionElement) {
            this.lastHighlightedOptionElement.highlighted = false;
            this.lastHighlightedOptionElement = null;
        }
    }

    private onAutocompleteInputEvent(e: InputEvent) {
        const filter = this.autocompleteInput.value ?? '';

        this.handleAutocompleteValueChange(filter);
        // Avoid the inputEvent event to bubble and be emitted, we rather use wcsFilterChange in this case :
        e.stopPropagation();

    }
    
    private handleAutocompleteValueChange(filter: string): void {
        this.clearHighlightOnLastHighlightedOption();
        const newValueIsDifferentFromLastModifiedOption = this.lastModifiedOptionElement == null || this.lastModifiedOptionElement?.textContent !== this.autocompleteValue;
        if (!this.expanded && newValueIsDifferentFromLastModifiedOption) {
            this.open();
        }

        // Prevents client-side filtering logic from being applied when serverMode is enabled.
        if (!this.serverMode) {
            if (filter.length) {
                const [matchingOptions, optionsToHide] = [[], []];
                const filteringFunction: WcsSelectFilterFn = this.filterFn ?? WcsDefaultSelectFilterFn;
                this.options.forEach((optionEl: HTMLWcsSelectOptionElement) =>
                    (filteringFunction(optionEl, filter) ? matchingOptions : optionsToHide).push(optionEl)
                );

                this.showNoResultFoundLabel = matchingOptions.length === 0;
                matchingOptions.forEach(o => {
                    o.hidden = false;
                    o.removeAttribute("aria-hidden");
                });
                optionsToHide.forEach(o => {
                    o.hidden = true;
                    o.setAttribute("aria-hidden", "true");
                });
            } else {
                this.showNoResultFoundLabel = false;
                this.options.forEach(o => {
                    o.hidden = false;
                    o.removeAttribute("aria-hidden");
                });
            }
        }
        
        if (this.autocompleteValue !== filter) {
            this.autocompleteValue = filter;
            this.wcsFilterChange.emit({
                value: filter,
            });
        }
    }

    @Listen('focus')
    onFocus(event: FocusEvent) {
        if (this.autocomplete) {
            this.focusAutocompleteInput();
        }
        this.wcsFocus.emit(event);
    }

    private focusAutocompleteInput(): void {
        this.autocompleteInput?.focus();
    }

    //endregion

    @Listen('blur', { capture: true })
    onBlur(event: FocusEvent) {
        // Avoid emitting a wcsBlur event when the relatedTarget of the blur event is a child or the select itself
        const target = event.relatedTarget as HTMLElement;
        if (this.el.contains(target)) {
            return;
        }
        
        this.wcsBlur.emit(event);
    }

    componentDidRender() {
        this.popper?.update();
    }

    render() {
        const ariaLabelValue = `${this.labelElement ? this.labelElement.innerText : ''} ${this.hasValue ? this.displayText : ''}`.trimEnd();
        return (
            <Host class={this.expanded ? 'expanded ' : ''}
                  overlayDirection={this.overlayDirection}
                  {...this.focusedAttributes()}
                  role={!this.autocomplete ? "combobox" : null}
                  aria-haspopup={!this.autocomplete ? "listbox" : null}
                  aria-owns={!this.autocomplete ? this.optionsId : null}
                  aria-controls={!this.autocomplete ? this.optionsId : null}
                  aria-disabled={this.disabled ? 'true' : null}
                  aria-expanded={this.expanded ? 'true' : 'false'}
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
                                : (!this.autocomplete || this.autocomplete && this.multiple) &&
                                <label class="wcs-select-value">{this.displayText}</label>)
                            : !this.autocomplete && <label class="wcs-select-placeholder">{this.placeholder}</label>
                        }
                        {this.autocomplete && <input class="autocomplete-field"
                                                         value={this.autocompleteValue}
                                                         role="combobox"
                                                         aria-haspopup="listbox"
                                                         aria-label={ariaLabelValue}
                                                         aria-disabled={this.disabled ? 'true' : null}
                                                         aria-expanded={this.expanded ? 'true' : 'false'}
                                                         aria-controls={this.optionsId}
                                                         aria-owns={this.optionsId}
                                                         aria-multiselectable={this.multiple ? 'true' : 'false'}
                                                         aria-autocomplete="list"
                                                         autocomplete="off"
                                                         onBlur={(e) => this.onAutocompleteFieldBlur(e)}
                                                         placeholder={this.values?.length ? null : this.placeholder}
                                                         onInput={(e) => this.onAutocompleteInputEvent(e)}
                                                         ref={el => this.autocompleteInput = el}
                                                         {...this.inheritedAttributes}/>
                        }
                    </div>
                    <SelectArrow up={this.expanded}/>
                </div>
                <div class="wcs-select-options" id={this.optionsId} role="listbox">
                    <slot name="options" onSlotchange={this.onSlotchange.bind(this)}/>
                    {(this.autocomplete && this.showNoResultFoundLabel) &&
                        <div class="noresult-container">
                            <slot name="filter-no-result">
                                <span>Aucun résultat</span>
                            </slot>
                        </div>}
                </div>
            </Host>
        );
    }

    private focusedAttributes() {
        return !this.disabled ? {tabIndex: 0} : {};
    }

    private onAutocompleteFieldBlur(_e: FocusEvent) {
        if (this.multiple === false && this.autocomplete === true && this.hasValue) {
            this.autocompleteValue = this.displayText;
        }
    }
}

let selectIds = 0;
