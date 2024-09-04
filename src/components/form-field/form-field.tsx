import { Component, ComponentInterface, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { isMutableAriaAttribute } from "../../utils/mutable-aria-attribute";

/**
 * Form field component wraps the native input element and add some more functionality on top of it.
 *
 * You can use the `wcs-form-field` to wrap any of these components :
 * - `wcs-input`
 * - `wcs-textarea`
 * - `wcs-radio-group`
 * - `wcs-switch`
 * - `wcs-checkbox`
 * - `wcs-native-select`
 * - `wcs-select`
 * - `wcs-counter`
 *
 * For non-supported slotted component, you can use the `required` attribute on the wrapped component to tell the
 * form-field that it is required. It will add a red star after the label of the form field.
 * 
 * ## Accessibility guidelines 💡
 * - Each form control should be identified with a unique `wcs-label`
 * - Don't forget to add form validation to make sure the data is correctly formatted
 * - If the `wcs-label` is required, the form control must have the `required` HTML attribute and vice-versa (this is normally automatically set)
 * - The form should not be submittable if at least one required form control is not filled
 * - Hints are optional and should only be used to add extra information
 * - Additional aria attributes put on `<wcs-form-field>` won't inherit onto the native component : you must use the `setAriaAttribute` method.
 * 
 * @slot label - Automatically filled when a `wcs-label` is provided
 * @slot <no-name> - The main slot containing the wrapped component
 * @slot prefix - (Optional) Display a component as prefix. See "Prefix Suffix Group" story for more info.
 * @slot suffix - (Optional) Display a component as suffix. See "Prefix Suffix Group" story for more info.
 * @slot error - Automatically filled when a `wcs-error` is provided
 * @slot messages - Automatically filled when a `wcs-hint` is provided
 */
@Component({
    tag: 'wcs-form-field',
    styleUrl: 'form-field.scss',
    shadow: true,
})
export class FormField implements ComponentInterface {
    @Element() private el!: HTMLWcsFormFieldElement;

    /**
     * Specifies whether the form field is in an error state. Displays the field border in red and the message contained in the wcs-error component
     */
    @Prop({mutable: true, reflect: true}) isError = false;

    @State() private hasPrefix = false;
    @State() private hasSuffix = false;
    @State() private spiedElement: Element;

    private observer: MutationObserver;

    componentWillLoad() {
        this.hasSuffix = this.el.querySelector('wcs-button') !== null;
        this.hasPrefix = this.el.querySelector('wcs-select') !== null;
    }

    componentDidLoad() {
        this.initSpiedElement();
        this.addRequiredMarkerToLabel();
        this.updateErrorStateOnInput(this.isError);
    }

    @Watch('isError')
    // @ts-ignore
    private isErrorChange(newValue: boolean) {
        this.updateErrorStateOnInput(newValue);
        this.updateAriaAttributes();
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


    private initSpiedElement() {
        const SUPPORTED_COMPONENTS = ['wcs-input', 'wcs-select', 'wcs-textarea', 'wcs-radio-group', 'wcs-switch', 'wcs-checkbox', 'wcs-native-select', 'wcs-counter'];

        this.spiedElement = (this.el.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement)
            ?.assignedElements()
            .filter(n => [...SUPPORTED_COMPONENTS, 'SLOT'].map(x => x.toUpperCase()).indexOf(n.nodeName) !== -1)[0];

        // If the component is used in another web component
        if (this.spiedElement?.tagName === 'SLOT') {
            this.spiedElement = ((this.spiedElement as HTMLSlotElement)
                .assignedElements()
                .filter(n => SUPPORTED_COMPONENTS.map(x => x.toUpperCase()).indexOf(n.nodeName) !== -1)[0]) as HTMLElement;
        }

        if (!this.spiedElement) {
            // tslint:disable-next-line:no-console
            console.warn('Form-field component support only ' + SUPPORTED_COMPONENTS.toString() + '. Some features may not work with the provided component.');
            return;
        }
    }
    
    private updateAriaAttributes(): void {
        if(isMutableAriaAttribute(this.spiedElement)) {
            this.spiedElement.setAriaAttribute('aria-label', this.label);

            // Sur les autres DS, généralement seul l'erreur est affichée et pas avec la description
            if(this.isError) {
                if(this.error) this.spiedElement.setAriaAttribute('aria-description', this.error);
                this.spiedElement.setAriaAttribute('aria-invalid', 'true');
            } else {
                if(this.description) this.spiedElement.setAriaAttribute('aria-description', this.description);
                this.spiedElement.setAriaAttribute('aria-invalid', 'false');
            }
        }
    }
    
    private get label() {
        return this.el.querySelector('wcs-label')?.textContent;
    }
    
    private get description() {
        return this.el.querySelector('wcs-hint')?.textContent;
    }
    
    private get error() {
        return this.el.querySelector('wcs-error')?.textContent;
    }

    private updateLabelRequiredFlag(isRequired: boolean, label: Element) {
        if (isRequired && label) {
            label.setAttribute('required', 'true');
        } else if (!isRequired && label) {
            label.removeAttribute('required');
        }
    }

    disconnectedCallback() {
        this.observer?.disconnect();
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
        this.initSpiedElement();
        this.updateAriaAttributes()
        this.addRequiredMarkerToLabel();
        this.updateErrorStateOnInput(this.isError);
    }
}
