# wcs-grid-column



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                       | Type                                                                                                                | Default     |
| ------------- | -------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------- |
| `customCells` | `custom-cells` |                                   | `boolean`                                                                                                           | `false`     |
| `formatter`   | --             |                                   | `(_h: HyperFunc<VNode>, column: HTMLWcsGridColumnElement, rowData: WcsGridRowData) => HTMLElement \| HTMLElement[]` | `undefined` |
| `hidden`      | `hidden`       |                                   | `boolean`                                                                                                           | `false`     |
| `name`        | `name`         |                                   | `string`                                                                                                            | `undefined` |
| `path`        | `path`         |                                   | `string`                                                                                                            | `undefined` |
| `sort`        | `sort`         |                                   | `boolean`                                                                                                           | `false`     |
| `sortFn`      | --             |                                   | `(a: any, b: any, column: HTMLWcsGridColumnElement) => 0 \| 1 \| -1`                                                | `undefined` |
| `sortOrder`   | `sort-order`   |                                   | `"asc" \| "desc" \| "none"`                                                                                         | `'none'`    |
| `width`       | `width`        | Set the column <th> element width | `string`                                                                                                            | `undefined` |


## Events

| Event             | Description | Type                                               |
| ----------------- | ----------- | -------------------------------------------------- |
| `wcsHiddenChange` |             | `CustomEvent<boolean>`                             |
| `wcsSortChange`   |             | `CustomEvent<WcsGridColumnSortChangeEventDetails>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
