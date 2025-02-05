import { WcsSize } from '../../shared-types';

export type WcsButtonType = 'button' | 'submit';

export type WcsButtonShape = 'normal' | 'round' | 'square';

export type WcsButtonMode = 'plain' | 'stroked' | 'clear';

export type WcsButtonSize = Extract<WcsSize, 's' | 'm' | 'l'>;
