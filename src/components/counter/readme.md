# Input

<!-- Auto Generated Below -->


## Overview

Counter component, meant to be used for small range of values (e.g : 0 - 5).<br>
For larger or specific ranges, please use [wcs-input (type number)](.?path=/docs/components-input--documentation)

## Properties

| Property             | Attribute  | Description                                                                                                           | Type         | Default     |
| -------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- |
| `disabled`           | `disabled` | Specify whether the counter is disabled or not.                                                                       | `boolean`    | `false`     |
| `label` _(required)_ | `label`    | The label of the counter.<br/> e.g. Number of passengers, train carriages, railroad tracks...                         | `string`     | `undefined` |
| `max`                | `max`      | The maximum value of the counter. If the value of the max attribute isn't set, then the element has no maximum value. | `number`     | `undefined` |
| `min`                | `min`      | The minimum value of the counter. If the value of the min attribute isn't set, then the element has no minimum value. | `number`     | `undefined` |
| `size`               | `size`     | Specify the size (height) of the counter.                                                                             | `"l" \| "m"` | `'m'`       |
| `step`               | `step`     | Defines by how much the counter will be incremented or decremented.                                                   | `number`     | `1`         |
| `value` _(required)_ | `value`    | The current value of the counter.                                                                                     | `number`     | `undefined` |


## Events

| Event       | Description                                        | Type                                    |
| ----------- | -------------------------------------------------- | --------------------------------------- |
| `wcsBlur`   | Emitted when the counter loses focus.              | `CustomEvent<FocusEvent>`               |
| `wcsChange` | Emitted when the value of the counter has changed. | `CustomEvent<CounterChangeEventDetail>` |


## Methods

### `setAriaAttribute(attr: AriaAttributeName, value: string) => Promise<void>`



#### Parameters

| Name    | Type                         | Description |
| ------- | ---------------------------- | ----------- |
| `attr`  | `"role" \| `aria-${string}`` |             |
| `value` | `string`                     |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [wcs-button](../button)
- [wcs-mat-icon](../mat-icon)

### Graph
```mermaid
graph TD;
  wcs-counter --> wcs-button
  wcs-counter --> wcs-mat-icon
  wcs-button --> wcs-spinner
  style wcs-counter fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
