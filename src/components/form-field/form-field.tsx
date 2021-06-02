import { Component, ComponentInterface, Element, h, Host, Prop, State, Watch } from '@stencil/core';

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

    /**
     * Name of the material icon to add to the field
     */
    @Prop() icon;

    @State() hasPrefix = false;
    @State() hasSuffix = false;
    @State() spiedElement: Element;

    private observer: MutationObserver;

    componentWillLoad() {
        this.hasSuffix = this.el.querySelector('wcs-button') !== null;
        this.hasPrefix = this.el.querySelector('wcs-select') !== null;

        this.initSpiedElement(true);
        this.addRequiredMarkerToLabel();
        this.updateErrorStateOnInput(this.isError);
    }


    @Watch('isError')
    // @ts-ignore
    private isErrorChange(newValue: boolean) {
        this.updateErrorStateOnInput(newValue);
    }

    private updateErrorStateOnInput(newValue: boolean) {
        if (this.spiedElementIsOfType('wcs-input', 'wcs-textarea')) {
            if (newValue) {
                this.spiedElement.setAttribute('state', 'error');
            } else {
                this.spiedElement.setAttribute('state', 'initial');
            }
        }
    }

    /**
     * This function return true if the form field contains an element with tagName matches a value of the types param
     * @param types
     * @private
     */
    private spiedElementIsOfType(...types: string[]): boolean {
        for (const type of types) {
            if (this.spiedElement?.tagName === type.toUpperCase()) return true;
        }
        return false
    }


    private addRequiredMarkerToLabel() {
        // TODO: deprecate this in favor of the 'required' component attribute
        const label = this.el.querySelector('wcs-label');
        this.observer = new MutationObserver(mutations => {
            const requiredAttMutation = mutations.filter(m => m.attributeName === 'required')[0];
            if (requiredAttMutation) {
                this.updateLabelRequiredFlag(this.spiedElement?.hasAttribute('required'), label);
            }
        });
        if (this.spiedElement) {
            this.observer.observe(this.spiedElement, {attributes: true});
        }

        const isRequired = this.spiedElement?.hasAttribute('required');
        this.updateLabelRequiredFlag(isRequired, label);
    }


    private initSpiedElement(willLoad: boolean) {
        const messageIfSpiedElementIsNull = 'You must use the form field with one of the following components: wcs-input, wcs-select, wcs-textarea, wcs-radio-group.';
        if (willLoad) {
            this.spiedElement = this.el.querySelector('wcs-input')
                || this.el.querySelector('wcs-select')
                || this.el.querySelector('wcs-textarea')
                || this.el.querySelector('wcs-radio-group')
                || this.el.querySelector('wcs-switch');
            if (!this.spiedElement) {
                throw new Error(messageIfSpiedElementIsNull);
            }
        } else {
            this.spiedElement = (this.el.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement)?.assignedElements()[0];
            if (!this.spiedElement) throw new Error(messageIfSpiedElementIsNull);
            if (['wcs-input', 'wcs-select', 'wcs-textarea', 'wcs-radio-group', 'wcs-switch']
                .map(x => x.toUpperCase())
                .indexOf(this.spiedElement.tagName) === -1) {
                throw new Error(messageIfSpiedElementIsNull + ' Component ' + this.spiedElement.tagName + ' not supported.');
            }
        }
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
                    <slot onSlotchange={() => this.onFormInputSlotChange()}/>
                    <slot name="suffix"/>
                </div>
                {
                    isError ? (<slot name="error"/>) : ''
                }
                <slot name="messages"/>
            </Host>
        );
    }

    private onFormInputSlotChange() {
        this.initSpiedElement(false);
        this.addRequiredMarkerToLabel();
        this.updateErrorStateOnInput(this.isError);
    }
}
