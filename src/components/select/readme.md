# Select

## Basic

```html
<wcs-select placeholder="Le select" id="leselectg">
    <wcs-select-option value="1">One</wcs-select-option>
    <wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
</wcs-select>
```

## With disabled option

```html
<wcs-select placeholder="Le select">
    <wcs-select-option value="1" disabled="true">One</wcs-select-option>
    <wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
<wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
<wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
<wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
<wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
<wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
<wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
<wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
<wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
<wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
</wcs-select>
```

## Disabled

```html
<wcs-select placeholder="Le select" disabled>
    <wcs-select-option value="1">One</wcs-select-option>
    <wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
</wcs-select>
```

## Multiple

```html
<wcs-select placeholder="Le select" multiple>
    <wcs-select-option value="1">One</wcs-select-option>
    <wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
</wcs-select>
```

## Programatically select values

```html
<wcs-select id="select-values" placeholder="Le select" multiple>
    <wcs-select-option value="1">One</wcs-select-option>
    <wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
</wcs-select>

<wcs-button id="p-sel-button" mode="stroked" class="primary">Select values</wcs-button>
<script>
    const pSelect = document.querySelector('#select-values');
    const pButton = document.querySelector('#p-sel-button');
    pButton.addEventListener('click', () => {
        pSelect.setAttribute('value', ['1', '2']);
    });
</script>
```

## Initial select values

```html
<wcs-select placeholder="Le select" value="1, 2" multiple>
    <wcs-select-option value="1">One</wcs-select-option>
    <wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
</wcs-select>
```

## Lazy loaded options

```html
<wcs-select id="lazy-loaded-select" placeholder="Le select" multiple>
    <wcs-select-option value="1">One</wcs-select-option>
    <wcs-select-option value="2">Two</wcs-select-option>
    <wcs-select-option value="3">Three</wcs-select-option>
</wcs-select>

<wcs-button id="lazy-loaded-sel-button" mode="stroked" class="primary">Add option</wcs-button>

<script>
    const lazyLoadedSelect = document.querySelector('#lazy-loaded-select');
    const button = document.querySelector('#lazy-loaded-sel-button');
    let id = 4;
    button.addEventListener('click', () => {
        const opt = document.createElement('wcs-select-option');
        opt.setAttribute('value', id++);
        opt.appendChild(document.createTextNode(id.toString()));
        lazyLoadedSelect.appendChild(opt);
    });
</script>
```

## Known issues

It is strongly recommended to add a width size to the select.

```html
<style>
    #lazy-loaded-select {
        width: 200px;
        margin-right: 16px;
        display: inline-block;
    }
</style>
```


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
