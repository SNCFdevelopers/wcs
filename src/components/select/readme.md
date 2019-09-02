# wcs-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                     | Type      | Default     |
| ------------- | ------------- | --------------------------------------------------------------- | --------- | ----------- |
| `disabled`    | `disabled`    | If `true`, the user cannot interact with the select.            | `boolean` | `false`     |
| `multiple`    | `multiple`    | If `true`, the user can select multiple values at once.         | `boolean` | `false`     |
| `name`        | `name`        | The name of the control, which is submitted with the form data. | `string`  | `undefined` |
| `placeholder` | `placeholder` | The text to display when the select is empty.                   | `string`  | `undefined` |
| `value`       | `value`       | The currently selected value.                                   | `any`     | `undefined` |


## Events

| Event       | Description                          | Type                                   |
| ----------- | ------------------------------------ | -------------------------------------- |
| `wcsBlur`   | Emitted when the select loses focus. | `CustomEvent<void>`                    |
| `wcsChange` | Emitted when the value has changed.  | `CustomEvent<SelectChangeEventDetail>` |
| `wcsFocus`  | Emitted when the select has focus.   | `CustomEvent<void>`                    |


## Methods

### `close() => Promise<void>`

Close the component.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Open the component.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
