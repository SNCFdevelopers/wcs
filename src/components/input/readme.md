# Input

```html
<wcs-input></wcs-input>
```

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description                                                                                                                                                                                                                                                                                                                                          | Type                                                                                            | Default        |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------- |
| `accept`         | `accept`         | If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.                                                                                                              | `string`                                                                                        | `undefined`    |
| `autocapitalize` | `autocapitalize` | Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.                                                                                                                                                                                                                                    | `string`                                                                                        | `'off'`        |
| `autocomplete`   | `autocomplete`   | Indicates whether the value of the control can be automatically completed by the browser.                                                                                                                                                                                                                                                            | `"off" \| "on"`                                                                                 | `'off'`        |
| `autocorrect`    | `autocorrect`    | Whether auto correction should be enabled when the user is entering/editing the text value.                                                                                                                                                                                                                                                          | `"off" \| "on"`                                                                                 | `'off'`        |
| `autofocus`      | `autofocus`      | This Boolean attribute lets you specify that a form control should have input focus when the page loads.                                                                                                                                                                                                                                             | `boolean`                                                                                       | `false`        |
| `background`     | `background`     |                                                                                                                                                                                                                                                                                                                                                      | `"normal" \| "white"`                                                                           | `'normal'`     |
| `disabled`       | `disabled`       | If `true`, the user cannot interact with the input.                                                                                                                                                                                                                                                                                                  | `boolean`                                                                                       | `false`        |
| `inputmode`      | `inputmode`      | A hint to the browser for which keyboard to display. This attribute applies when the value of the type attribute is `"text"`, `"password"`, `"email"`, or `"url"`. Possible values are: `"verbatim"`, `"latin"`, `"latin-name"`, `"latin-prose"`, `"full-width-latin"`, `"kana"`, `"katakana"`, `"numeric"`, `"tel"`, `"email"`, `"url"`.            | `string`                                                                                        | `undefined`    |
| `max`            | `max`            | The maximum value, which must not be less than its minimum (min attribute) value.                                                                                                                                                                                                                                                                    | `string`                                                                                        | `undefined`    |
| `maxlength`      | `maxlength`      | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.                                                                                                                                                                     | `number`                                                                                        | `undefined`    |
| `min`            | `min`            | The minimum value, which must not be greater than its maximum (max attribute) value.                                                                                                                                                                                                                                                                 | `string`                                                                                        | `undefined`    |
| `minlength`      | `minlength`      | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.                                                                                                                                                                     | `number`                                                                                        | `undefined`    |
| `multiple`       | `multiple`       | If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored.                                                                                                                                                                                          | `boolean`                                                                                       | `undefined`    |
| `name`           | `name`           | The name of the control, which is submitted with the form data.                                                                                                                                                                                                                                                                                      | `string`                                                                                        | `this.inputId` |
| `pattern`        | `pattern`        | A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored. | `string`                                                                                        | `undefined`    |
| `required`       | `required`       | If `true`, the user must fill in a value before submitting a form.                                                                                                                                                                                                                                                                                   | `boolean`                                                                                       | `false`        |
| `size`           | `size`           | The initial size of the control. This value is in pixels unless the value of the type attribute is `"text"` or `"password"`, in which case it is an integer number of characters. This attribute applies only when the `type` attribute is set to `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.       | `number`                                                                                        | `undefined`    |
| `spellcheck`     | `spellcheck`     | If `true`, the element will have its spelling and grammar checked.                                                                                                                                                                                                                                                                                   | `boolean`                                                                                       | `false`        |
| `step`           | `step`           | Works with the min and max attributes to limit the increments at which a value can be set. Possible values are: `"any"` or a positive floating point number.                                                                                                                                                                                         | `string`                                                                                        | `undefined`    |
| `type`           | `type`           | The type of control to display. The default type is text.                                                                                                                                                                                                                                                                                            | `"date" \| "email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "time" \| "url"` | `'text'`       |
| `value`          | `value`          |                                                                                                                                                                                                                                                                                                                                                      | `string`                                                                                        | `''`           |


## Events

| Event       | Description | Type                                  |
| ----------- | ----------- | ------------------------------------- |
| `wcsChange` |             | `CustomEvent<InputChangeEventDetail>` |


## Methods

### `getInputElement() => Promise<HTMLInputElement>`

Returns the native `<input>` element used under the hood.

#### Returns

Type: `Promise<HTMLInputElement>`



### `setFocus() => Promise<void>`

Sets focus on the specified `wcs-input`. Use this method instead of the global
`input.focus()`.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
