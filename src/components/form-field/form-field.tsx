import { Component, ComponentInterface, Element, h, Host, State } from '@stencil/core';

/**
 * TODO:
 * - [ ] Suffix button style
 * - [ ] Resize select correctly
 * - [ ] Text area
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

    componentWillLoad() {
        this.hasSuffix = this.el.querySelector('wcs-button') !== null;
        this.hasPrefix = this.el.querySelector('wcs-select') !== null;

        this.addRequiredMarkerToLabel();
    }

    private addRequiredMarkerToLabel() {
        const label = this.el.querySelector('wcs-label');
        const isRequired = (this.el.querySelector('input') || this.el.querySelector('wcs-select'))
            .hasAttribute('required');

        if (isRequired && label) {
            label.setAttribute('required', 'true');
        }
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
                <slot name="label" />
                <div class="input-container">
                    <slot name="prefix" />
                    <slot />
                    <slot name="suffix" />
                </div>
                <slot name="messages" />
            </Host>
        );
    }
}
