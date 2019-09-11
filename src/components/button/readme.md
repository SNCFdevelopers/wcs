# Button


### Basic

```html
<wcs-button class="wcs-primary">Primary</wcs-button>
<wcs-button class="wcs-secondary">Secondary</wcs-button>
<wcs-button class="wcs-success">Success</wcs-button>
<wcs-button class="wcs-warning">Warning</wcs-button>
<wcs-button class="wcs-danger">Danger</wcs-button>
<wcs-button class="wcs-info">Info</wcs-button>
<wcs-button class="wcs-dark">Dark</wcs-button>
<wcs-button class="wcs-light">Light</wcs-button>
<wcs-button class="wcs-primary" disabled>Disabled</wcs-button>
```

### Clear

```html
<wcs-button clear class="wcs-primary">Primary</wcs-button>
<wcs-button clear class="wcs-secondary">Secondary</wcs-button>
<wcs-button clear class="wcs-success">Success</wcs-button>
<wcs-button clear class="wcs-warning">Warning</wcs-button>
<wcs-button clear class="wcs-danger">Danger</wcs-button>
<wcs-button clear class="wcs-info">Info</wcs-button>
<wcs-button clear class="wcs-dark">Dark</wcs-button>
<wcs-button class="wcs-primary" clear disabled>Disabled</wcs-button>
```

### Stroked

```html
<wcs-button stroked class="wcs-primary">Primary</wcs-button>
<wcs-button stroked class="wcs-secondary">Secondary</wcs-button>
<wcs-button stroked class="wcs-success">Success</wcs-button>
<wcs-button stroked class="wcs-warning">Warning</wcs-button>
<wcs-button stroked class="wcs-danger">Danger</wcs-button>
<wcs-button stroked class="wcs-info">Info</wcs-button>
<wcs-button stroked class="wcs-dark">Dark</wcs-button>
<wcs-button class="wcs-primary" stroked disabled>Disabled</wcs-button>
```

### Round

```html
<wcs-button mode="round" class="wcs-primary">
    <i class="material-icons">accessibility_new</i>
</wcs-button>
<wcs-button mode="round" class="wcs-primary" clear>
    <i class="material-icons">accessibility_new</i>
</wcs-button>
<wcs-button mode="round" class="wcs-primary" stroked>
    <i class="material-icons">accessibility_new</i>
</wcs-button>
<wcs-button mode="round" class="wcs-primary" disabled>
    <i class="material-icons">accessibility_new</i>
</wcs-button>
```

### Icon only

```html
<wcs-button class="wcs-primary" mode="icon-only">
    <i class="material-icons">accessibility_new</i>
</wcs-button>
<wcs-button class="wcs-primary" clear mode="icon-only">
    <i class="material-icons">accessibility_new</i>
</wcs-button>
<wcs-button class="wcs-primary" stroked mode="icon-only">
    <i class="material-icons">accessibility_new</i>
</wcs-button>
<wcs-button class="wcs-primary" disabled mode="icon-only">
    <i class="material-icons">accessibility_new</i>
</wcs-button>
```

### Link

```html
<wcs-button class="wcs-primary" href="#">Un lien !</wcs-button>
```

### Small

```html
<wcs-button class="wcs-primary" mode="small">Small</wcs-button>
<wcs-button class="wcs-primary" clear mode="small">Small</wcs-button>
<wcs-button class="wcs-primary" stroked mode="small">Small</wcs-button>
<wcs-button class="wcs-primary" stroked disabled mode="small">Disabled</wcs-button>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                         | Type                                         | Default     |
| ---------- | ---------- | ------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `disabled` | `disabled` | Specify wether the button is disabled or not.                       | `boolean`                                    | `false`     |
| `href`     | `href`     | Set a URL to point to. If specified use a `a` tag instead of `btn`. | `string`                                     | `undefined` |
| `mode`     | `mode`     | This attribute specify the appearance of the button.                | `"clear" \| "plain" \| "stroked"`            | `'plain'`   |
| `ripple`   | `ripple`   | Specify wether the button should have a ripple effect or not.       | `boolean`                                    | `true`      |
| `shape`    | `shape`    | Specify the shape of the button.                                    | `"normal" \| "round" \| "small" \| "square"` | `'normal'`  |
| `type`     | `type`     | Specify the button type.                                            | `"button" \| "submit"`                       | `'button'`  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
