# Switch


<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                 | Type                            | Default         |
| ---------------- | ----------------- | ----------------------------------------------------------- | ------------------------------- | --------------- |
| `checked`        | `checked`         | If `true`, the switch is selected.                          | `boolean`                       | `false`         |
| `disabled`       | `disabled`        | Specify wether the switch is disabled or not.               | `boolean`                       | `false`         |
| `labelAlignment` | `label-alignment` | Specifie the alignment of the switch with the label content | `"bottom" \| "center" \| "top"` | `'center'`      |
| `name`           | `name`            |                                                             | `string`                        | `this.switchId` |


## Events

| Event       | Description                                    | Type                                   |
| ----------- | ---------------------------------------------- | -------------------------------------- |
| `wcsChange` | Emitted when the checked property has changed. | `CustomEvent<SwitchChangeEventDetail>` |


## Methods

### `setAriaAttribute(attr: AriaAttributeName, value: string) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
