import {
    Component,
    ComponentInterface,
    Element, forceUpdate,
    h,
    Host,
    Method,
    Prop,
    State,
    Watch
} from '@stencil/core';

import { inheritAttributes, inheritAriaAttributes, setOrRemoveAttribute } from '../../utils/helpers';
import { AriaAttributeName, MutableAriaAttribute } from '../../utils/mutable-aria-attribute';
import {
    ICONS_FONT_CHEVRON_UNICODE,
    NAV_ARIA_LABEL_DEFAULT,
    EXPAND_BTN_ARIA_LABEL_DEFAULT
} from './breadcrumb-constants';

const BREADCRUMB_INHERITED_ATTRS = [];

/**
 * A breadcrumb trail consists of a list of links to the parent pages of the current page in hierarchical order.  
 * It helps users find their place within a website or web application. Breadcrumbs are often placed horizontally before a page's main content.
 *
 * ## Accessibility guidelines 💡
 * > - If the last item is a link to the current page, you must set the `aria-current` attribute to `page` on `wcs-breadcrumb-item`.
 * > - If the element representing the current page is not a link, `aria-current` is optional.
 * > - You can set the attribute `aria-label` on `wcs-breadcrumb`, it will be passed to the native `nav` element located inside its shadow DOM. 
 * >   You can find the `aria-label` default value in the table below. If your application is in English, you can set it to `Breadcrumb`.
 * > - You can do the same thing for the `aria-label` of the expand button when the breadcrumb is collapsed. You can find its default value
 * >   in the table below too.  
 * > - If you need to **dynamically change the `aria-label` attribute of `wcs-breadcrumb` after the first render**, you can use the 
 * >   `setAriaAttribute` JS method (example below). For the expand button however, you can update the prop `ariaLabelExpandButton`.  
 * >   Note: we're working on updating the component automatically when attributes change. 
 *
 * > ```javascript
 * > const wcsButton = document.querySelector('wcs-button');
 * > await wcsButton.setAriaAttribute('aria-label', 'new label');
 * > ```
 */
@Component({
    tag: 'wcs-breadcrumb',
    styleUrl: 'breadcrumb.scss',
    shadow: true,
})
export class Breadcrumb implements ComponentInterface, MutableAriaAttribute {
    @Element() private el: HTMLElement;
    private navEl?: HTMLElement;
    private expandBtnEl: HTMLWcsButtonElement;

    private inheritedAttributes: { [k: string]: any } = {};

    /**
     * If the number of breadcrumb items exceeds this maximum,
     * the breadcrumb will collapse and show an expand button.  
     * If this prop is `undefined`, breadcrumb items will never collapse.
     */
    @Prop() maxItems?: number;
    /**
     * The number of breadcrumb items to show before the expand button.
     * If `itemsBeforeCollapse` + `itemsAfterCollapse` is greater than `maxItems`,
     * the breadcrumb will not be collapsed.
     */
    @Prop() itemsBeforeCollapse: number = 1;
    /**
     * The number of breadcrumb items to show after the expand button.
     * If `itemsBeforeCollapse` + `itemsAfterCollapse` is greater than `maxItems`,
     * the breadcrumb will not be collapsed.
     */
    @Prop() itemsAfterCollapse: number = 2;
    /** Set `aria-label` for the expand button when the breadcrumb is collapsed. */
    @Prop() ariaLabelExpandButton?: string = EXPAND_BTN_ARIA_LABEL_DEFAULT;

    /**
     * Show breadcrumb items that are inside the hidden-items slot.
     */
    @State() private showHiddenItems: boolean = false;

    @Watch('maxItems')
    @Watch('itemsBeforeCollapse')
    @Watch('itemsAfterCollapse')
    handleCollapsePropsChange() {
        this.updateCollapsedViewMode();
    }

