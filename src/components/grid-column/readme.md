# wcs-grid-column



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                | Type                                                                                                                         | Default     |
| --------------- | --------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `data`          | `data`          | Cell default data                          | `((row: OneDArray<TCell> \| TDataObjectRow) => TCell) \| HTMLElement \| VNode<any> \| boolean \| number \| object \| string` | `undefined` |
| `fieldId`       | `field-id`      | column ID                                  | `string`                                                                                                                     | `undefined` |
| `fixedHeader`   | `fixed-header`  | To keep the header visible during a scroll | `boolean`                                                                                                                    | `undefined` |
| `formatter`     | --              | custom cell formatting                     | `(cell: TCell, row: Row, column: TColumn) => ComponentChild`                                                                 | `undefined` |
| `hiddenColumn`  | `hidden-column` | to show/hide the column                    | `boolean`                                                                                                                    | `undefined` |
| `name`          | `name`          | column name                                | `VNode<any> \| boolean \| number \| object \| string`                                                                        | `undefined` |
| `sort`          | `sort`          | to enable/disable sort                     | `boolean`                                                                                                                    | `undefined` |
| `sortCompareFn` | --              | to provide a custom sort function          | `(a: TCell, b: TCell) => number`                                                                                             | `undefined` |
| `width`         | `width`         | width of the column                        | `string`                                                                                                                     | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
