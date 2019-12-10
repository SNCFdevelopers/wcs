# Form field

Form fields component wraps the native input element and add some more functionnality on top of it.

## Wrapped component

You can use the `form-field` to wrap an `input` or a `wcs-select`.

```html
<wcs-form-field>
    <input placeholder="John doe"/>
</wcs-form-field>

<wcs-form-field>
    <wcs-select placeholder="Select a country" required>
        <wcs-select-option>France</wcs-select-option>
        <wcs-select-option>Germany</wcs-select-option>
        <wcs-select-option>Japan</wcs-select-option>
    </wcs-select>
</wcs-form-field>
```

## Label, hints and error

You can also add labels, hints and error messages.

```html
<wcs-form-field>
    <wcs-label>Input with a hint</wcs-label>
    <input placeholder="L'input" required/>
    <wcs-hint>Normal hint</wcs-hint>
</wcs-form-field>

<wcs-form-field>
    <wcs-label>Input with a hint</wcs-label>
    <input placeholder="L'input" required/>
    <wcs-hint>Smaller hint</wcs-hint>
</wcs-form-field>

<wcs-form-field>
    <wcs-label>Input with an error mesage</wcs-label>
    <input placeholder="L'input"/>
    <wcs-error>What an error!</wcs-error>
</wcs-form-field>
```

## With a select and a button

Integrate it with a select and a button.

```html
<wcs-form-field>
    <wcs-select slot="prefix" placeholder="Country" multiple>
        <wcs-select-option>France</wcs-select-option>
        <wcs-select-option>Germany</wcs-select-option>
        <wcs-select-option>Japan</wcs-select-option>
    </wcs-select>
    <input placeholder="Region"/>
    <wcs-button shape="square" slot="suffix" ripple="false">
        <i class="material-icons">search</i>
    </wcs-button>
</wcs-form-field>
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


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
