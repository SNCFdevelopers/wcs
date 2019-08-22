import { EventEmitter, ComponentInterface } from '../../stencil.core';
import { SelectChangeEventDetail } from './select-interface';
import { SelectOptionChosedEvent } from '../select-option/select-option-interface';
/**
 * Select component, use in conjuction with wcs-select-option.
 *
 * @example ```hmtl
 *  <wcs-select>
 *      <wcs-select-option value="1">One</wcs-select-option>
 *  </wcs-select>```
 * @todo Complete keyboard navigation.
 */
export declare class Select implements ComponentInterface {
    el: HTMLWcsSelectElement;
    /** Wether the select is expanded */
    expanded: boolean;
    /** Wether the component is fully loaded in the DOM. */
    hasLoaded: boolean;
    /** Text to display for the selected option, when no option is selected, the value is undefined. */
    displayText: string;
    /** When the host is focused. */
    focused: boolean;
    /** The currently selected value. */
    value?: any | null;
    /** The text to display when the select is empty. */
    placeholder?: string | null;
    /** If `true`, the user cannot interact with the select. */
    disabled: boolean;
    /** If `true`, the user can select multiple values at once. */
    multiple: boolean;
    /** The name of the control, which is submitted with the form data. */
    name?: string;
    /** Reference to the window. */
    window: Window;
    /** Emitted when the value has changed. */
    wcsChange: EventEmitter<SelectChangeEventDetail>;
    /** Emitted when the select has focus. */
    wcsFocus: EventEmitter<void>;
    /** Emitted when the select loses focus. */
    wcsBlur: EventEmitter<void>;
    /** Open the component. */
    open(): Promise<void>;
    /** Close the component. */
    close(): Promise<void>;
    private stateService;
    private optionsEl;
    private contentEl;
    private values;
    componentDidLoad(): void;
    private readonly options;
    private initMachineConfig;
    private initMachineOptions;
    private handleClickEvent;
    private handleClickOnMultiple;
    private handleNormalClick;
    componentDidUnload(): void;
    private addRippleEffect;
    private readonly hasValue;
    onMouseDown(_event: MouseEvent): void;
    onWindowClickEvent(event: MouseEvent): void;
    selectedOptionChanged(event: CustomEvent<SelectOptionChosedEvent>): void;
    focus(): void;
    blur(): void;
    render(): any;
    private updateStyles;
    private focusedAttributes;
}
