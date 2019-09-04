import { Component, h } from '@stencil/core';

/**
 * TODO:
 * - [ ] Suffix button style
 * - [ ] Resize select correctly
 */
@Component({
    tag: 'wcs-input-group',
    styleUrl: 'input-group.scss',
    shadow: true,
})
export class InputGroup {
    render() {
        return [
            <slot name="prefix" />,
            <slot />,
            <slot name="suffix" />
        ];
    }
}
