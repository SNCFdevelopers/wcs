import { WcsSize } from "../../shared-types";

export interface SelectChangeEventDetail {
    value: any | any[] | undefined | null;
}

export interface SelectFilterChangeEventDetail {
    value: string | number | undefined | null;
}

export type WcsSelectFilterFn = (optionEl: HTMLWcsSelectOptionElement, filter: string) => boolean;

/**
 * Default filtering function. Compares the string start of wcs-select-option element's text content
 * with your filter input.
 * @param optionEl - wcs-select-option element
 * @param filter - input filter field value
 * @constructor
 */
export const WcsDefaultSelectFilterFn: WcsSelectFilterFn = (optionEl, filter): boolean => {
    return optionEl.textContent.toLowerCase().startsWith(filter.toLowerCase());
}

export const WcsSelectSizeValue = ['m', 'l'] as const; // as const keyword is used to infer and preserve the exact literal values of an array or object.

export type WcsSelectSize = Extract<WcsSize, typeof WcsSelectSizeValue[number]>;

export function isWcsSelectSize(size: string): size is WcsSelectSize {
    // @ts-ignore : ignore size type, as it is checked with WcsInputSizeValues
    return WcsSelectSizeValue.includes(size);
}
