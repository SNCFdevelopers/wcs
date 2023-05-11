import { WcsSize } from "../../shared-types";

export interface SelectChangeEventDetail {
    value: any | any[] | undefined | null;
}

export const WcsSelectSizeValue = ['m', 'l'] as const; // as const keyword is used to infer and preserve the exact literal values of an array or object.

export type WcsSelectSize = Extract<WcsSize, typeof WcsSelectSizeValue[number]>;

export function isWcsSelectSize(size: string): size is WcsSelectSize {
    // @ts-ignore : ignore size type, as it is checked with WcsInputSizeValues
    return WcsSelectSizeValue.includes(size);
}
