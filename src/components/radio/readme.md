# wcs-radio



<!-- Auto Generated Below -->


## Overview

The radio component should always be wrapped in a `wcs-radio-group`.

## Properties

| Property   | Attribute  | Description                                                                                    | Type      | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | If `true`, the user cannot interact with the radio.                                            | `boolean` | `false`     |
| `label`    | `label`    | The label text displayed for the user                                                          | `string`  | `undefined` |
| `value`    | `value`    | Sets a unique value for each radio, used to identify which radio button in a group is selected | `any`     | `undefined` |


## Events

| Event           | Description                                                                          | Type                            |
| --------------- | ------------------------------------------------------------------------------------ | ------------------------------- |
| `wcsBlur`       | Emitted when the radio loses focus.                                                  | `CustomEvent<FocusEvent>`       |
| `wcsFocus`      | Emitted when the radio has focus.                                                    | `CustomEvent<FocusEvent>`       |
| `wcsRadioClick` | Emitted when the radio is clicked or Space/Enter is pressed above an unchecked radio | `CustomEvent<RadioChosedEvent>` |


## Methods

### `setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) => Promise<void>`



#### Parameters

| Name    | Type                         | Description |
| ------- | ---------------------------- | ----------- |
| `attr`  | `"role" \| `aria-${string}`` |             |
| `value` | `string`                     |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
