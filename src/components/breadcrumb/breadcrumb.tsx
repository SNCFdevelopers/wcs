import {
    Component,
    ComponentInterface,
    Element,
    forceUpdate,
    h,
    Host,
    Prop,
    State,
    Watch
} from '@stencil/core';

import { inheritAttributes } from '../../utils/helpers';

const BREADCRUMB_ARIA_INHERITED_ATTRS = ['aria-label', 'aria-labelledby', 'role'];

/**
 * A breadcrumb trail consists of a list of links to the parent pages of the current page in hierarchical order.  
 * It helps users find their place within a website or web application. Breadcrumbs are often placed horizontally before a page's main content.
 *
 * ## Accessibility guidelines 💡
 * > - If the last item is a link to the current page, you must set the `aria-current` attribute to `page`.
 * > - If the element representing the current page is not a link, `aria-current` is optional.
 * > - The **aria attributes** you set on `wcs-breadcrumb` are passed to the native `nav` element located inside its shadow DOM.
 * > - You can set the attributes : `aria-label`, `aria-labelledby` and `role`. By default, `aria-label` is set to `Breadcrumb`.
 */
@Component({
    tag: 'wcs-breadcrumb',
    styleUrl: 'breadcrumb.scss',
    shadow: true,
})
export class Breadcrumb implements ComponentInterface {
    @Element() private el: HTMLElement;

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
    @Prop() ariaLabelExpandButton?: string = 'Show all breadcrumb items';

    // Show breadcrumb items that are inside the hidden-items slot.
    @State() private showHiddenItems: boolean = false;

    @Watch('maxItems')
    @Watch('itemsBeforeCollapse')
    @Watch('itemsAfterCollapse')
    handleCollapsePropsChange() {
        this.updateCollapsedViewMode();
    }

    @Watch('aria-label')
    @Watch('aria-labelledby')
    @Watch('role')
    handleAriaAttributeChange() {
        this.inheritedAttributes = {
            ...inheritAttributes(this.el, BREADCRUMB_ARIA_INHERITED_ATTRS),
        };
        forceUpdate(this);
    }

    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAttributes(this.el, BREADCRUMB_ARIA_INHERITED_ATTRS),
        };
        this.updateCollapsedViewMode();
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
            if (this.showHiddenItems) {
                this.showHiddenItems = false;
            }
            this.assignSlotNamesForCollapsedViewMode();
        } else {
            if (!this.showHiddenItems) {
                this.showHiddenItems = true;
            }
            this.assignSlotNamesForNonCollapsedViewMode();
        }
    }

    private showAllItems(): void {
        this.showHiddenItems = true;
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
            } else if (index > itemBeforeExpandBtnIndex && index < itemAfterExpandBtnIndex) {
                breadcrumbItem.slot = 'hidden-items';
            } else {
                breadcrumbItem.slot = 'items-after-expand-btn';
            }
        });
    }
    
    private assignSlotNamesForNonCollapsedViewMode(): void {
        const breadcrumbItems = this.getBreadcrumbItems();
        breadcrumbItems.forEach((breadcrumbItem) => {
            breadcrumbItem.slot = 'non-collapsed';
        });
    }

    private handleSlotChange(): void {
        this.updateCollapsedViewMode();
    }

    private renderExpandAllButton(): JSX.Element {
        return (
            <div role="listitem" class="item-not-slotted">
                <wcs-button
                    mode="clear"
                    shape="square"
                    size="s"
                    aria-label={this.ariaLabelExpandButton}
                    onClick={this.showAllItems.bind(this)}
                >
                    <wcs-mat-icon icon="more_horiz" />
                </wcs-button>
            </div>
        );
    }

    render() {
        return (
            <Host>
                <nav
                    class={`wcs-breadcrumb-container${this.showHiddenItems ? ' show-hidden-items' : ''}`}
                    aria-label="Breadcrumb"
                    {...this.inheritedAttributes}
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
                        {this.shouldCollapseItems() && !this.showHiddenItems && this.renderExpandAllButton()}
                        <slot name="items-after-expand-btn" />
                    </div>
                </nav>
            </Host>
        );
    }
}
