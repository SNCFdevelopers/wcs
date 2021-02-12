# wcs-grid-pagination



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description | Type       | Default                      |
| -------------------- | -------------- | ----------- | ---------- | ---------------------------- |
| `availablePageSizes` | --             |             | `number[]` | `[10, 20, 50]`               |
| `currentPage`        | `current-page` |             | `number`   | `1`                          |
| `itemsCount`         | `items-count`  |             | `number`   | `0`                          |
| `pageCount`          | `page-count`   |             | `number`   | `0`                          |
| `pageSize`           | `page-size`    |             | `number`   | `this.availablePageSizes[0]` |


## Events

| Event                     | Description | Type                                               |
| ------------------------- | ----------- | -------------------------------------------------- |
| `wcsGridPaginationChange` |             | `CustomEvent<WcsGridPaginationChangeEventDetails>` |


## Dependencies

### Depends on

- [wcs-select](../select)
- [wcs-select-option](../select-option)

### Graph
```mermaid
graph TD;
  wcs-grid-pagination --> wcs-select
  wcs-grid-pagination --> wcs-select-option
  wcs-select-option --> wcs-checkbox
  style wcs-grid-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
