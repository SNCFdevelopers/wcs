/* eslint-disable @typescript-eslint/no-namespace */

// This file contains global types shared between all stencil components

/**
 * Meant to be extracted with TS and used in each component differently, depending on the use case.
 * Global size guideline (with basis at 8px) :
 * xl = 56 px
 * l = 48 px
 * m = 40 px (default)
 * s = 32 px
 * xs = 24 px
 */
export type WcsSize = 'xs' | 's' | 'm' | 'l' | 'xl';

/***********************/
/*      CSS TYPES      */
/***********************/

/**
 * Namespace containing types for representing all available CSS properties.
 * @namespace CssTypes
 */
export namespace CssTypes {
    export type Height = CssUnits.LengthOrPercentage | CssUnits.Keyword | CssUnits.Global;
    export type Width = CssUnits.LengthOrPercentage | CssUnits.Keyword | CssUnits.Global;
}

/**
 * Namespace containing types for representing CSS length units, percentages, keywords, and global values.
 * @namespace CssUnits
 */
export namespace CssUnits {
    export type LengthUnits = 'ch' | 'em' | 'rem' | 'px' | 'vh' | 'vw';
    export type Length = `${number}${LengthUnits}`;
    export type Percentage = `${number}%`;
    export type LengthOrPercentage = CssUnits.Length | CssUnits.Percentage;
    export type Keyword = 'auto' | 'min-content' | 'max-content' | 'fit-content' | `fit-content(${CssUnits.LengthOrPercentage}`;
    export type Global = 'unset' | 'initial' | 'inherit' | 'revert' | 'revert-layer';
}


