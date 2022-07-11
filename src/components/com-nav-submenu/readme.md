# wcs-com-nav-submenu



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type     | Default     |
| ------------------ | ------------------- | ----------- | -------- | ----------- |
| `label`            | `label`             |             | `string` | `undefined` |
| `panelDescription` | `panel-description` |             | `string` | `undefined` |
| `panelTitle`       | `panel-title`       |             | `string` | `undefined` |


## Events

| Event                   | Description                                                                                                                                                  | Type                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `wcsClickOnFinalAction` | Emitted when a user click on a final navigation action.  Used by the com-nav component to close the mobile menu overlay when a user click on a final action. | `CustomEvent<void>`                  |
| `wcsSubmenuOpened`      |                                                                                                                                                              | `CustomEvent<MenuOpenedEventDetail>` |


## Methods

### `close() => Promise<void>`

Close the menu

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the menu

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
