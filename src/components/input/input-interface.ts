// From: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
import { WcsSize } from '../../shared-types';

export type AutocompleteTypes = (
    | 'on' | 'off' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'honorific-suffix'
    | 'nickname' | 'email' | 'username' | 'new-password' | 'current-password' | 'one-time-code' | 'organization-title' | 'organization'
    | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' | 'address-level4' | 'address-level3' | 'address-level2'
    | 'address-level1' | 'country' | 'country-name' | 'postal-code' | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name'
    | 'cc-family-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency' | 'transaction-amount'
    | 'language' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 'tel' | 'tel-country-code' | 'tel-national' | 'tel-area-code' | 'tel-local'
    | 'tel-extension' | 'impp' | 'url' | 'photo');

export type TextFieldTypes = 'date' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'time' | 'week' | 'month' | 'datetime-local' | 'file';

export const WcsInputSizeValues = ['s', 'm', 'l'] as const; // as const keyword is used to infer and preserve the exact literal values of an array or object.

export type WcsInputSize = Extract<WcsSize, typeof WcsInputSizeValues[number]>;

export function isWcsInputSize(size: string): size is WcsInputSize {
    // @ts-ignore : ignore size type, as it is checked with WcsInputSizeValues
    return WcsInputSizeValues.includes(size);
}

export type WcsInputAutocorrect = 'on' | 'off';

export type WcsInputEnterKeyHint = 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

export type WcsInputInputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

export type WcsInputState = 'initial' | 'error';

export interface InputChangeEventDetail {
    value: string | undefined | null;
}
