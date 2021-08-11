# Communication Navbar

This component is the implementation of the navigation bar dedicated to communication design.

```html

<wcs-galactic text="NomSuperApp est un site SNCF">
    <wcs-galactic-menu text="TOUT SNCF">
        <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">CGU</a></div>
        <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">À Propos</a>
        </div>
        <div style="margin-bottom: 8px"><a href="#" style="text-decoration: none; color: var(--wcs-white)">Un autre
            lien</a></div>
        <wcs-button shape="small">Un bouton</wcs-button>
    </wcs-galactic-menu>
</wcs-galactic>
<wcs-com-nav app-name="#DIGITALSNCF">
    <wcs-com-nav-submenu label="Sous menu" panel-title="Sous Menu"
                         panel-description="Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.">
        <a href="#">Loisirs & Tourisme</a>
        <a href="#">Toutes les lignes</a>
        <a href="#">Services mobiles</a>
        <a href="#">Au quotidien</a>
        <a href="#">Le réseau</a>
    </wcs-com-nav-submenu>
    <wcs-com-nav-submenu label="Autre sous menu" panel-title="Autre Sous Menu"
                         panel-description="Un autre sous menu avec des catégories. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.">
        <a href="#">Le réseau</a>
        <wcs-com-nav-category label="Une catégorie">
            <a href="#">Services mobiles text plus long</a>
            <a href="#">Au quotidien</a>
            <a href="#">Le réseau</a>
        </wcs-com-nav-category>
        <wcs-com-nav-category label="Une catégorie">
            <a href="#">1</a>
            <a href="#">2</a>
        </wcs-com-nav-category>
    </wcs-com-nav-submenu>
    <a href="https://sncf.com" target="_blank">Ressource externe</a>
    <div slot="actions">
        <wcs-button mode="clear" class="wcs-dark">Connexion</wcs-button>
    </div>
</wcs-com-nav>
<div style="height: 300px; width: 100%; display: flex; justify-content:center; align-items: center; text-align: center">
    Contenu du site
</div>
```

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description | Type     | Default     |
| --------- | ---------- | ----------- | -------- | ----------- |
| `appName` | `app-name` |             | `string` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
