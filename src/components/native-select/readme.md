# wcs-select-native



<!-- Auto Generated Below -->


## Overview

The `wcs-native-select` component is designed to accept a native <select> element as a slotted child. This choice
allows developers to bind the <select> element using the framework of their choice, without the need to re-expose all the
properties of the <select> and <option> elements in this component.

The component wraps the native <select> element and provides custom styles and behavior, while preserving the native
functionality and accessibility.

Example usage:

<wcs-native-select>
  <select>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </select>
</wcs-native-select>

## Properties

| Property | Attribute | Description                                                                                                                                                                                          | Type         | Default |
| -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- |
| `size`   | `size`    | The `size` property controls the size of the slotted `select` element by adjusting its padding. There are two possible size options: - 'm': medium size - 'l': large size  The default value is 'm'. | `"l" \| "m"` | `'m'`   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
