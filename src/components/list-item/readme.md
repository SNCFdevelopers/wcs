# List Item

<!-- Auto Generated Below -->


## Overview

Lists are used for grouping a collection of related items.

Standard lists can be used either with or without icons. Depending on the context, the list can have one or more
actions (favourite, download, delete, etc.). Use standard lists with a unique action when each line has an action. 

## Accessibility guidelines 💡
> - You should wrap your list-items inside a container with a `role` attribute set to `list`. On each `wcs-list-item`, 
  you should set a `role` attribute to `listitem`. See the code below.
actions (favourite, download, delete, etc.). Use standard lists with a unique action when each line has an action.

## Properties

| Property    | Attribute   | Description                                                             | Type      | Default |
| ----------- | ----------- | ----------------------------------------------------------------------- | --------- | ------- |
| `activated` | `activated` | True if the item is active. Adds a background color that highlights it. | `boolean` | `false` |


## Slots

| Slot            | Description                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| `"actions"`     | Slot containing the actions of the list item, prefer using some `<wcs-button>` inside |
| `"description"` | Slot containing the description of the list item                                      |
| `"properties"`  | Slot containing the `<wcs-list-item-properties>` element                              |
| `"title"`       | Slot containing the title of the list item                                            |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
