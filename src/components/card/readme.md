# Card

## Basic

```html
<wcs-card>
    <wcs-card-body>
        Card-ception
    </wcs-card-body>
</wcs-card>
```

## Without body

```html
<wcs-card>
    There is no padding !
</wcs-card>
```

## Flat cards

```html
<wcs-card mode="flat">
    <wcs-card-body>
        Flat card content
    </wcs-card-body>
    <wcs-divider></wcs-divider>
    <wcs-card-body>
        Another part of the card
    </wcs-card-body>
</wcs-card>

<wcs-card mode="flat">
    <wcs-card-body>
        Flat card content
        <wcs-divider style="margin: 8px 0 8px 0"></wcs-divider>
        Another part of the card
    </wcs-card-body>
</wcs-card>
```

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                 | Default    |
| -------- | --------- | ----------- | -------------------- | ---------- |
| `mode`   | `mode`    |             | `"flat" \| "raised"` | `'raised'` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
