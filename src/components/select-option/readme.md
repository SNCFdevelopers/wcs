# Select option



<!-- Auto Generated Below -->


## Overview

The select option is a subcomponent of `wcs-select` that represents a single option in a select list.

## Properties

| Property              | Attribute               | Description                                                     | Type      | Default     |
| --------------------- | ----------------------- | --------------------------------------------------------------- | --------- | ----------- |
| `chipBackgroundColor` | `chip-background-color` | Chip's background color.                                        | `string`  | `undefined` |
| `chipColor`           | `chip-color`            | Chip's displayed text color.                                    | `string`  | `undefined` |
| `disabled`            | `disabled`              | Whether this option can be selected.                            | `boolean` | `false`     |
| `selected`            | `selected`              | Whether this option is selected.                                | `boolean` | `false`     |
| `value`               | `value`                 | The option value, not what's displayed, use inner text instead. | `any`     | `undefined` |


## Events

| Event                  | Description | Type                                   |
| ---------------------- | ----------- | -------------------------------------- |
| `wcsSelectOptionClick` |             | `CustomEvent<SelectOptionChosedEvent>` |


## Dependencies

### Used by

 - [wcs-grid-pagination](../grid-pagination)

### Depends on

- [wcs-checkbox](../checkbox)

### Graph
```mermaid
graph TD;
  wcs-select-option --> wcs-checkbox
  wcs-grid-pagination --> wcs-select-option
  style wcs-select-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
