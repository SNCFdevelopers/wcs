# Tabs

<!-- Auto Generated Below -->


## Overview

Tabs component to switch between tab content.
Use in conjuction with `wcs-tab`.

## Properties

| Property        | Attribute        | Description                                                                                                                                  | Type                           | Default     |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------- |
| `align`         | `align`          | Tab headers alignment.                                                                                                                       | `"center" \| "end" \| "start"` | `'start'`   |
| `gutter`        | `gutter`         | Determines if tabs header should have a border at the bottom                                                                                 | `boolean`                      | `undefined` |
| `headersOnly`   | `headers-only`   | Whether to skip rendering the tabpanel with the content of the selected tab. Use this prop if you plan to separately render the tab content. | `boolean`                      | `false`     |
| `selectedIndex` | `selected-index` | Current selected tab index. Starts at 0.                                                                                                     | `number`                       | `0`         |
| `selectedKey`   | `selected-key`   |                                                                                                                                              | `any`                          | `undefined` |


## Events

| Event       | Description                            | Type                             |
| ----------- | -------------------------------------- | -------------------------------- |
| `tabChange` |  Emitted when the selected tab change. | `CustomEvent<WcsTabChangeEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
