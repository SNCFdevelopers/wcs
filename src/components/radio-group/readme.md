# Radio Group


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                  | Default     |
| -------- | --------- | ----------- | ------------------------------------- | ----------- |
| `mode`   | `mode`    |             | `"horizontal" \| "option" \| "radio"` | `'radio'`   |
| `name`   | `name`    |             | `any`                                 | `undefined` |
| `value`  | `value`   |             | `any`                                 | `undefined` |


## Events

| Event       | Description                         | Type                                       |
| ----------- | ----------------------------------- | ------------------------------------------ |
| `wcsChange` | Emitted when the value has changed. | `CustomEvent<RadioGroupChangeEventDetail>` |


## Methods

### `setAriaAttribute(attr: AriaAttributeName, value: string) => Promise<void>`



#### Parameters

| Name    | Type                         | Description |
| ------- | ---------------------------- | ----------- |
| `attr`  | `"role" \| `aria-${string}`` |             |
| `value` | `string`                     |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
