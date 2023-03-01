# Button

<!-- Auto Generated Below -->

## Overview

Button component, can also be a link when specifying href.

## Properties

| Property   | Attribute  | Description                                                         | Type                                         | Default     |
| ---------- | ---------- | ------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `disabled` | `disabled` | Specify wether the button is disabled or not.                       | `boolean`                                    | `false`     |
| `href`     | `href`     | Set a URL to point to. If specified use a `a` tag instead of `btn`. | `string`                                     | `undefined` |
| `target`   | `target`   | Specifies where to open the linked document when using href         | `"_blank_" \| "_self"`                       | `"_self_"`  |
| `loading`  | `loading`  | Flag to display spinner until the end of action                     | `boolean`                                    | `false`     |
| `mode`     | `mode`     | This attribute specify the appearance of the button.                | `"clear" \| "plain" \| "stroked"`            | `'plain'`   |
| `ripple`   | `ripple`   | Specify wether the button should have a ripple effect or not.       | `boolean`                                    | `true`      |
| `shape`    | `shape`    | Specify the shape of the button.                                    | `"normal" \| "round" \| "small" \| "square"` | `'normal'`  |
| `type`     | `type`     | Specify the button type.                                            | `"button" \| "submit"`                       | `'button'`  |

## Dependencies

### Used by

- [wcs-dropdown](../dropdown)
- [wcs-horizontal-stepper](../horizontal-stepper)
- [wcs-modal](../modal)

### Depends on

- [wcs-spinner](../spinner)

### Graph

```mermaid
graph TD;
  wcs-button --> wcs-spinner
  wcs-dropdown --> wcs-button
  wcs-horizontal-stepper --> wcs-button
  wcs-modal --> wcs-button
  style wcs-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
