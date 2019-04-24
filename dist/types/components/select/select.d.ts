import '../../stencil.core';
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
    /** If `true`, the user cannot interact with the select. */
    disabled: boolean;
    /** The text to display when the select is empty. */
    placeholder?: string | null;
    /** The name of the control, which is submitted with the form data. */
    name?: string;
    /** The currently selected value. */
    value?: any | null;
    /** Reference to the window. */
    window: Window;
    /** Emitted when the value has changed. */
    wcsChange: EventEmitter<SelectChangeEventDetail>;
    /** Emitted when the select has focus. */
    wcsFocus: EventEmitter<void>;
    /** Emitted when the select loses focus. */
    wcsBlur: EventEmitter<void>;
    private optionsEl;
    private contentEl;
    private wrapperEl;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private expandOnClick;
    private expand;
    private handleExpandedKeyEvents;
    private unExpand;
    private addRippleEffect;
    onWindowClickEvent(event: MouseEvent): void;
    selectedOptionChanged(event: CustomEvent<SelectOptionChosedEvent>): void;
    private wrapperClasses;
    private readonly hasValue;
    private updateStyles;
    private focus;
    private handleFocusedKeyEvents;
    private blur;
    private focusedAttributes;
    private setMarginTopOnNotFirstOption;
    render(): JSX.Element;
}
