# Tooltip

```html
<wcs-button shape="small" id="bottom">Bottom</wcs-button>
<wcs-tooltip for="bottom">A tooltip!</wcs-tooltip>
<wcs-button shape="small" id="right">Right</wcs-button>
<wcs-tooltip for="right" position="right">A tooltip!</wcs-tooltip>
<wcs-button shape="small" id="top">Top</wcs-button>
<wcs-tooltip for="top" position="top">A tooltip!</wcs-tooltip>
<wcs-button shape="small" id="left">Left</wcs-button>
<wcs-tooltip for="left" position="left">To the left!</wcs-tooltip>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                 | Type                                     | Default     |
| ---------- | ---------- | --------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `for`      | `for`      | The **id** of the element the tooltip's going to describe.                  | `string`                                 | `undefined` |
| `position` | `position` | Where the tooltip is going to show relative to the element it's describing. | `"bottom" \| "left" \| "right" \| "top"` | `'bottom'`  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
