# Radio Group
Radio buttons are often used in forms or for other functions that let users select only one option from a list. With radio buttons, users cannot make multiple selections from options suggested (as they can with check boxes).

```html
<wcs-radio-group>
  <wcs-radio label="SNCF" value="1"></wcs-radio>
  <wcs-radio label="SNCF Réseau" value="2"></wcs-radio>
  <wcs-radio label="SNCF Voyageurs" value="3"></wcs-radio>
  <wcs-radio label="Gares & Connexions" value="4"></wcs-radio>
</wcs-radio-group>
```

## With default value

```html
<wcs-radio-group value="1">
  <wcs-radio label="SNCF" value="1"></wcs-radio>
  <wcs-radio label="SNCF Réseau" value="2"></wcs-radio>
  <wcs-radio label="SNCF Voyageurs" value="3"></wcs-radio>
  <wcs-radio label="Gares & Connexions" value="4"></wcs-radio>
</wcs-radio-group>
```

## Options mode

```html
<wcs-radio-group mode="option" value="1">
  <wcs-radio label="SNCF" value="1"></wcs-radio>
  <wcs-radio label="SNCF Réseau" value="2"></wcs-radio>
  <wcs-radio label="SNCF Voyageurs" value="3"></wcs-radio>
  <wcs-radio label="Gares & Connexions" value="4"></wcs-radio>
</wcs-radio-group>
```

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                  | Default     |
| -------- | --------- | ----------- | --------------------- | ----------- |
| `mode`   | `mode`    |             | `"option" \| "radio"` | `'radio'`   |
| `name`   | `name`    |             | `any`                 | `undefined` |
| `value`  | `value`   |             | `any`                 | `undefined` |


## Events

| Event       | Description                         | Type                                       |
| ----------- | ----------------------------------- | ------------------------------------------ |
| `wcsChange` | Emitted when the value has changed. | `CustomEvent<RadioGroupChangeEventDetail>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
