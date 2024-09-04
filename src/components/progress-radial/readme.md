# Progress radial

<!-- Auto Generated Below -->


## Overview

The progress-radial component is a circular progress bar that indicates the current completion of a task. 

## Accessibility guidelines 💡
> Aria attributes and how to display the progress-radial depend on the use case in your application :
>
> - **Case 1 : decorative**
> If the progress-radial is used as a decoration _(if removed, the user doesn't lose any relevant information)_ or in the
> context of another component _(such as progress-radial in a card)_ => **you don't need to show the label nor add an aria-label**.
>
> - **Case 2 : informative**
> If the progress-radial is used to convey important information _(e.g., form completion status, dashboard KPI)_, you need to :
>   - **Provide a visible label** that describes the purpose of the progress-radial.
>   - **Set the `showLabel` property to `true`** to show the percentage inside the progress-radial.
>   - Optionally, use aria-label to provide an accessible name if a visible label is not present.

## Properties

| Property    | Attribute    | Description                                                        | Type      | Default |
| ----------- | ------------ | ------------------------------------------------------------------ | --------- | ------- |
| `showLabel` | `show-label` | Whether the component should display the % label inside            | `boolean` | `false` |
| `size`      | `size`       | The size of the progress radial (in px)                            | `number`  | `120`   |
| `value`     | `value`      | The value of the progress radial. Prefer values between 0 and 100. | `number`  | `0`     |


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
