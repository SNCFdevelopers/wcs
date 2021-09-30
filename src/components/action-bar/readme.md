# Action bar

## With gutter

### With global gutter

```html
<div style="background: var(--wcs-light); padding: var(--wcs-padding);">
    <wcs-action-bar gutter>
        Titre
        <div slot="actions">
            <wcs-button mode="stroked" shape="small">Action</wcs-button>
            <wcs-dropdown class="wcs-primary" shape="small" style="margin-left: 8px;">
                <div slot="placeholder">Dropdown</div>
                <wcs-dropdown-item>Un</wcs-dropdown-item>
                <wcs-dropdown-item>Deux</wcs-dropdown-item>
                <wcs-dropdown-item>Trois</wcs-dropdown-item>
            </wcs-dropdown>    
        </div>
    </wcs-action-bar>
    <div style="height: 50px; background-color: var(--wcs-white)"><br/>Content</div>
</div>
```

### With tab gutter

The tabs gutter should be added for applications that use the communication design system but not for the business one.

```html
<div style="background: var(--wcs-light); padding: var(--wcs-padding);">
    <wcs-action-bar>
        Titre
        <div slot="actions">
            <wcs-button mode="stroked" shape="small">Action</wcs-button>
            <wcs-dropdown class="wcs-primary" shape="small" style="margin-left: 8px;">
                <div slot="placeholder">Dropdown</div>
                <wcs-dropdown-item>Un</wcs-dropdown-item>
                <wcs-dropdown-item>Deux</wcs-dropdown-item>
                <wcs-dropdown-item>Trois</wcs-dropdown-item>
            </wcs-dropdown>    
        </div>
        <wcs-tabs slot="tabs" headers-only id="tabs-custom-content" selected-key="custom-id1" gutter>
            <wcs-tab header="A header !" item-key="custom-id1"></wcs-tab>
            <wcs-tab header="Another !" item-key="custom-id2"></wcs-tab>
        </wcs-tabs>
    </wcs-action-bar>
    <div style="height: 50px; background-color: var(--wcs-white)"><br/>Content</div>
</div>
```

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                              | Type      | Default     |
| -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `gutter` | `gutter`  | Determines if the action bar should have a border at the bottom. You should not use this property if a gutter is already present on tabs | `boolean` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
