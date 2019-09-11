# Tabs

## Basic

```html
<wcs-card>
    <wcs-tabs>
        <wcs-tab header="A header !">
            Premier contenu
        </wcs-tab>
        <wcs-tab header="Another !">
            Deuxième contenu
        </wcs-tab>
    </wcs-tabs>
</wcs-card>
```

## Scrollable tabs

```html
<wcs-card>
    <wcs-tabs>
        <wcs-tab header="Premier">Premier contenu</wcs-tab>
        <wcs-tab header="Deuxième">Deuxième contenu</wcs-tab>
        <wcs-tab header="Troisième">Troisième contenu</wcs-tab>
        <wcs-tab header="Quatrième">Quatrième contenu</wcs-tab>
        <wcs-tab header="Cinquième">Cinquième contenu</wcs-tab>
        <wcs-tab header="Premier">Premier contenu</wcs-tab>
        <wcs-tab header="Deuxième">Deuxième contenu</wcs-tab>
        <wcs-tab header="Troisième">Troisième contenu</wcs-tab>
        <wcs-tab header="Quatrième">Quatrième contenu</wcs-tab>
        <wcs-tab header="Cinquième">Cinquième contenu</wcs-tab>
        <wcs-tab header="Premier">Premier contenu</wcs-tab>
        <wcs-tab header="Deuxième">Deuxième contenu</wcs-tab>
        <wcs-tab header="Troisième">Troisième contenu</wcs-tab>
        <wcs-tab header="Quatrième">Quatrième contenu</wcs-tab>
        <wcs-tab header="Cinquième">Cinquième contenu</wcs-tab>
        <wcs-tab header="Premier">Premier contenu</wcs-tab>
        <wcs-tab header="Deuxième">Deuxième contenu</wcs-tab>
        <wcs-tab header="Troisième">Troisième contenu</wcs-tab>
        <wcs-tab header="Quatrième">Quatrième contenu</wcs-tab>
        <wcs-tab header="Cinquième">Cinquième contenu</wcs-tab>
    </wcs-tabs>
</wcs-card>
```

<style>
    wcs-tab {
        margin: 16px;
    }

    .tab-container {
        /** So focused background doesn't overflow on the border radius of the cards */
        overflow-x: hidden;
    }
</style>

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                | Type                           | Default   |
| --------------- | ---------------- | -------------------------- | ------------------------------ | --------- |
| `align`         | `align`          |                            | `"center" \| "end" \| "start"` | `'start'` |
| `selectedIndex` | `selected-index` | Current selected tab index | `number`                       | `0`       |


## Events

| Event           | Description                          | Type                              |
| --------------- | ------------------------------------ | --------------------------------- |
| `wcsTabsChange` | Emitted when the selected tab change | `CustomEvent<WcsTabsChangeEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
