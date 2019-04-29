import { Component, Prop, Element } from '@stencil/core';

/**
 *
 */
@Component({
    tag: 'wcs-input',
    styleUrl: 'input.scss',
    shadow: true,
})
export class Input {
    @Element() el: HTMLElement;

    @Prop({ reflectToAttr: true }) name;

    @Prop({ reflectToAttr: true }) background: 'normal' | 'white' = 'normal';

    @Prop({ reflectToAttr: true }) value;


    render() {
        return (
            <input name={this.name} class={this.background} value={this.value} onChange={this.onInputChange}/>
        );
    }
    private onInputChange() {
        console.log('evt');
    }
}
