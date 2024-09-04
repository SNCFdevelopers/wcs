import { Component, ComponentInterface, h, Host, Prop, Element, Watch, Method, Listen } from '@stencil/core';
import { WcsTooltipAppendTo, WcsTooltipPosition } from './tooltip-interface';

// We use the Tippy.js library for the tooltip. At first by using directly the styles of tippy because
// the design system does not specify any spec for the tooltips.
//
// In a second time, if a need of customization is felt, it will be possible to use the lib in a
// "Headless" mode where the rendering of the tooltip will be entirely in our charge, without
// modifications in the API : https://atomiks.github.io/tippyjs/v6/headless-tippy/
import tippy, { Instance, Props } from 'tippy.js';
import { isEscapeKey } from "../../utils/helpers";

/**
 * Tooltips are used to provide additional information for features available on the website. These can improve the user
 * experience or simply show additional information. Tooltips appear when the user rolls over or clicks on them
 * (for longer content).
 *
 * Note that this component is based on the Tippy.js library : https://atomiks.github.io/tippyjs/
 * 
 * ## Accessibility guidelines 💡
 * 
 * The problem is that impaired users may not be able to see what is the information provided by the tooltip. To solve
 * this problem, the tooltip should be served with some aria attributes to make it accessible.
 *
 * Aria-features `wcs-tooltip` respect:
 * - dismiss when the user presses the `Escape` key
 * - has a `role=tooltip`
 *
 * But you have to provide the "link" between the element you want to describe and the tooltip. To do this, you have to
 * provide the "visual description" you add on the `wcs-tooltip` to the `aria-label` attribute or the `aria-description` as soon as the attribute will be available 
 * of the element you want to describe .
 * 
 * Example:
 * 
 * ```html
 * <wcs-tooltip>Trashed items</wcs-tooltip>
 * <wcs-button aria-label="Trashed items">Trash</wcs-button>
 * ```
 */
@Component({
    tag: 'wcs-tooltip',
    shadow: true,
    // Tippy stylesheet and specific styles are imported in the global tooltip.scss file
    styleUrl: 'tooltip.scss'
})
export class Tooltip implements ComponentInterface {
    /**
     * The **id** of the element the tooltip's going to describe.
     *
     * This property cannot be modified after initialization.
     *
     * @example
     * ```html
     * <span id="tooltiped">Some content</span>
     * <wcs-tooltip for="tooltiped">A tooltip!</wcs-tooltip>
     * ```
     */
    @Prop({mutable: false})
    for: string;

    /**
     * Where the tooltip is going to show relative to the element it's describing.
     */
    @Prop({reflect: true})
    position: WcsTooltipPosition = 'bottom';

    /**
     * Determines if the tooltip has interactive content inside of it, so that it can be hovered over and clicked inside
     * without hiding.
     */
    @Prop()
    interactive: boolean = false;

    /**
     * Specifies the maximum width of the tooltip. Useful to prevent it from being too horizontally wide to read.
     *
     * If the viewport's width is smaller than maxWidth, core CSS ensures the tippy remains smaller than the screen.
     * 
     * To test it on WCS documentation page, add 'px' to the control value (string type in this case).
     */
    @Prop()
    maxWidth: string | number = 350;

    /**
     * Delay in ms once a trigger event is fired before the tooltip shows or hides.
     *
     * You can provide an array with two values to define a different duration for show and hide.
     *
     * `[showDelay, hideDelay]`
     *
     * Use null to use default value.
     */
    @Prop()
    delay: number | [number, number] = 0;

    /**
     * Duration in ms of the transition animation.
     */
    @Prop()
    duration: number | [number, number] = [300, 250];

    /**
     * Determines the events that cause the tooltip to show. Multiple event names are separated by spaces.
     *
     * See: https://atomiks.github.io/tippyjs/v6/all-props/#trigger
     */
    @Prop()
    trigger: string = 'mouseenter focus';

    /**
     * Allows you to change the theme used by tippy.
     *
     * The WCS theme is used by default and uses the WCS CSS variables.
     *
     * You can create a theme by following this documentation and choosing a custom name :
     * https://atomiks.github.io/tippyjs/v6/themes/
     */
    @Prop()
    theme: string = 'wcs';

    /**
     * You can use this property instead of the slot API to affect content in the tooltip.
     *
     * This makes it easier to manage the update if the tooltip contains elements that are not mutated when their
     * content changes. Indeed, if the slot is used, the tooltip is updated only if the structure of the slotted DOM
     * changes (the DOM must be mutated).
     *
     * The two APIs are not mutually exclusive, if both are filled in (the prop + the slot) the rendering will first
     * display the content of this property and then the slotted elements.
     */
    @Prop()
    content: string;

    /**
     * The element to append the tooltip to. Default behaviour is `() => document.body`. If interactive: true,
     * the default behavior is appendTo: "parent"
     *
     * See: https://atomiks.github.io/tippyjs/v6/all-props/#appendto
     */
    @Prop()
    appendTo: WcsTooltipAppendTo;

    @Element()
    private el: HTMLWcsTooltipElement;

    private tippyInstance: Instance<Props>;

    componentWillLoad(): Promise<void> | void {
        this.tippyInstance = tippy(document.getElementById(this.for), {
            appendTo: this.appendTo || (() => document.body),
            theme: this.theme,
            allowHTML: true,
            content: this.getTooltipContentFromPropAndSlot(),
            maxWidth: this.maxWidth,
            placement: this.position,
            delay: this.delay,
            duration: this.duration,
            interactive: this.interactive,
            trigger: this.trigger
        });
    }
    
    @Listen('keydown', { target: 'window' })
    async handleKeyDown(ev: KeyboardEvent) {
        if (isEscapeKey(ev)) {
            if(this.tippyInstance.state.isShown) {
                await this.hide();
            }
        }
    }

    private getTooltipContentFromPropAndSlot() {
        if (this.content) {
            return this.content + this.el.innerHTML;
        }
        return this.el.innerHTML;
    }

    @Watch('interactive')
    @Watch('position')
    @Watch('maxWidth')
    @Watch('theme')
    @Watch('delay')
    @Watch('duration')
    @Watch('trigger')
    // @ts-ignore
    private updateProps() {
        this.tippyInstance?.setProps({
            interactive: this.interactive,
            placement: this.position,
            maxWidth: this.maxWidth,
            theme: this.theme,
            delay: this.delay,
            duration: this.duration,
            trigger: this.trigger
        })
    }

    @Watch('content')
    private updateTippyContent() {
        this.tippyInstance?.setProps({
            content: this.getTooltipContentFromPropAndSlot()
        })
    }

    /**
     * Programmatically hide the tooltip
     */
    @Method()
    async hide() {
        this.tippyInstance.hide();
    }

    /**
     * Programmatically show the tooltip
     */
    @Method()
    async show() {
        this.tippyInstance.show();
    }

    /**
     * Temporarily prevent the tooltip from showing or hiding
     */
    @Method()
    async disable() {
        this.tippyInstance.disable();
    }

    /**
     * Re-enable a disabled tooltip
     */
    @Method()
    async enable() {
        this.tippyInstance.enable();
    }

    disconnectedCallback() {
        this.tippyInstance?.destroy();
    }

    render() {
        return (
            <Host role="tooltip">
                <slot onSlotchange={_ => this.updateTippyContent()}/>
            </Host>
        );
    }


}
