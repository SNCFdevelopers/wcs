import { MaterialIconSize } from 'wcs-core';

export type WcsFormlyTooltipProps = {
  tooltip?: {
    content: string,
    dynamicContent: string,
    interactive: boolean,
    icon: string,
    size: MaterialIconSize,
    color: string
  }
};

export type WcsFormlyStylesProps = {
  styles?: {
    label?: {[p: string]: any},
    input?: {[p: string]: any},
    error?: {[p: string]: any},
    hint?: {[p: string]: any}
  }
};
