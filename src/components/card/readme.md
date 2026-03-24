# Card

<!-- Auto Generated Below -->


## Overview

The card component is a container that displays content such as text, images, buttons, and lists.
A card can be a single component, but is often made up of a header, title, subtitle, and content.

While cards are flexible, it is important to use them consistently. You may use `wcs-card-media` outside
`wcs-card-body`, and `wcs-card-header`, `wcs-card-content`, and `wcs-card-footer` within `wcs-card-body`
to keep the card structure clear and well-designed.

`wcs-card-content` is intended for textual content only. If you need to display a form or other rich interactive
content inside a card, place it directly inside `wcs-card-body` instead of wrapping it in `wcs-card-content`.

A card can also be used as a visual wrapper to get the card border, radius, and background. In that case, prefer a
direct child `wcs-card-body` when you need to host structured content.

## Properties

| Property      | Attribute     | Description                                                | Type                         | Default  |
| ------------- | ------------- | ---------------------------------------------------------- | ---------------------------- | -------- |
| `mode`        | `mode`        |                                                            | `"flat" \| "raised"`         | `'flat'` |
| `orientation` | `orientation` | The orientation of the card, can be horizontal or vertical | `"horizontal" \| "vertical"` | `null`   |


## Slots

| Slot | Description                       |
| ---- | --------------------------------- |
|      | Default slot for the card content |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
