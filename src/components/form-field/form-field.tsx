import { Component, ComponentInterface, Element, h, Host, State } from '@stencil/core';

/**
 * TODO:
 * - [ ] Suffix button style
 * - [ ] Resize select correctly
 */
@Component({
    tag: 'wcs-form-field',
    styleUrl: 'form-field.scss',
    shadow: true,
})
export class FormField implements ComponentInterface {
    @Element() el!: HTMLWcsFormFieldElement;

    @State() hasPrefix = false;
    @State() hasSuffix = false;

    componentDidLoad() {
        this.hasSuffix = this.el.querySelector('wcs-button') !== null;
        this.hasPrefix = this.el.querySelector('wcs-select') !== null;
    }

    render() {
        let classes = '';
        if (this.hasSuffix) {
            classes += ' has-suffix';
        }
        if (this.hasPrefix) {
            classes += ' has-prefix';
        }

        return (
            <Host class={classes}>
                <slot name="prefix"/>
                <slot/>
                <slot name="suffix"/>
            </Host>
        );
    }
}
