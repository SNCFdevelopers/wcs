# wcs-accordion-panel



<!-- Auto Generated Below -->


## Overview

The accordion-panel is a subcomponent of `wcs-accordion`. It represents every panel of the accordion that can be expanded.

## Properties

| Property                 | Attribute                   | Description                                                                                                                                                                                 | Type      | Default |
| ------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `groupContentWithHeader` | `group-content-with-header` | Specifies wether the component should group the content with header in one card if true, there will be only one card with the header and the content Nothing change when the panel is close | `boolean` | `false` |
| `hideActionText`         | `hide-action-text`          | Specifies whether the component should display the open/close text. if false, it won't show the open/close text.                                                                            | `boolean` | `false` |
| `highlight`              | `highlight`                 | Specifies whether the component should highlight when open with primary color. if true, the background color will be the primary color. if false, the background color will be wcs-light.   | `boolean` | `false` |
| `open`                   | `open`                      |                                                                                                                                                                                             | `boolean` | `false` |


## Events

| Event           | Description | Type                   |
| --------------- | ----------- | ---------------------- |
| `wcsOpenChange` |             | `CustomEvent<boolean>` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



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
