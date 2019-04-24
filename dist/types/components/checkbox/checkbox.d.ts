import '../../stencil.core';
import { EventEmitter, ComponentInterface } from '../../stencil.core';
import { CheckboxChangeEventDetail } from './checkbox-interface';
export declare class Checkbox implements ComponentInterface {
    private checkboxId;
    el: HTMLElement;
    name: string;
    value: any;
    indeterminate: false;
    /**
     * If `true`, the checkbox is selected.
     */
    checked: boolean;
    /**
     * Emitted when the checked property has changed.
     */
    wcsChange: EventEmitter<CheckboxChangeEventDetail>;
    handleChange(event: any): void;
    render(): JSX.Element;
}
