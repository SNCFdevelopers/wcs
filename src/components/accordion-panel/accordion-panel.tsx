import {
    Component,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Method,
    Prop,
    Watch
} from '@stencil/core';
import { SelectArrow } from '../select/select-arrow';
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute } from "../../utils/helpers";

const ACCORDION_INHERITED_ATTRS = ['tabindex', 'title'];

/**
 * The accordion-panel is a subcomponent of `wcs-accordion`. It represents every panel of the accordion that can be expanded.
 * 
 *
 * @cssprop --wcs-accordion-panel-color-default - Default color of the accordion panel
 * @cssprop --wcs-accordion-panel-color-highlight - Highlight color of the accordion panel
 * @cssprop --wcs-accordion-panel-color-hover - Hover color of the accordion panel
 * @cssprop --wcs-accordion-panel-color-press - Press color of the accordion panel
 * @cssprop --wcs-accordion-panel-action-color-default - Default action color of the accordion panel
 * @cssprop --wcs-accordion-panel-action-color-highlight - Highlight action color of the accordion panel
 * @cssprop --wcs-accordion-panel-action-color-hover - Hovered action color of the accordion panel
 * @cssprop --wcs-accordion-panel-action-color-press - Pressed action color of the accordion panel
 * @cssprop --wcs-accordion-panel-background-color-default - Default background color of the accordion panel
 * @cssprop --wcs-accordion-panel-background-color-highlight - Highlight background color of the accordion panel
 * @cssprop --wcs-accordion-panel-background-color-hover - Hover background color of the accordion panel
 * @cssprop --wcs-accordion-panel-background-color-press - Press background color of the accordion panel
 * @cssprop --wcs-accordion-panel-header-font-size - Font size of the accordion panel header
 * @cssprop --wcs-accordion-panel-header-font-weight - Font weight of the accordion panel header
 * @cssprop --wcs-accordion-panel-border-radius - Border radius of the accordion panel
 * @cssprop --wcs-accordion-panel-border-radius-open - Border radius of the open accordion panel
 * @cssprop --wcs-accordion-panel-padding-vertical - Vertical padding of the accordion panel
 * @cssprop --wcs-accordion-panel-padding-horizontal - Horizontal padding of the accordion panel
 * @cssprop --wcs-accordion-panel-header-border-width - Border width of the accordion panel header
 * @cssprop --wcs-accordion-panel-border-width - Border width of the accordion panel
 * @cssprop --wcs-accordion-panel-border-width-focus - Border width of the accordion panel when focused
 * @cssprop --wcs-accordion-panel-border-color - Border color of the accordion panel
 * @cssprop --wcs-accordion-panel-border-color-focus - Border color of the accordion panel when focused
 * @cssprop --wcs-accordion-panel-border-style-focus - Border style of the accordion panel when focused
 * @cssprop --wcs-accordion-transition-duration - Transition duration of the accordion panel
 */
@Component({
    tag: 'wcs-accordion-panel',
    styleUrl: 'accordion-panel.scss',
    shadow: true
})
export class AccordionPanel implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLElement;
    private nativeButton?: HTMLButtonElement;
    private inheritedAttributes: { [k: string]: any } = {};
    
    @Prop({reflect: true, mutable: true}) open: boolean = false;

    /**
     * Specifies whether the component should display the open/close text.
     * if false, it won't show the open/close text.
     */
    @Prop({reflect: true}) hideActionText: boolean = false;

    /**
     * Specifies whether the component should highlight when open with primary color.
     * if true, the background color will be the primary color.
     * if false, the background color will be wcs-light.
     */
    @Prop({reflect: true}) highlight: boolean = false;

    /**
     * Specifies wether the component should group the content with header in one card
     * if true, there will be only one card with the header and the content
     * Nothing change when the panel is close
     */
    @Prop({reflect: true}) groupContentWithHeader: boolean = false;

    @Event() wcsOpenChange!: EventEmitter<boolean>;

    @Watch('open')
    openChange(newValue: boolean) {
        this.wcsOpenChange.emit(newValue);
    }

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, ACCORDION_INHERITED_ATTRS),
        };
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeButton, attr, value);
    }

    @Method()
    async close() {
        this.open = false;
    }

    render() {
  
  
  
        return (
            <Host>
                <button aria-expanded={this.open ? "true": "false"}
                        aria-controls="content"
                        class="header"
                        ref={(el) => this.nativeButton = el}
                        onClick={() => this.open = !this.open}
                        {...this.inheritedAttributes}>
                    <slot name="header"/>
                    <span class="header-action">
                        {!this.hideActionText && (
                            <span>{this.open ? 'Fermez' : 'Ouvrez'}</span>)
                        }
                        <SelectArrow up={this.open}/>
                    </span>
                </button>
                <div class="content" id="content">
                    <slot name="content"/>
                </div>
            </Host>
        );
    }
}
