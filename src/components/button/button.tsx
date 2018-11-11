import { Component } from '@stencil/core';


@Component({
    tag: 'wcs-button'
})
export class Button {
    render() {
        return (
            <button class="btn btn-primary">Test</button>
        );
    }
}
