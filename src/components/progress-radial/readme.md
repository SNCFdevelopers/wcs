# Progress radial

## Basic

```html
<wcs-progress-radial value="20"></wcs-progress-radial>
```

## Radial with label

```html
<wcs-progress-radial value="20" show-label></wcs-progress-radial>
```

<wcs-button mode="stroked" class="wcs-primary" style="position: absolute; right: 16px; bottom: 16px;"
    id="progress-radial-button">
    Change values
</wcs-button>

<script>
    document.querySelector('#progress-radial-button').addEventListener('click', () => {
        document.querySelectorAll('wcs-progress-radial')
            .forEach(p => p.setAttribute('value', Math.ceil(Math.random() * 100)));
    });
</script>


<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type      | Default |
| ----------- | ------------ | ----------- | --------- | ------- |
| `showLabel` | `show-label` |             | `boolean` | `false` |
| `size`      | `size`       |             | `number`  | `120`   |
| `value`     | `value`      |             | `number`  | `0`     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
