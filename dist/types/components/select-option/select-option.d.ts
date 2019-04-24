import '../../stencil.core';
import { EventEmitter, ComponentInterface } from '../../stencil.core';
import { SelectOptionChosedEvent } from './select-option-interface';
/**
 * Select option component, use in conjuction with wcs-select.
 */
export declare class SelectOption implements ComponentInterface {
    el: HTMLWcsSelectOptionElement;
    /** Wether this option can be selected. */
    disabled: boolean;
    /** Wether this option is selected. */
    selected: boolean;
    /** The option value, not what's displayed, use inner text instead. */
    value?: any | null;
    /**
     * This property should not be used,
     * it is only meant for internal use.
     * @internal
     * @ignore
     */
    slot: string;
    wcsSelectOptionClick: EventEmitter<SelectOptionChosedEvent>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private addClickEventListener;
    render(): JSX.Element;
}
