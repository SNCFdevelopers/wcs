import {
    Component,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Listen, Method,
    Prop,
    State
} from '@stencil/core';
import { CategoryOpenedEventDetail } from '../com-nav/com-nav-interface';
import { inheritAriaAttributes, inheritAttributes, setOrRemoveAttribute, isEnterKey, isSpaceKey } from "../../utils/helpers";
import { comNavDidLoadWithResizeObserver } from "../com-nav/com-nav-utils";
import { ComNavSize } from "../com-nav/com-nav-size";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

const COM_NAV_CATEGORY_INHERITED_ATTRS = ['title'];

/**
 * The com-nav-category is a subcomponent of `wcs-com-nav`. It represents a category nested inside a `wcs-com-nav-submenu`.
 * 
 * @cssprop --wcs-com-nav-category-label-font-size - Label font-size
 * @cssprop --wcs-com-nav-category-label-mobile-font-weight - Label font-weight on mobile
 * @cssprop --wcs-com-nav-category-label-mobile-color - Label color on mobile 
 * @cssprop --wcs-com-nav-category-label-desktop-font-weight - Label font-weight on desktop
 * @cssprop --wcs-com-nav-category-label-desktop-color - Label color on mobile
 * @cssprop --wcs-com-nav-category-item-mobile-color - Color of category item (mobile)
 * @cssprop --wcs-com-nav-category-item-mobile-font-weight - Font weight of category item (mobile)
 * @cssprop --wcs-com-nav-category-item-mobile-spacing-top - Spacing top around items group (mobile)
 * @cssprop --wcs-com-nav-category-item-mobile-spacing-left - Spacing left around items group (mobile)
 * @cssprop --wcs-com-nav-category-item-mobile-gap - Gap between each category item (mobile)
 * @cssprop --wcs-com-nav-category-label-desktop-gap - Gap inside category label, between text and arrow
 * @cssprop --wcs-com-nav-category-label-desktop-focus-outline-color - Focus outline of the label (desktop)
 * @cssprop --wcs-com-nav-category-desktop-menu-background-color - Background color of the category menu (desktop)
 * @cssprop --wcs-com-nav-category-desktop-menu--border-left-width - Border left width of the category menu
 * @cssprop --wcs-com-nav-category-desktop-menu--border-left-color - Border left color of the category menu
 * @cssprop --wcs-com-nav-category-desktop-menu-background-indicator-color - Indicator color on top of menu
 * @cssprop --wcs-com-nav-category-desktop-menu-padding-top - Padding top of menu
 * @cssprop --wcs-com-nav-category-desktop-menu-padding-bottom - Padding bottom of menu
 * @cssprop --wcs-com-nav-category-desktop-menu-padding-left - Padding left of menu
 * @cssprop --wcs-com-nav-category-desktop-menu-padding-right - Padding right of menu
 * @cssprop --wcs-com-nav-category-desktop-menu-gap - Gap between each item (desktop)
 * @cssprop --wcs-com-nav-category-item-desktop-color - Color of category item (desktop)
 * @cssprop --wcs-com-nav-category-item-desktop-font-weight - Font weight of category item (desktop)
 */
@Component({
    tag: 'wcs-com-nav-category',
    styleUrl: 'com-nav-category.scss',
    shadow: true,
})
export class ComNavCategory implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLWcsComNavCategoryElement;
    private nativeButton!: HTMLButtonElement;
    private inheritedAttributes: { [k: string]: any } = {};
    
    @Prop() label: string;
    @State() private categoryOpen: boolean = false;
    @Event() wcsCategoryOpened: EventEmitter<CategoryOpenedEventDetail>;

    private categoryItemsId = `wcs-com-nav-category-items`;
    private resizeObserver: ResizeObserver;
    /**
     * To re-trigger re-render in order to render a button in case of desktop or a heading in mobile case
     * @private
     */
    @State() public currentActiveSizing: ComNavSize = 'desktop';

    @Listen('click', {target: 'window'})
    onWindowClickEvent(_: MouseEvent) {
        if (this.categoryOpen) this.categoryOpen = false;
    }

    @Listen('wcsCategoryOpened', {target: 'window'})
    onSubmenuOpened(event: CustomEvent<CategoryOpenedEventDetail>) {
        if (event.detail.categoryElement !== this.el) {
            this.categoryOpen = false;
        }
    }

    componentDidLoad(): void {
        if(!this.resizeObserver) {
            this.resizeObserver = comNavDidLoadWithResizeObserver(this);
            this.resizeObserver.observe(document.body);
        }
    }

    /**
     * Handle key down on category items
     * @param _event the keyboard event
     * @private
     */
    private handleCategoryItemsKeyDown(_event: KeyboardEvent) {
        if ((isSpaceKey(_event)) || isEnterKey(_event)) {
            this.handleItemClick(_event);
        }
    }
    
    componentWillLoad(): Promise<void> | void {
        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, COM_NAV_CATEGORY_INHERITED_ATTRS)
        };
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeButton, attr, value);
    }

    /**
     * Close the category
     */
    @Method()
    async close() {
        this.categoryOpen = false;
    }

    /**
     * Opens the category
     */
    @Method()
    async open() {
        this.categoryOpen = true;
    }

    /**
     * When the user clicks on the menu, we do not propagate the native event and we launch a custom event to manage
     * the closing of the menu correctly
     */
    private onClick(evt: MouseEvent) {
        evt.stopPropagation();
        this.wcsCategoryOpened.emit({categoryElement: this.el})
    }


    /**
     * Close the category and fire item click if we detect a mouse click on a slotted `a` element.
     * @param evt
     * @private
     */
    private handleItemClick(evt: UIEvent) {
        if ((evt.target as HTMLElement).tagName === 'A') {
            this.close();
        }
    }

    disconnectedCallback(): void {
        this.resizeObserver?.disconnect();
    }

    render(): any {
        return (
            <Host role={"listitem"} onClick={evt => this.onClick(evt)}>
                {
                    this.currentActiveSizing === 'mobile' ?
                        <h3 role="presentation" class="label-container">
                            <span class="label">{this.label}</span>
                        </h3>
                        : <button class="label-container"
                            aria-controls={this.categoryItemsId}
                            aria-expanded={this.categoryOpen ? 'true' : 'false'}
                            ref={(el) => (this.nativeButton = el)}
                            onClick={_ => this.categoryOpen = !this.categoryOpen}
                            {...this.inheritedAttributes}>
                            <span class="label">{this.label}</span>
                            <span class="arrow-container">
                                <span aria-hidden="true" class="arrow-icon">&#xf107;</span>
                            </span>
                        </button>
                }
                <div class="item-container"
                    role="list"
                    aria-label={this.label}
                    id={this.categoryItemsId}
                    tabIndex={-1}
                    data-open={this.categoryOpen}
                    onKeyDown={evt => this.handleCategoryItemsKeyDown(evt)}
                    onClick={(evt) => this.handleItemClick(evt)}>
                    <slot/>
                </div>
            </Host>
        )
    }

}
