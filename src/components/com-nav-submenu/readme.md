# wcs-com-nav-submenu



<!-- Auto Generated Below -->


## Overview

The com-nav-submenu is a subcomponent of `wcs-com-nav`. It represents an expandable menu containing more items or categories.

## Properties

| Property           | Attribute           | Description | Type     | Default     |
| ------------------ | ------------------- | ----------- | -------- | ----------- |
| `label`            | `label`             |             | `string` | `undefined` |
| `panelDescription` | `panel-description` |             | `string` | `undefined` |
| `panelTitle`       | `panel-title`       |             | `string` | `undefined` |


## Events

| Event              | Description | Type                                 |
| ------------------ | ----------- | ------------------------------------ |
| `wcsSubmenuOpened` |             | `CustomEvent<MenuOpenedEventDetail>` |


## Methods

### `close() => Promise<void>`

Close the menu

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the menu

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
