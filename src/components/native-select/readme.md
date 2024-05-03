# wcs-select-native



<!-- Auto Generated Below -->


## Overview

The `wcs-native-select` component is designed to accept a native `<select>` element as a slotted child. This choice
allows developers to bind the `<select>` element using the framework of their choice, without the need to re-expose all the
properties of the `<select>` and `<option>` elements in this component.

The component wraps the native `<select>` element and provides custom styles and behavior, while preserving the native
functionality and accessibility.

### ✅ Guidance

- To have a placeholder, you must have an option as child which has `selected` attribute and `disabled`
attribute. You can add the `hidden` attribute to don't show the placeholder option in the options overlay.

### Example usage

```html
<wcs-native-select>
  <select>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </select>
</wcs-native-select>
```

### Note
- We did not find a way to detect when the select is reset, if you want to apply the placeholder style when the
select is reset, you have to call the `updateStyles()` method manually.
- It is strongly recommended to use select-native when you don't have to support the multi-selection feature

## Properties

| Property | Attribute | Description                                                                                                                                                                                          | Type         | Default |
| -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- |
| `size`   | `size`    | The `size` property controls the size of the slotted `select` element by adjusting its padding. There are two possible size options: - 'm': medium size - 'l': large size  The default value is 'm'. | `"l" \| "m"` | `'m'`   |


## Methods

### `setAriaAttribute(attr: AriaAttributeName, value: string) => Promise<void>`



#### Parameters

| Name    | Type                         | Description |
| ------- | ---------------------------- | ----------- |
| `attr`  | `"role" \| `aria-${string}`` |             |
| `value` | `string`                     |             |

#### Returns

Type: `Promise<void>`



### `updateStyles() => Promise<void>`

Use this method to force the component to update its styles. It can be useful when the select is reset (with a placeholder).

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
