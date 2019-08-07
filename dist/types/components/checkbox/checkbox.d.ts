import { EventEmitter, ComponentInterface } from '../../stencil.core';
import { CheckboxChangeEventDetail } from './checkbox-interface';
export declare class Checkbox implements ComponentInterface {
    private checkboxId;
    el: HTMLElement;
    name: string;
    /**
     * If `true` the checkbox is in indeterminate state.
     */
    indeterminate: boolean;
    /**
     * If `true`, the checkbox is selected.
     */
    checked: boolean;
    /**
     * Emitted when the checked property has changed.
     */
    wcsChange: EventEmitter<CheckboxChangeEventDetail>;
    handleChange(_event: Event): void;
    render(): any;
}
