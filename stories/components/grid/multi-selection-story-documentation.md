You can assign an item selection with the `selectedItems` property.
If the selection mode is set to multiple, the value must be an array, otherwise a single item.

The values are compared with the `_.equals()` function of loadash.

When the selection changes, the `wcsGridSelectionChange` event contains the details of the rows selected by the user.