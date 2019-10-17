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

## Lazy loaded

```html
<wcs-card>
    <wcs-tabs id="lazy-loaded-tabs">
        <wcs-tab header="Premier">Premier contenu</wcs-tab>
    <wcs-tabs>
</wcs-card>
```
<wcs-button id="lazy-loaded-tab-button" mode="stroked" class="primary">Add tab</wcs-button>

<script>
    const tabs = document.querySelector('#lazy-loaded-tabs');
    const tabButton = document.querySelector('#lazy-loaded-tab-button');
    let tabID = 4;
    tabButton.addEventListener('click', () => {
        const opt = document.createElement('wcs-tab');
        opt.setAttribute('header', tabID++)
        opt.appendChild(document.createTextNode(tabID.toString()));
        tabs.appendChild(opt);
    });
</script>
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

| Property        | Attribute        | Description                              | Type                           | Default   |
| --------------- | ---------------- | ---------------------------------------- | ------------------------------ | --------- |
| `align`         | `align`          | Tab headers alignment.                   | `"center" \| "end" \| "start"` | `'start'` |
| `selectedIndex` | `selected-index` | Current selected tab index. Starts at 0. | `number`                       | `0`       |


## Events

| Event       | Description                           | Type                             |
| ----------- | ------------------------------------- | -------------------------------- |
| `tabChange` | Emitted when the selected tab change. | `CustomEvent<WcsTabChangeEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
