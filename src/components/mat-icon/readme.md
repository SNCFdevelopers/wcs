# Material Icon

<!-- Auto Generated Below -->


## Overview

A component used to display a [Material Icon](https://fonts.google.com/icons). Can be useful when used in wcs-grid or in a wcs-button.

## Properties

| Property | Attribute | Description                           | Type                                                          | Default     |
| -------- | --------- | ------------------------------------- | ------------------------------------------------------------- | ----------- |
| `family` | `family`  | Family of the icon                    | `"filled" \| "outlined" \| "rounded" \| "sharp" \| "twotone"` | `'filled'`  |
| `icon`   | `icon`    | Use the icon name from Material Icons | `string`                                                      | `undefined` |
| `size`   | `size`    | Size of the icon                      | `"l" \| "m" \| "s" \| "xl"`                                   | `'m'`       |


## Methods

### `setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) => Promise<void>`



#### Parameters

| Name    | Type                         | Description |
| ------- | ---------------------------- | ----------- |
| `attr`  | `"role" \| `aria-${string}`` |             |
| `value` | `string`                     |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [wcs-counter](../counter)
 - [wcs-editable-field](../editable-field)
 - [wcs-galactic-menu](../galactic-menu)
 - [wcs-horizontal-stepper](../horizontal-stepper)
 - [wcs-input](../input)
 - [wcs-modal](../modal)
 - [wcs-textarea](../textarea)

### Graph
```mermaid
graph TD;
  wcs-counter --> wcs-mat-icon
  wcs-editable-field --> wcs-mat-icon
  wcs-galactic-menu --> wcs-mat-icon
  wcs-horizontal-stepper --> wcs-mat-icon
  wcs-input --> wcs-mat-icon
  wcs-modal --> wcs-mat-icon
  wcs-textarea --> wcs-mat-icon
  style wcs-mat-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
