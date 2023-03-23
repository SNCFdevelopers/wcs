import { WcsSize } from "../../shared-types";

export interface CounterChangeEventDetail {
    value: number;
}

export const WcsCounterSizeValues = ['m', 'l'] as const; // as const keyword is used to infer and preserve the exact literal values of an array or object.

export type WcsCounterSize = Extract<WcsSize, typeof WcsCounterSizeValues[number]>;

export function isWcsCounterSize(size: string): size is WcsCounterSize {
    // @ts-ignore : ignore size type, as it is checked with WcsInputSizeValues
    return WcsCounterSizeValues.includes(size);
}
