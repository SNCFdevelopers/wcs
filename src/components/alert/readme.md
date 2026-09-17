# wcs-alert



<!-- Auto Generated Below -->


## Overview

Alerts are used to communicate a state or an action that has been performed.
It has to be used conjunction with the `wcs-alert-drawer` component, or you can use it independently by taking care of
the alert visibility

## Usage guidelines

**Success**
- When to use: to confirm that an action completed successfully; when feedback is necessary to reassure the user.
- When to avoid: for obvious or repetitive actions (e.g. frequent auto-save); if no user action triggered the state.
- Content: clearly state what succeeded; emphasize the outcome, not the system.
- Tone: positive, understated, reassuring, with no exaggeration or jargon.

**Information**
- When to use: to explain a state, a rule or how something works; to warn without urgency.
- When to avoid: if the information can be integrated directly into the interface; to report an error or a risk.
- Content: factual and neutral, giving context without overloading.
- Tone: calm, pedagogical, with no alarming character.

**Warning**
- When to use: to signal a potential risk or an action with consequences; before a reversible or partially reversible action.
- When to avoid: for errors that already happened; for cases without real impact.
- Content: clearly explain the risk and indicate what the user can do to avoid it.
- Tone: serious but not anxiety-inducing, prevention-oriented.

**Critical (error)**
- When to use: when an action has failed; in case of data loss, a blocking issue or a system error; for irreversible actions.
- When to avoid: for minor or recoverable errors without impact.
- Content: state what didn't work, explain why if possible, and suggest a solution.
- Tone: clear, empathetic, holding the system accountable rather than the user, never accusatory.

## Properties

| Property          | Attribute           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Type                                                 | Default     |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | ----------- |
| `intent`          | `intent`            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `"error" \| "information" \| "success" \| "warning"` | `'success'` |
| `show`            | `show`              | Controls the visibility state of the alert. This property is exposed to allow control of the alert's display state and animation timing: - Used by wcs-alert-drawer to coordinate exit animations when the alert is dismissed - Can be used directly for custom implementations (though using wcs-alert-drawer is recommended) - When set to false, it triggers the exit animation if implemented  Note: While direct usage is possible for custom implementations, it's recommended to use wcs-alert-drawer for consistent alert management and animations. | `boolean`                                            | `true`      |
| `showProgressBar` | `show-progress-bar` |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `boolean`                                            | `false`     |
| `timeout`         | `timeout`           | Time duration of the alert visibility  5000ms by default If 0, the alert will not emit `wcsAlertDismiss` event automatically                                                                                                                                                                                                                                                                                                                                                                                                                                 | `number`                                             | `5000`      |


## Events

| Event             | Description                               | Type                |
| ----------------- | ----------------------------------------- | ------------------- |
| `wcsAlertDismiss` | Event emitted when the alert is dismissed | `CustomEvent<void>` |


## Dependencies

### Used by

 - [wcs-alert-drawer](../alert-drawer)

### Depends on

- [wcs-mat-icon](../mat-icon)
- [wcs-button](../button)

### Graph
```mermaid
graph TD;
  wcs-alert --> wcs-mat-icon
  wcs-alert --> wcs-button
  wcs-button --> wcs-spinner
  wcs-button --> wcs-mat-icon
  wcs-alert-drawer --> wcs-alert
  style wcs-alert fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
