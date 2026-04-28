# Horizontal Stepper


<!-- Auto Generated Below -->


## Overview

The horizontal-stepper is a representation of a user’s progress through a series of discrete steps.

## Accessibility guidelines 💡
> - The `ariaLabel` property is available for every step to provide a more descriptive label for screen readers.
> - It is **mandatory** in `linear` mode if the step's content is not descriptive enough (e.g., only a number).

## Properties

| Property          | Attribute           | Description                                                                                                                          | Type                      | Default       |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | ------------- |
| `checkOnComplete` | `check-on-complete` | Specifies whether a check should be displayed when a step is passed.                                                                 | `boolean`                 | `undefined`   |
| `currentStep`     | `current-step`      | index of the active step. The index corresponds to the index of the step in the 'steps' list                                         | `number`                  | `0`           |
| `mode`            | `mode`              | Specifies if the stepper is in linear mode (the user can only click on the next step) or non-linear (the user can click on any step) | `"linear" \| "nonLinear"` | `'nonLinear'` |
| `steps`           | --                  | steps to display                                                                                                                     | `HorizontalStepConfig[]`  | `undefined`   |


## Events

| Event                    | Description                             | Type                                    |
| ------------------------ | --------------------------------------- | --------------------------------------- |
| `wcsHorizontalStepClick` | Emits when the user selects a new step. | `CustomEvent<HorizontalStepClickEvent>` |


## Methods

### `next() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `previous() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [wcs-progress-bar](../progress-bar)
- [wcs-button](../button)
- [wcs-mat-icon](../mat-icon)

### Graph
```mermaid
graph TD;
  wcs-horizontal-stepper --> wcs-progress-bar
  wcs-horizontal-stepper --> wcs-button
  wcs-horizontal-stepper --> wcs-mat-icon
  wcs-button --> wcs-spinner
  wcs-button --> wcs-mat-icon
  style wcs-horizontal-stepper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
