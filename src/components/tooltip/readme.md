# Tooltip

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                                                                                                                                       | Type                                     | Default              |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | -------------------- |
| `delay`       | `delay`       | Delay in ms once a trigger event is fired before the tooltip shows or hides.  You can provide an array with two values to define a different duration for show and hide.  `[showDelay, hideDelay]`  Use null to use default value.                | `[number, number] \| number`             | `0`                  |
| `duration`    | `duration`    | Duration in ms of the transition animation.                                                                                                                                                                                                       | `[number, number] \| number`             | `[300, 250]`         |
| `for`         | `for`         | The **id** of the element the tooltip's going to describe.  This property cannot be modified after initialization.                                                                                                                                | `string`                                 | `undefined`          |
| `interactive` | `interactive` | Determines if the tooltip has interactive content inside of it, so that it can be hovered over and clicked inside without hiding.                                                                                                                 | `boolean`                                | `false`              |
| `maxWidth`    | `max-width`   | Specifies the maximum width of the tooltip. Useful to prevent it from being too horizontally wide to read.  If the viewport's width is smaller than maxWidth, core CSS ensures the tippy remains smaller than the screen.                         | `number \| string`                       | `350`                |
| `position`    | `position`    | Where the tooltip is going to show relative to the element it's describing.                                                                                                                                                                       | `"bottom" \| "left" \| "right" \| "top"` | `'bottom'`           |
| `theme`       | `theme`       | Allows you to change the theme used by tippy.  The WCS theme is used by default and uses the WCS CSS variables.  You can create a theme by following this documentation and choosing a custom name : https://atomiks.github.io/tippyjs/v6/themes/ | `string`                                 | `'wcs'`              |
| `trigger`     | `trigger`     | Determines the events that cause the tooltip to show. Multiple event names are separated by spaces.  See: https://atomiks.github.io/tippyjs/v6/all-props/#trigger                                                                                 | `string`                                 | `'mouseenter focus'` |


## Methods

### `disable() => Promise<void>`

Temporarily prevent the tooltip from showing or hiding

#### Returns

Type: `Promise<void>`



### `enable() => Promise<void>`

Re-enable a disabled tooltip

#### Returns

Type: `Promise<void>`



### `hide() => Promise<void>`

Programmatically hide the tooltip

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Programmatically show the tooltip

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
