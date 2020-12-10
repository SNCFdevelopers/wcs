import { Component, ComponentInterface, Element, h, Host, Prop, State } from '@stencil/core';

/**
 * TODO:
 * - [ ] Suffix button style
 */
@Component({
    tag: 'wcs-form-field',
    styleUrl: 'form-field.scss',
    shadow: true,
})
export class FormField implements ComponentInterface {
    @Element() el!: HTMLWcsFormFieldElement;

    /**
     * Specifies whether the form field is in an error state. Displays the field border in red and the message contained in the wcs-error component
     */
    @Prop({mutable: true, reflect: true}) isError = false;

    @State() hasPrefix = false;
    @State() hasSuffix = false;
    private observer: MutationObserver;

    componentWillLoad() {
        this.hasSuffix = this.el.querySelector('wcs-button') !== null;
        this.hasPrefix = this.el.querySelector('wcs-select') !== null;

        this.addRequiredMarkerToLabel();
    }

    private addRequiredMarkerToLabel() {
        const label = this.el.querySelector('wcs-label');
        // TODO: deprecate this in favor of the 'required' component attribute
        const spiedElement = this.el.querySelector('input')
            || this.el.querySelector('wcs-select')
            || this.el.querySelector('textarea')
            || this.el.querySelector('wcs-radio-group');

        this.observer = new MutationObserver(mutations => {
            const requiredAttMutation = mutations.filter(m => m.attributeName === 'required')[0];
            if (requiredAttMutation) {
                this.updateLabelRequiredFlag(spiedElement?.hasAttribute('required'), label);
            }
        });
        if (spiedElement) {
            this.observer.observe(spiedElement, {attributes: true});
        }

        const isRequired = spiedElement?.hasAttribute('required');
        this.updateLabelRequiredFlag(isRequired, label);
    }

    private updateLabelRequiredFlag(isRequired: boolean, label: Element) {
        if (isRequired && label) {
            label.setAttribute('required', 'true');
        } else if (!isRequired && label) {
            label.removeAttribute('required');
        }
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }

    render() {
        let classes = '';
        const isError = this.isError;
        if (this.hasSuffix) {
            classes += ' has-suffix';
        }
        if (this.hasPrefix) {
            classes += ' has-prefix';
        }

        return (
            <Host class={classes}>
                <slot name="label"/>
                <div class="input-container">
                    <slot name="prefix"/>
                    <slot/>
                    <slot name="suffix"/>
                </div>
                {
                    isError ? (<slot name="error"/>) : ''
                }
                <slot name="messages"/>
            </Host>
        );
    }
}
