# Modal

```html

<wcs-button onclick="getElementById('modal-1').setAttribute('show', true)" id="btn-modal-1-show">Afficher la boîte de dialogue</wcs-button>

<wcs-modal show="false" id="modal-1">
    <div slot="wcs-modal-header">Modal title</div>
    Voulez-vous quittez la page ? 
    <br/>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a cursus mi. Nullam et sem mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sollicitudin pellentesque libero nec elementum.
    <div slot="wcs-modal-actions">
        <wcs-button class="wcs-dark" mode="stroked">C'est non</wcs-button>
        <wcs-button>J'accepte</wcs-button>
    </div>
</wcs-modal>
```


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                  | Type      | Default |
| ---------- | ---------- | ---------------------------------------------------------------------------- | --------- | ------- |
| `backdrop` | `backdrop` | Specifies whether the component should display a backdrop on the entire page | `boolean` | `true`  |


## Methods

### `show() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
