`wcs-card` can be used as a visual wrapper for a form, but the form should be placed directly inside `wcs-card-body`.

Use `wcs-card-content` for text only. This subcomponent is meant for concise written content, and it applies text-oriented layout and overflow behavior. It should not wrap rich interactive content.

Do:

```html
<wcs-card mode="flat">
  <wcs-card-body>
    <wcs-form-field>
      <wcs-label>Enter your name</wcs-label>
      <wcs-input placeholder="John Doe"></wcs-input>
      <wcs-error>
        <wcs-mat-icon icon="error" size="s"></wcs-mat-icon>
        <span>Your name is not valid</span>
      </wcs-error>
      <wcs-hint>A name is something that describes a person</wcs-hint>
    </wcs-form-field>
  </wcs-card-body>
</wcs-card>
```

Don't:

```html
<wcs-card mode="flat">
  <wcs-card-body>
    <wcs-card-content>
      <wcs-form-field>...</wcs-form-field>
    </wcs-card-content>
  </wcs-card-body>
</wcs-card>
```

This distinction keeps the card API explicit:

- `wcs-card-content` handles text content
- `wcs-card-body` hosts structured and interactive content