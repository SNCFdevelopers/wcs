# Progress bar

<!-- Auto Generated Below -->


## Overview

Component displaying progress as a bar.

## Properties

| Property    | Attribute    | Description                                                                      | Type      | Default |
| ----------- | ------------ | -------------------------------------------------------------------------------- | --------- | ------- |
| `showLabel` | `show-label` | Whether it displays a label indicating the percentage of progress above the bar. | `boolean` | `false` |
| `small`     | `small`      | Whether the component display the small version                                  | `boolean` | `false` |
| `value`     | `value`      | The actual value of the progress. Ranging from 0 to 100.                         | `number`  | `0`     |


## Dependencies

### Used by

 - [wcs-horizontal-stepper](../horizontal-stepper)

### Graph
```mermaid
graph TD;
  wcs-horizontal-stepper --> wcs-progress-bar
  style wcs-progress-bar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
