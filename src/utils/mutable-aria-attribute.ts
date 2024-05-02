export type AriaAttributeName = `aria-${string}` | 'role';

export interface MutableAriaAttribute {
    setAriaAttribute(attr: AriaAttributeName, value: string): void;
}

export function isMutableAriaAttribute(el: any): el is MutableAriaAttribute {
    if (typeof el !== 'object' || el === null || el === undefined) return false;
    return 'setAriaAttribute' in el;
}
