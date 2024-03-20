export type AriaAttributeName = `aria-${string}` | 'role';

export interface MutableAriaAttribute {
    setAriaAttribute(attr: AriaAttributeName, value: string): void;
}

export function isMutableAriaAttribute(el: any): el is MutableAriaAttribute {
    return 'setAriaAttribute' in el;
}
