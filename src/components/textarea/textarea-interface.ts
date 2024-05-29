export interface TextareaChangeEventDetail {
    value: string | undefined | null;
}

export type WcsTextareaInputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

export type WcsTextareaEnterKeyHint = 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

export type WcsTextareaResize = 'both' | 'none' | 'vertical' | 'horizontal';

export type WcsTextareaInputState = 'initial' | 'error';

export type WcsTextareaWrap = 'hard' | 'soft' | 'off';
