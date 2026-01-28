# Tabs

<!-- Auto Generated Below -->


## Overview

Tabs component to switch between tab content. Use in conjunction with `wcs-tab`.

## Accessibility guidelines 💡
> - Mobile display should be used for narrower screens (automatically set by default).
> - The component respects the W3C [tab pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

## Properties

| Property        | Attribute        | Description                                                                                                                                  | Type                           | Default     |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------- |
| `align`         | `align`          | Tab headers alignment.                                                                                                                       | `"center" \| "end" \| "start"` | `'start'`   |
| `description`   | `description`    | Description is used to provide aria-label for the tabs container which has `role="tablist"`.                                                 | `string`                       | `undefined` |
| `gutter`        | `gutter`         | Determines if tabs header should have a border at the bottom                                                                                 | `boolean`                      | `undefined` |
| `headersOnly`   | `headers-only`   | Whether to skip rendering the tabpanel with the content of the selected tab. Use this prop if you plan to separately render the tab content. | `boolean`                      | `false`     |
| `selectedIndex` | `selected-index` | Current selected tab index. Starts at 0.                                                                                                     | `number`                       | `0`         |
| `selectedKey`   | `selected-key`   |                                                                                                                                              | `any`                          | `undefined` |


## Events

| Event       | Description                            | Type                             |
| ----------- | -------------------------------------- | -------------------------------- |
| `tabChange` |  Emitted when the selected tab change. | `CustomEvent<WcsTabChangeEvent>` |


## Methods

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
