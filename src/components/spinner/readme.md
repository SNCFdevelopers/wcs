# Spinner

<!-- Auto Generated Below -->


## Overview

The spinner component is visual indicator that showing a process is happening in the background but the interface is
not yet ready for interaction.  
If your page structure is simple or the loading time is long (> 300ms), use [wcs-skeleton](.?path=/docs/components-skeleton--documentation) instead.

## Properties

| Property | Attribute | Description                                                                | Type                    | Default    |
| -------- | --------- | -------------------------------------------------------------------------- | ----------------------- | ---------- |
| `mode`   | `mode`    | Indicates the spinner display mode. Accepted values: `border` or `growing` | `"border" \| "growing"` | `'border'` |


## Dependencies

### Used by

 - [wcs-button](../button)
 - [wcs-editable-field](../editable-field)
 - [wcs-grid](../grid)

### Graph
```mermaid
graph TD;
  wcs-button --> wcs-spinner
  wcs-editable-field --> wcs-spinner
  wcs-grid --> wcs-spinner
  style wcs-spinner fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
