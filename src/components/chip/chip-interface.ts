import { WcsSize } from '../../shared-types';

export type WcsChipMode = 'selectable' | 'dismissible';
export type WcsChipSize = Extract<WcsSize, 's'>;
export type WcsChipVariant = 'primary' | 'secondary';
