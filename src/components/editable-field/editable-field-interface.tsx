import { WcsSize } from '../../shared-types';

export type ValidateFn<T> = (value: T) => boolean;
export type FormatFn<T> = (value: T) => string;

export interface EditableComponentUpdateEvent {
    newValue: any; // We use any for now, but when components typings will support template, change for parameterized type
    /**
     * Permet de sortir de l'état LOAD pour aller vers l'état DISPLAY
     * À n'utiliser que lorsque la valeur n'est pas systématiquement mise à jour à chaque événement.
     */
    successHandler: () => void;
    errorhandler: () => void;
}

export const WcsEditableFieldSizeValues = ['m', 'l'] as const; // as const keyword is used to infer and preserve the exact literal values of an array or object.

export type WcsEditableFieldSize = Extract<WcsSize, typeof WcsEditableFieldSizeValues[number]>;

export function isWcsEditableFieldSize(size: string): size is WcsEditableFieldSize {
    // @ts-ignore : ignore size type, as it is checked with WcsEditableFieldSizeValues
    return WcsEditableFieldSizeValues.includes(size);
}

export type EditableFieldType = 'input' | 'textarea' | 'select';
