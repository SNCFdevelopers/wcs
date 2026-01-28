# wcs-com-nav-category



<!-- Auto Generated Below -->


## Overview

The com-nav-category is a subcomponent of `wcs-com-nav`. It represents a category nested inside a `wcs-com-nav-submenu`.

## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `label`  | `label`   |             | `string` | `undefined` |


## Events

| Event               | Description | Type                                     |
| ------------------- | ----------- | ---------------------------------------- |
| `wcsCategoryOpened` |             | `CustomEvent<CategoryOpenedEventDetail>` |


## Methods

### `close() => Promise<void>`

Close the category

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the category

#### Returns

Type: `Promise<void>`



### `setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) => Promise<void>`



#### Parameters

| Name    | Type                         | Description |
| ------- | ---------------------------- | ----------- |
| `attr`  | ``aria-${string}` \| "role"` |             |
| `value` | `string`                     |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
