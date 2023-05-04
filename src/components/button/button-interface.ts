import { WcsSize } from '../../shared-types';

export type WcsButtonType = 'button' | 'submit';

export type WcsButtonShape = 'normal' | 'round' | 'square';

export type WcsButtonMode = 'plain' | 'stroked' | 'clear';

export const WcsButtonSizeValues = ['s', 'm', 'l'] as const; // as const keyword is used to infer and preserve the exact literal values of an array or object.

export type WcsButtonSize = Extract<WcsSize, typeof WcsButtonSizeValues[number]>;

export function isWcsButtonSize(size: string): size is WcsButtonSize {
    // @ts-ignore : ignore size type, as it is checked with WcsButtonSizeValues
    return WcsButtonSizeValues.includes(size);
}
