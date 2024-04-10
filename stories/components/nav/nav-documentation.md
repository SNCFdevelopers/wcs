Add the `active` class on the nav-item corresponding to the current navigation element.

## Using `wcs-nav-item` with Angular and routerLink
When using `wcs-nav-item` in Angular projects with `routerLink`, it's important to add additional attributes to make the 
component accessible. Here are the steps to follow:

- Add the `role="link"` attribute to the nav-item component to indicate to screen readers that it is a link.

Here's an example code snippet to use `wcs-nav-item` with `routerLink` and make the component accessible:

```html
<wcs-nav-item text="Mes trains" routerLink="/route" role="link">
    <wcs-mat-icon icon="train"></wcs-mat-icon>
</wcs-nav-item>
```

If we want to use `wcs-mat-icon` as button without text in `wcs-nav-item`, we need to add a role image and an aria-label to make the component accessible : 

```html
<wcs-nav-item routerLink="/route" role="link">
    <wcs-mat-icon icon="train" role="img" aria-label="Mes trains"></wcs-mat-icon>
</wcs-nav-item>
```