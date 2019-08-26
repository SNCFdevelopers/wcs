import { EventEmitter, ComponentInterface } from '../../stencil.core';
import { SelectOptionChosedEvent } from './select-option-interface';
/**
 * Select option component, use in conjunction with wcs-select.
 */
export declare class SelectOption implements ComponentInterface {
    el: HTMLWcsSelectOptionElement;
    /** Wether this option can be selected. */
    disabled: boolean;
    /** Wether this option is selected. */
    selected: boolean;
    /** The option value, not what's displayed, use inner text instead. */
    value?: any;
    /**
     * This property musn't be set by hand, it is used by the `wcs-select` component.
     * If you want a multiple select, set `multiple` attribute on the parent select instead.
     * @internal
     * @ignore
     */
    multiple: boolean;
    wcsSelectOptionClick: EventEmitter<SelectOptionChosedEvent>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    onMouseDown(event: MouseEvent): void;
    render(): any;
}
