# wcs-chip



<!-- Auto Generated Below -->


## Overview

The chip component is a small, interactive element that can be used to represent an input, filter, or tag.
It can be in one of two modes: 'selectable' or 'dismissible'.
- In 'selectable' mode, the chip can be selected or deselected, and emits an event when clicked.
- In 'dismissible' mode, the chip can be dismissed (removed) by clicking a dismiss icon, and emits an event when the dismiss icon is clicked.

## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                                                             | Type                            | Default        |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------- |
| `disabled` | `disabled` | If `true`, the chip is disabled. The chip will not respond to click events and will not emit any events. This property is used in both 'selectable' and 'dismissible' modes.                                                                            | `boolean`                       | `false`        |
| `label`    | `label`    | Text label displayed on the chip.                                                                                                                                                                                                                       | `string`                        | `undefined`    |
| `mode`     | `mode`     | Defines the mode of the chip. Can be 'selectable' or 'dismissible'. - 'selectable': The chip can be selected and emits an event when clicked. - 'dismissible': The chip can be dismissed (removed) and emits an event when the dismiss icon is clicked. | `"dismissible" \| "selectable"` | `'selectable'` |
| `open`     | `open`     | If `true`, the chip is open. This property is used to control the visibility of the chip in the dismissible mode. When the user clicks the dismiss icon, this property automatically becomes `false`, hiding the chip.                                  | `boolean`                       | `true`         |
| `selected` | `selected` | If `true`, the chip is selected. This property is only used in 'selectable' mode.                                                                                                                                                                       | `boolean`                       | `false`        |
| `value`    | `value`    | Unique value representing the chip identifier in events.                                                                                                                                                                                                | `string`                        | `undefined`    |
| `variant`  | `variant`  | Defines the visual style of the chip for the dismissible mode.                                                                                                                                                                                          | `"primary" \| "secondary"`      | `'primary'`    |


## Events

| Event                 | Description                                                     | Type                                                 |
| --------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| `wcsChipDismiss`      | Emitted when the dismiss icon is clicked in 'dismissible' mode. | `CustomEvent<{ value: string; }>`                    |
| `wcsChipSelectChange` | Emitted when the chip is clicked in 'selectable' mode.          | `CustomEvent<{ value: string; selected: boolean; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
