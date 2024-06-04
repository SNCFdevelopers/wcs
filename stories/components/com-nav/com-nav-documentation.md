*Part of communication design system*

The com-nav component is a container for navigation links to external or internal pages of the website.

## How to use ❓

<details>
    <summary>**Using `wcs-com-nav-item` with Angular and routerLink** _(click to expand)_</summary>
When using `wcs-com-nav-item` in Angular projects with `routerLink`, 
it's important to add additional attributes to make the component functional and accessible :

1. `routerLinkActive="active"` on every nested `<a>` to add the `active` class on the current link (for styling), according to the [Angular RouterLinkActive API](https://angular.io/api/router/RouterLink)
2. `routerLink="/your-route"` on every nested `<a>` for Angular to add the href attributes, according to the [Angular RouterLink API](https://angular.io/api/router/RouterLink)
3. Remember that `routerLink` from Angular **actually replaces** the use of the `href` attribute.
4. For the `aria-current` attribute, creating a custom Angular directive is advised : [see an example](https://github.com/angular/angular/issues/35051#issuecomment-823633501)

**Angular template example** :

```html
<wcs-com-nav app-name="Application" aria-label="Newly Supported">
        <wcs-com-nav-item>
            <a routerLink="/resource" target="_blank">Ressource externe</a>
        </wcs-com-nav-item>
        <wcs-com-nav-submenu label="Sous menu" panel-title="Sous Menu" panel-description="Autre sous-menu avec catégories">
            <wcs-com-nav-item>
                <a routerLink="/link">Un lien</a>
            </wcs-com-nav-item>
            <wcs-com-nav-category label="Une catégorie">
                <wcs-com-nav-item>
                    <a routerLink="/another">Un sous-lien</a>
                 </wcs-com-nav-item>
            </wcs-com-nav-category>
        </wcs-com-nav-submenu>
</wcs-com-nav>
```

</details>
<br/>
<details>
    <summary>**Using `wcs-com-nav-item` with React and ReactRouter** _(click to expand)_</summary>
When using `wcs-com-nav-item` in React projects with a library like [ReactRouter](https://reactrouter.com/en/main),
[wouter](https://github.com/molefrog/wouter), ... it's important to add additional attributes to make the 
component functional and accessible :

1. Prefer a nested `NavLink` component from ReactRouter to generate an anchor element with correct attributes in your DOM 👉 [See API](https://reactrouter.com/en/main/components/nav-link)
2. Remember that the `to` attribute from ReactRouter **actually replaces** the use of the `href` attribute.
3. Prefer `NavLink` over `Link` for accessibility because it adds the automatic support of [aria-current](https://reactrouter.com/en/main/components/nav-link#aria-current)

**React template example** :

```html
<WcsComNav app-name="Application" aria-label="Newly Supported">
        <WcsComNavItem>
            <NavLink to="/resource">
                Ressource externe
            </NavLink>
        </WcsComNavItem>
        <WcsComNavSubmenu label="Sous menu" panel-title="Sous Menu" panel-description="Autre sous-menu avec catégories">
            <WcsComNavItem>
                <NavLink to="/link">Un lien</NavLink>
            </WcsComNavItem>
            <WcsComNavCategory label="Une catégorie">
                <WcsComNavItem>
                    <NavLink to="/another">Un sous-lien</NavLink>
                </WcsComNavItem>
            </WcsComNavCategory>
        </WcsComNavSubmenu>
</WcsComNav>
```

</details>

## Accessibility guidelines 💡

- Always make sure the href is corresponding to a real page of your website to indicate the target of the link
- Don't forget to handle the aria-current="page" attribute on the currently active link
- By providing `aria-label` to `wcs-com-nav` you can describe what is the name of the menu bar and the name of the button which opens the mobile menu overlay