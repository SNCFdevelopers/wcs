# List Item

<p>Standard lists can be used either with or without icons. Depending on the context, the list can have one or more actions (favourite, download, delete, etc.). Use standard lists with a unique action when each line has an action.</p>

<h2>Complex</h2>

```html
<wcs-list-item>
    <span slot="icon" class="material-icons">description</span>
    <div slot="title">Un titre</div>
    <div slot="actions">        
        <wcs-button shape="square" mode="stroked" class="wcs-secondary">
            <i class="material-icons">open_in_new</i>
        </wcs-button>
    </div>
    <wcs-list-item-properties>
        <wcs-list-item-property>Mise à jour le 4 avril 2017</wcs-list-item-property>
        <wcs-list-item-property>Entité : SNCF</wcs-list-item-property>
        <wcs-list-item-property>Agent : Marcel Patoulatchi</wcs-list-item-property>
    </wcs-list-item-properties>
    <div slot="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet libero scelerisque lacus feugiat, in elementum nisi mollis. Duis nulla ipsum, aliquet eu sapien nec, maximus finibus enim. Nullam quis dui hendrerit, semper quam ut, faucibus felis. Cras auctor lobortis tellus, vel volutpat quam ultrices vitae. Sed rhoncus volutpat venenatis. Etiam sed molestie magna. Vivamus congue odio et elit pellentesque, a dictum risus bibendum. Phasellus gravida auctor mattis.</div>
</wcs-list-item>
<wcs-list-item activated>
    <span slot="icon" class="material-icons">description</span>
    <div slot="title">Un titre</div>
    <div slot="actions">        
        <wcs-dropdown class="wcs-secondary">
            <span slot="placeholder">Actions</span>
            <wcs-dropdown-item>Action 1</wcs-dropdown-item>
            <wcs-dropdown-item>Action 2</wcs-dropdown-item>
            <wcs-dropdown-item>Action 3</wcs-dropdown-item>
        </wcs-dropdown>
    </div>
    <wcs-list-item-properties>
        <wcs-list-item-property>Mise à jour le 4 avril 2017</wcs-list-item-property>
        <wcs-list-item-property>Entité : SNCF</wcs-list-item-property>
        <wcs-list-item-property>Agent : Marcel Patoulatchi</wcs-list-item-property>
    </wcs-list-item-properties>
    <div slot="description">Lorem ipsum dolor sit amet.</div>
</wcs-list-item>
```

<h2>Variant</h2>
<p>All combinations are possible</p>

```html
<wcs-list-item>
    <div slot="title">Un titre</div>
    <div slot="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet libero scelerisque lacus feugiat.</div>
</wcs-list-item>

<wcs-list-item>
    <span slot="icon" class="material-icons">description</span>
    <div slot="title">Un titre</div>
    <div slot="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet libero scelerisque lacus feugiat.</div>
</wcs-list-item>

<wcs-list-item>
    <div slot="title">Un titre</div>
    <wcs-list-item-properties>
        <wcs-list-item-property>Mise à jour le 4 avril 2017</wcs-list-item-property>
        <wcs-list-item-property>Entité : SNCF</wcs-list-item-property>
        <wcs-list-item-property>Agent : Marcel Patoulatchi</wcs-list-item-property>
    </wcs-list-item-properties>
</wcs-list-item>
```

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                             | Type      | Default |
| ----------- | ----------- | ----------------------------------------------------------------------- | --------- | ------- |
| `activated` | `activated` | True if the item is active. Adds a background color that highlights it. | `boolean` | `false` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
