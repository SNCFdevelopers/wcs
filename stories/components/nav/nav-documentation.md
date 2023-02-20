Add the `active` class on the nav-item corresponding to the current navigation element.

## Using `wcs-nav-item` with Angular and routerLink
When using `wcs-nav-item` in Angular projects with `routerLink`, it's important to add additional attributes to make the 
component accessible. Here are the steps to follow:

- Add the `role="link"` attribute to the nav-item component to indicate to screen readers that it is a link.

Here's an example code snippet to use `wcs-nav-item` with `routerLink` and make the component accessible:

```html
<wcs-nav-item text="Mes trains" routerLink="/route" role="link">
    <i class="material-icons">train</i>
</wcs-nav-item>
```
