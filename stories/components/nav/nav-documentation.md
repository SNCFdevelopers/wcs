The nav component is a container for navigation links to other pages of the website.  
Add the `active` class on the nav-item corresponding to the current navigation element.

## How to use ❓

<details>
    <summary>**Using `wcs-nav-item` with Angular and routerLink** _(click to expand)_</summary>
When using `wcs-nav-item` in Angular projects with `routerLink`, it's important to add additional attributes to make the 
component functional and accessible :

1. `routerLinkActive="active"` on every nested `<a>` to add the `active` class on the current link (for styling), according to the [Angular RouterLinkActive API](https://angular.io/api/router/RouterLink)
2. `routerLink="/your-route"` on every nested `<a>` for Angular to add the href attributes, according to the [Angular RouterLink API](https://angular.io/api/router/RouterLink)
3. Remember that `routerLink` from Angular **actually replaces** the use of the `href` attribute.
4. For the `aria-current` attribute, creating a custom Angular directive is advised : [see an example](https://github.com/angular/angular/issues/35051#issuecomment-823633501)

**Angular template example** :

```html
<wcs-nav aria-label="Main menu">
⠀⠀⠀⠀<wcs-nav-item>
⠀⠀⠀⠀    <a routerLink="/example" routerLinkActive="active">
⠀⠀⠀⠀        <wcs-mat-icon icon="train"></wcs-mat-icon>
⠀⠀⠀⠀        <span>Example</span>
⠀⠀⠀⠀    </a>
⠀⠀⠀⠀</wcs-nav-item>
⠀⠀⠀⠀<wcs-nav-item slot="bottom">
⠀⠀⠀⠀    <a routerLink="/about" routerLinkActive="active">
⠀⠀⠀⠀        <wcs-mat-icon icon="info"></wcs-mat-icon>
⠀⠀⠀⠀        <span>Info</span>
⠀⠀⠀⠀    </a>
⠀⠀⠀⠀</wcs-nav-item>
</wcs-nav>
```

</details>
<br/>
<details>
    <summary>**Using `wcs-nav-item` with React and ReactRouter** _(click to expand)_</summary>
When using `wcs-nav-item` in React projects with a library like [ReactRouter](https://reactrouter.com/en/main),
[wouter](https://github.com/molefrog/wouter), ... it's important to add additional attributes to make the 
component functional and accessible :

1. Prefer a nested `NavLink` component from ReactRouter to generate an anchor element with correct attributes in your DOM 👉 [See API](https://reactrouter.com/en/main/components/nav-link)
2. Remember that the `to` attribute from ReactRouter **actually replaces** the use of the `href` attribute.
3. Prefer `NavLink` over `Link` for accessibility because it adds the automatic support of [aria-current](https://reactrouter.com/en/main/components/nav-link#aria-current)

**React template example** :

```html
<WcsNav aria-label="Main menu">
        <WcsNavItem>
            <NavLink to="/example">
                <WcsMatIcon icon="train"></WcsMatIcon>
                <span>Example</span>
            </NavLink>
        </WcsNavItem>
        <WcsNavItem slot="bottom">
            <NavLink to="/about">
                <WcsMatIcon icon="info"></WcsMatIcon>
                <span>About</span>
            </NavLink>
        </WcsNavItem>
</WcsNav>
```

</details>

## Accessibility guidelines 💡
 
> 1. Always make sure the `href` is corresponding to a **real page** of your website to indicate the target of the link
> 2. Don't forget to handle the `aria-current="page"` attribute on the currently active link
> 3. If we want to use a `wcs-mat-icon` as a button **without text** in a `wcs-nav-item`, we need to add a role image and an aria-label to make the component accessible to screen readers :
    > ```html
    > <wcs-nav-item>
    >     <a href="/trains">
    >         <wcs-mat-icon icon="train" role="img" aria-label="My trains"></wcs-mat-icon>
    >     </a>
    > </wcs-nav-item>
    > ```
> 4. In some business project, it's common to **add a bottom `wcs-nav-item`** to **open a modal** displaying useful information. **To ensure accessibility**, you need to **use a native `button` within the `wcs-nav-item`**
    > ```html
    > <wcs-nav-item slot="bottom">
    >     <button id="support-button" onclick="openModal()">
    >         <wcs-mat-icon icon="support"></wcs-mat-icon>
    >         <span>Support</span>
    >     </button>
    > </wcs-nav-item>
    > ```
    > ⚠️ **Do not put `aria-current="page"` attribute on the button. It's just an action button to open a modal. If you have to change the page, use `a` as slotted element** !
    > When using the `wcs-modal` component, ensure you specify the `modal-trigger-controls-id` attribute by setting it to the id of the trigger button. In the example above, you have to add `modal-trigger-controls-id="support-button"` on the modal to properly associate it with the trigger button.
