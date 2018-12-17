import { Color, CssClassMap } from '../interface';

export function createColorClass(color: Color): CssClassMap {
    return {
        [`wcs-background-${color}`]: true,
        [`wcs-color-${color}`]: true
    };
}
