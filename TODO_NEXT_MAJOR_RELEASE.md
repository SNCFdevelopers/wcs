# Breaking changes for next-release

Make sure these changes are made before releasing the next release of WCS.

## v6

- [x] `editable-field-interface.tsx` : rename `errorhandler` to `errorHandler`
- [x] `textarea.tsx` : delete previously deprecated `setFocus` method
- [x] `input.tsx` : delete previously deprecated `setFocus` method
- [x] `select-interface.ts` : rename `SelectFilerChangeEventDetail` to `SelectFilterChangeEventDetail`
- [~] Update documentation to take account of the new biding library for angular standalone bindings