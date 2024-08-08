import { WcsSize } from '../../shared-types';

export type ValidateFn<T> = (value: T) => boolean;
export type FormatFn<T> = (value: T) => string;

export interface EditableComponentUpdateEvent {
    /**
     * The new value sent by the component inside the `wcs-editable-field`
     */
    newValue: any; // We use any for now, but when components typings will support template, change for parameterized type
    /**
     * Used to get from LOAD state to DISPLAY state.  
     * Only use to commit the value, when the value is not systematically updated at every event firing
     */
    successHandler: () => void;
    /**
     * Used to get from LOAD state to DISPLAY state.  
     * Only use to discard the value, when the value should not be updated 
     */
    errorHandler: () => void;
}

export const WcsEditableFieldSizeValues = ['m', 'l'] as const; // as const keyword is used to infer and preserve the exact literal values of an array or object.

export type WcsEditableFieldSize = Extract<WcsSize, typeof WcsEditableFieldSizeValues[number]>;

export function isWcsEditableFieldSize(size: string): size is WcsEditableFieldSize {
    // @ts-ignore : ignore size type, as it is checked with WcsEditableFieldSizeValues
    return WcsEditableFieldSizeValues.includes(size);
}

export type EditableFieldType = 'input' | 'textarea' | 'select';
