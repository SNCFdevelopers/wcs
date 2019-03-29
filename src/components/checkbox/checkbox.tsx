import { Component } from '@stencil/core';


@Component({
    tag: 'wcs-checkbox',
    styleUrl: 'checkbox.scss'
})
export class Checkbox {
    render() {
        return [
            <input class="wcs-checkbox" type="checkbox"></input>,
            <label></label>
        ];
    }
}
