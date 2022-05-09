For simple customization needs, wcs generates a css part on each cell. All cells of a same column have the same css part
whose name is prefixed with the `path` attribute of the column concatenated with `-column` (e.g. `email-column`).

If you need more customization, you can add css parts yourself in the formatter function and then use them in your CSS sheet.

For more information on CSS part, see [https://developer.mozilla.org/fr/docs/Web/CSS/::part](https://developer.mozilla.org/fr/docs/Web/CSS/::part).