import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'wcs-checkbox',
    styleUrl: 'checkbox.scss',
    shadow: true
})
export class Checkbox {
    private checkboxId = `wcs-checkbox-${checkboxIds++}`;

    @Prop() name = this.checkboxId;

    componentDidLoad() {
        console.log('Component has been rendered');
    }

    render() {
        return (
            <label htmlFor={this.name} class="container">
                <input class="wcs-checkbox" type="checkbox" name={this.name} id={this.name}></input>
                <span class="checkmark"></span>
                <span class="text">
                    <slot />
                </span>
            </label>
        );
    }
}

let checkboxIds = 0;