    @Watch('ariaLabelExpandButton')
    handleAriaLabelExpandBtnChange(newValue: string) {
        this.expandBtnEl?.setAriaAttribute('aria-label', newValue);
    }

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, BREADCRUMB_INHERITED_ATTRS),
        };
        this.updateCollapsedViewMode();
    }

    componentDidLoad(): void {
        this.expandBtnEl?.setAriaAttribute('aria-label', this.ariaLabelExpandButton);
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.navEl, attr, value);
    }

    private getBreadcrumbItems(): HTMLWcsBreadcrumbItemElement[] {
        return Array.from(this.el.querySelectorAll('wcs-breadcrumb-item'));
    }

    private shouldCollapseItems(): boolean {
        return (
            !!this.maxItems &&
            this.getBreadcrumbItems().length > this.maxItems &&
            this.itemsBeforeCollapse + this.itemsAfterCollapse <= this.maxItems
        );
    }

    private updateCollapsedViewMode(): void {
        if (this.shouldCollapseItems()) {
            this.assignSlotNamesForCollapsedViewMode();
        } else {
            this.assignSlotNamesForNonCollapsedViewMode();
        }
    }

    /**
     * Setting slot names on breadcrumb items allows to leverage JSX in the render method.
     */
    private assignSlotNamesForCollapsedViewMode(): void {
        const breadcrumbItems = this.getBreadcrumbItems();
        const itemBeforeExpandBtnIndex = this.itemsBeforeCollapse - 1;
        const itemAfterExpandBtnIndex = breadcrumbItems.length - this.itemsAfterCollapse;

        breadcrumbItems.forEach((breadcrumbItem, index) => {
            if (index <= itemBeforeExpandBtnIndex) {
                breadcrumbItem.slot = 'items-before-expand-btn';
                breadcrumbItem.last = false;
            } else if (index > itemBeforeExpandBtnIndex && index < itemAfterExpandBtnIndex) {
                breadcrumbItem.slot = 'hidden-items';
                breadcrumbItem.last = false;
            } else {
                breadcrumbItem.slot = 'items-after-expand-btn';
                breadcrumbItem.last = index === breadcrumbItems.length - 1;
            }
        });
    }
    
    private assignSlotNamesForNonCollapsedViewMode(): void {
        const breadcrumbItems = this.getBreadcrumbItems();
        breadcrumbItems.forEach((breadcrumbItem, index) => {
            breadcrumbItem.slot = 'non-collapsed';
            breadcrumbItem.last = index === breadcrumbItems.length - 1;
        });
    }

    private handleSlotChange(): void {
        this.updateCollapsedViewMode();
        this.showHiddenItems = false;
        forceUpdate(this);
    }

    private handleOnExpandBtnClick(): void {
        // We leave the breadcrumb items in the hidden-items slot, without passing them to
        // the non-collapsed slot, so that we know which items to hide again later if needed.
        // For future implementations, the expand button could show or hide hidden items on click,
        // with a wcs-dropdown for example.
        this.showHiddenItems = true;
        // We wait for the first hidden item to be visible in the DOM again
        // to be able to focus it.
        requestAnimationFrame(() => this.setFocusToFirstHiddenItem());
    }

    /**
     * Avoid losing focus after clicking the expand button.
     * We need to give focus back to the first breadcrumb item link that was hidden before.
     */
    private setFocusToFirstHiddenItem(): void {
        const breadcrumbItems = this.getBreadcrumbItems();
        const firstHiddenItemIndex = this.itemsBeforeCollapse;
        const firstHiddenItem = breadcrumbItems[firstHiddenItemIndex];
        const firstHiddenItemSlot =
            firstHiddenItem.shadowRoot.querySelector('slot') as HTMLSlotElement;
        const breadcrumbItemLinkToFocus =
            firstHiddenItemSlot.assignedElements()[0] as HTMLAnchorElement;
        breadcrumbItemLinkToFocus?.focus();
    }

    private renderExpandAllButton(): JSX.Element {
        const expandBtnIsLastItem = this.itemsAfterCollapse === 0;
        return (
            <div role="listitem" class="item-not-slotted">
                <wcs-button
                    mode="clear"
                    shape="square"
                    size="s"
                    onClick={this.handleOnExpandBtnClick.bind(this)}
                    ref={(el) => this.expandBtnEl = el}
                >
                    <wcs-mat-icon icon="more_horiz" />
                </wcs-button>
                {!expandBtnIsLastItem && (
                    <span class="item-icon" aria-hidden="true">
                        {ICONS_FONT_CHEVRON_UNICODE}
                    </span>
                )}
            </div>
        );
    }

    render() {
        const showExpandBtn = this.shouldCollapseItems() && !this.showHiddenItems;
        return (
            <Host>
                <nav
                    class={`wcs-breadcrumb-container${this.showHiddenItems ? ' show-hidden-items' : ''}`}
                    aria-label={NAV_ARIA_LABEL_DEFAULT}
                    {...this.inheritedAttributes}
                    ref={(el) => this.navEl = el}
                >
                    {/*
                    * We use aria roles here instead of an <ol> tag
                    * so that the list can be browsed correctly on Firefox with screen readers.
                    * There seems to be an issue with Firefox and the Shadow DOM.
                    */}
                    <div role="list">
                        {/* Only the main slot shoud be used by consumers. */}
                        <slot onSlotchange={this.handleSlotChange.bind(this)} />
                        {/* Non collapsed view mode */}
                        <slot name="non-collapsed"></slot>
                        {/* Collapsed view mode */}
                        <slot name="items-before-expand-btn" />
                        <slot name="hidden-items" />
                        {showExpandBtn && this.renderExpandAllButton()}
                        <slot name="items-after-expand-btn" />
                    </div>
                </nav>
            </Host>
        );
    }
}
