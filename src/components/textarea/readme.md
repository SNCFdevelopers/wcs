# Textarea



<!-- Auto Generated Below -->


## Overview

Mainly inspired from Ionic Textarea Component.

## Accessibility guidelines 💡
> - If you use wcs-textarea outside a wcs-form-field, you have to manage the label and the error message yourself.
> You can use the `aria-label` attribute to provide a label for screen readers but adds no visual label.

## Properties

| Property         | Attribute        | Description                                                                                                                                                                                                                                                                                                                                 | Type                                                                                  | Default        |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------- |
| `autoGrow`       | `auto-grow`      | If `true`, the element height will increase based on the value.                                                                                                                                                                                                                                                                             | `boolean`                                                                             | `false`        |
| `autocapitalize` | `autocapitalize` | Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.                                                                                                                                                                                                                           | `string`                                                                              | `'none'`       |
| `autofocus`      | `autofocus`      | This Boolean attribute lets you specify that a form control should have input focus when the page loads.                                                                                                                                                                                                                                    | `boolean`                                                                             | `false`        |
| `cols`           | `cols`           | The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.   Note : at the moment, modifying the width is only possible if you add some custom CSS to the component, for example by overriding the `width` CSS property. See the Resize section for an example on how to do it. | `number`                                                                              | `undefined`    |
| `debounce`       | `debounce`       | Set the amount of time, in milliseconds, to wait to trigger the `wcsInput` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.                                                                                                                                                                      | `number`                                                                              | `0`            |
| `disabled`       | `disabled`       | If `true`, the user cannot interact with the textarea.                                                                                                                                                                                                                                                                                      | `boolean`                                                                             | `false`        |
| `enterkeyhint`   | `enterkeyhint`   | A hint to the browser for which enter key to display.                                                                                                                                                                                                                                                                                       | `"done" \| "enter" \| "go" \| "next" \| "previous" \| "search" \| "send"`             | `undefined`    |
| `icon`           | `icon`           | Name of the material icon to add to the input                                                                                                                                                                                                                                                                                               | `string`                                                                              | `undefined`    |
| `inputmode`      | `inputmode`      | A hint to the browser for which keyboard to display.                                                                                                                                                                                                                                                                                        | `"decimal" \| "email" \| "none" \| "numeric" \| "search" \| "tel" \| "text" \| "url"` | `undefined`    |
| `maxlength`      | `maxlength`      | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.                                                                                                                                                            | `number`                                                                              | `undefined`    |
| `minlength`      | `minlength`      | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.                                                                                                                                                            | `number`                                                                              | `undefined`    |
| `name`           | `name`           | The name of the control, which is submitted with the form data.                                                                                                                                                                                                                                                                             | `string`                                                                              | `this.inputId` |
| `placeholder`    | `placeholder`    | Instructional text that shows before the input has a value.                                                                                                                                                                                                                                                                                 | `string`                                                                              | `undefined`    |
| `readonly`       | `readonly`       | If `true`, the user cannot modify the value.                                                                                                                                                                                                                                                                                                | `boolean`                                                                             | `false`        |
| `required`       | `required`       | If `true`, the user must fill in a value before submitting a form.                                                                                                                                                                                                                                                                          | `boolean`                                                                             | `false`        |
| `resize`         | `resize`         | Indicates how the textarea should be resizable.   Note : at the moment horizontal resizing is only possible if you add custom CSS to the component, see the Resize section for an example.                                                                                                                                                  | `"both" \| "horizontal" \| "none" \| "vertical"`                                      | `undefined`    |
| `rows`           | `rows`           | The number of visible text lines for the control.                                                                                                                                                                                                                                                                                           | `number`                                                                              | `undefined`    |
| `spellcheck`     | `spellcheck`     | If `true`, the element will have its spelling and grammar checked.                                                                                                                                                                                                                                                                          | `boolean`                                                                             | `false`        |
| `state`          | `state`          | Specifies the state of the input. By default the input is in an initial state but you can set it to 'error' state if the data given by the user is not valid.                                                                                                                                                                               | `"error" \| "initial"`                                                                | `'initial'`    |
| `value`          | `value`          | The value of the textarea.                                                                                                                                                                                                                                                                                                                  | `string`                                                                              | `''`           |
| `wrap`           | `wrap`           | Indicates how the control wraps text.                                                                                                                                                                                                                                                                                                       | `"hard" \| "off" \| "soft"`                                                           | `undefined`    |


## Events

| Event       | Description                                                                                               | Type                                     |
| ----------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `wcsBlur`   | Emitted when the input loses focus.                                                                       | `CustomEvent<FocusEvent>`                |
| `wcsChange` | Emitted when the input value has changed.- See https://developer.mozilla.org/en-US/docs/Web/Events/change | `CustomEvent<TextareaChangeEventDetail>` |
| `wcsFocus`  | Emitted when the input has focus.                                                                         | `CustomEvent<FocusEvent>`                |
| `wcsInput`  | Emitted when a keyboard input occurred. See https://developer.mozilla.org/en-US/docs/Web/Events/input     | `CustomEvent<KeyboardEvent>`             |


## Methods

### `fitContent() => Promise<void>`

This method make the textarea automatically adopt the size of the content without a scroll bar

#### Returns

Type: `Promise<void>`



### `getInputElement() => Promise<HTMLTextAreaElement>`

Returns the native `<textarea>` element used under the hood.

#### Returns

Type: `Promise<HTMLTextAreaElement>`



### `setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) => Promise<void>`



#### Parameters

| Name    | Type                         | Description |
| ------- | ---------------------------- | ----------- |
| `attr`  | `"role" \| `aria-${string}`` |             |
| `value` | `string`                     |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [wcs-mat-icon](../mat-icon)

### Graph
```mermaid
graph TD;
  wcs-textarea --> wcs-mat-icon
  style wcs-textarea fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
