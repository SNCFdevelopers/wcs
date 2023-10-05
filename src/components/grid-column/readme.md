# wcs-grid-column



<!-- Auto Generated Below -->


## Overview

The grid column is a subcomponent of `wcs-grid` that represents a column of the table.

## Properties

| Property      | Attribute      | Description                                                                                      | Type                                                                                                                | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ----------- |
| `customCells` | `custom-cells` | Set to true if using a `wcs-custom-cell` linked to it.                                           | `boolean`                                                                                                           | `false`     |
| `formatter`   | --             | Customizable formatter function to render the cell differently.                                  | `(_h: HyperFunc<VNode>, column: HTMLWcsGridColumnElement, rowData: WcsGridRowData) => HTMLElement \| HTMLElement[]` | `undefined` |
| `hidden`      | `hidden`       | Flag to hide the column.                                                                         | `boolean`                                                                                                           | `false`     |
| `name`        | `name`         | The name of the column displayed on the table (e.g: First Name, Last Name, Email, ...)           | `string`                                                                                                            | `undefined` |
| `path`        | `path`         | Represents the name of the field from the `data` object (e.g: first_name, last_name, email, ...) | `string`                                                                                                            | `undefined` |
| `sort`        | `sort`         | Make the column sortable.                                                                        | `boolean`                                                                                                           | `false`     |
| `sortFn`      | --             | Customizable sort function to change the comparison of values.                                   | `(a: any, b: any, column: HTMLWcsGridColumnElement) => 0 \| 1 \| -1`                                                | `undefined` |
| `sortOrder`   | `sort-order`   | Defines if the column sort is ascending or descending.   `none` = the column is not sorted.      | `"asc" \| "desc" \| "none"`                                                                                         | `'none'`    |
| `width`       | `width`        | Set the column `<th>` element width.                                                             | `string`                                                                                                            | `undefined` |


## Events

| Event             | Description                                                      | Type                                               |
| ----------------- | ---------------------------------------------------------------- | -------------------------------------------------- |
| `wcsHiddenChange` | Event emitted if the column is dynamically switching visibility. | `CustomEvent<boolean>`                             |
| `wcsSortChange`   | Event emitted when the sort of the column is changed.            | `CustomEvent<WcsGridColumnSortChangeEventDetails>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
