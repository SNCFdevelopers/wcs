# Communication Navbar

This component is the implementation of the navigation bar dedicated to communication design.

```html


```

<!-- Auto Generated Below -->


## Overview

*Part of communication design system*

The com-nav component is a container for navigation links to external or internal pages of the website.

## Properties

| Property  | Attribute  | Description                                             | Type     | Default     |
| --------- | ---------- | ------------------------------------------------------- | -------- | ----------- |
| `appName` | `app-name` | Name of the application to be displayed in the menu bar | `string` | `undefined` |


## Methods

### `setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) => Promise<void>`



#### Parameters

| Name    | Type                         | Description |
| ------- | ---------------------------- | ----------- |
| `attr`  | `"role" \| `aria-${string}`` |             |
| `value` | `string`                     |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot          | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `"<no-name>"` | Default slot containing all the menu declarations          |
| `"actions"`   | Slot for actions placed on the right part of the container |
| `"app-name"`  | (Optional) Extra slot for the application name             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
