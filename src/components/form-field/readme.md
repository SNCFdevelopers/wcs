# Form field

Form fields component wraps the native input element and add some more functionnality on top of it.

## Wrapped component

You can use the `form-field` to wrap an `input`, `textarea` or a `wcs-select`.

```html
<p>Input :</p>
<wcs-form-field>
    <input placeholder="John doe"/>
</wcs-form-field>

<p>Select :</p>
<wcs-form-field>
    <wcs-select placeholder="Select a country" required>
        <wcs-select-option>France</wcs-select-option>
        <wcs-select-option>Germany</wcs-select-option>
        <wcs-select-option>Japan</wcs-select-option>
    </wcs-select>
</wcs-form-field>
<p>Radio group</p>
<wcs-form-field>
    <wcs-radio-group name="SA">
      <wcs-radio label="SNCF" value="1"></wcs-radio>
      <wcs-radio label="SNCF Réseau" value="2"></wcs-radio>
      <wcs-radio label="SNCF Voyageurs" value="3"></wcs-radio>
      <wcs-radio label="Gares & Connexions" value="4"></wcs-radio>
    </wcs-radio-group>
</wcs-form-field>

<p>Text area :</p>
<wcs-form-field>
    <textarea placeholder="Type your message" rows="6" cols="80"></textarea>
</wcs-form-field>
```

## Label, hints and error

You can also add labels, hints and error messages.

```html
<wcs-form-field>
    <wcs-label>Is error ?</wcs-label>
    <wcs-switch id="error-switch-1" checked="true"></wcs-switch>
</wcs-form-field>
<br/>
<wcs-form-field>
    <wcs-label>Input with a hint</wcs-label>
    <input placeholder="L'input" required/>
    <wcs-hint>Normal hint</wcs-hint>
</wcs-form-field>

<wcs-form-field id="form-field-ex-1" is-error>
    <wcs-label>Error with hint</wcs-label>
    <input placeholder="L'input"/>
    <wcs-hint>Normal hint</wcs-hint>
    <wcs-error>Error message</wcs-error>
</wcs-form-field>

<wcs-form-field id="form-field-ex-2" is-error>
    <wcs-label>Input with an error message</wcs-label>
    <input placeholder="L'input"/>
    <wcs-error>What an error!</wcs-error>
</wcs-form-field>

<wcs-form-field is-error id="form-field-ex-3">
    <wcs-label>Radio group input label</wcs-label>
    <wcs-radio-group name="SA">
      <wcs-radio label="SNCF" value="1"></wcs-radio>
      <wcs-radio label="SNCF Réseau" value="2"></wcs-radio>
      <wcs-radio label="SNCF Voyageurs" value="3"></wcs-radio>
      <wcs-radio label="Gares & Connexions" value="4"></wcs-radio>
    </wcs-radio-group>
    <wcs-hint>Normal hint</wcs-hint>
    <wcs-error>Error message</wcs-error>
</wcs-form-field>

<script>
document.getElementById('error-switch-1').addEventListener('wcsChange', ($event) => {
    if($event.detail.checked) { 
        document.getElementById('form-field-ex-1').setAttribute('is-error', "true")
        document.getElementById('form-field-ex-2').setAttribute('is-error', "true")
        document.getElementById('form-field-ex-3').setAttribute('is-error', "true")
    } else {
        document.getElementById('form-field-ex-1').removeAttribute('is-error')
        document.getElementById('form-field-ex-2').removeAttribute('is-error')
        document.getElementById('form-field-ex-3').removeAttribute('is-error')
    }
});
</script>
```

## With a select and a button

Integrate it with a select and a button.

```html
<wcs-form-field>
    <wcs-select id="form-field-ex-3" slot="prefix" placeholder="Country" multiple>
        <wcs-select-option>France</wcs-select-option>
        <wcs-select-option>Germany</wcs-select-option>
        <wcs-select-option>Japan</wcs-select-option>
    </wcs-select>
    <input placeholder="Region"/>
    <wcs-button shape="square" slot="suffix" ripple="false">
        <i class="material-icons">search</i>
    </wcs-button>
</wcs-form-field>

<style>
#form-field-ex-3 {
    max-width: 200px;
    min-width: 200px;
}
</style>
```

## With a button

Only a button.

```html
<wcs-form-field>
    <input placeholder="Region"/>
    <wcs-button shape="square" slot="suffix" ripple="false">
        <i class="material-icons">search</i>
    </wcs-button>
</wcs-form-field>
```

## With a select

Or only a select.

```html
<wcs-form-field>
    <wcs-select slot="prefix" placeholder="Country" multiple>
        <wcs-select-option>France</wcs-select-option>
        <wcs-select-option>Germany</wcs-select-option>
        <wcs-select-option>Japan</wcs-select-option>
    </wcs-select>
    <input placeholder="Region"/>
</wcs-form-field>
```


<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description                                                                                                                                  | Type      | Default |
| --------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `isError` | `is-error` | Specifies whether the form field is in an error state. Displays the field border in red and the message contained in the wcs-error component | `boolean` | `false` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
