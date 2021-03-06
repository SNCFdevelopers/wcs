# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0]

### Added

- `wcs-editable-field`: Added support for the readonly attribute

## [2.0.1]

### Fixed

- `wcs-form-field`: Following the update of the form field, an error was thrown if the slotted component was not in a
  fixed list of supported components. This was a problem for some applications that wrapped the components or created
  components on their side. This error has been removed, and a warning has been added.

## [2.0.0]

### Breaking changes

- if you use form-field, the native components "input" and "textarea" are no longer supported. You have to migrate to
  the new components `wcs-input` and `wcs-textarea` (they share the same API as the native ones).
- `wcs-field-header` component has been renamed to `wcs-field-label`.

### Added

- wcs-editable-field : new component for inline data editing. for the moment the component supports the following
  components
    - wcs-input
    - wcs-text-area
    - wcs-select
- wcs-input
- wcs-textarea

## [0.0.3 - 0.0.6]

### Fixed

- Compatibility for firefox < 63
    - Tab
    - Select

## [0.0.2]

### Changed

- Upgraded to stencil 1.0

## [0.0.1]

### Added

- Components
    - App shell
        - Header
        - Sidebar
    - Badge
    - Button
    - Card
        - Card body
    - Checkbox
    - Icon
    - Progress bar
    - Progress radial
    - Select
    - Tabs
    - Tooltip
- Styling
    - A few CSS variables
- Examples
    - Angular
    - React (Not yet working)
    - Vue
