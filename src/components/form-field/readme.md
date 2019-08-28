# Form field

## Input only
```html
<wcs-form-field>
    <input placeholder="L'input"/>
</wcs-form-field>
```

## With a select and a button

```html
<wcs-form-field>
    <wcs-select slot="prefix" placeholder="Le select" multiple>
        <wcs-select-option value="1">One</wcs-select-option>
        <wcs-select-option value="2">Two</wcs-select-option>
        <wcs-select-option value="3">Three</wcs-select-option>
    </wcs-select>
    <input placeholder="L'input"/>
    <wcs-button shape="square" slot="suffix" ripple="false">
        <i class="material-icons">search</i>
    </wcs-button>
</wcs-form-field>
```

## With a button

```html
<wcs-form-field>
    <input placeholder="L'input"/>
    <wcs-button shape="square" slot="suffix" ripple="false">
        <i class="material-icons">search</i>
    </wcs-button>
</wcs-form-field>
```

## With a select

```html
<wcs-form-field>
    <wcs-select slot="prefix" placeholder="Le select" multiple>
        <wcs-select-option value="1">One</wcs-select-option>
        <wcs-select-option value="2">Two</wcs-select-option>
        <wcs-select-option value="3">Three</wcs-select-option>
    </wcs-select>
    <input placeholder="L'input"/>
</wcs-form-field>
```

<!-- Auto Generated Below -->


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
