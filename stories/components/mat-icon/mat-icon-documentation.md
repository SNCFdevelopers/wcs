A component used to display a [Material Icon](https://fonts.google.com/icons). Can be useful when used in wcs-grid.

When used directly in another Web Component, the global CSS stylesheet doesn't apply to material-icons.
In this case you can use the Mat-icon with its integrated material stylesheet.

To make this component work you must include the following material icon fonts:
- Material Icons
- Material Icons Outlined
- Material Icons Two Tone
- Material Icons Round
- Material Icons Sharp

Here is an example of the font face declaration, you can add these lines in the global stylesheet of your project :

```css
@font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
}
@font-face {
    font-family: 'Material Icons Outlined';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialiconsoutlined/v108/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUce.woff2) format('woff2');
}
@font-face {
    font-family: 'Material Icons Two Tone';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialiconstwotone/v111/hESh6WRmNCxEqUmNyh3JDeGxjVVyMg4tHGctNCu0.woff2) format('woff2');
}
@font-face {
    font-family: 'Material Icons Round';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialiconsround/v107/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmP.woff2) format('woff2');
}
@font-face {
    font-family: 'Material Icons Sharp';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialiconssharp/v108/oPWQ_lt5nv4pWNJpghLP75WiFR4kLh3kvmvR.woff2) format('woff2');
}
```