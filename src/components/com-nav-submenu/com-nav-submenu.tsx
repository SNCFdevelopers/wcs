import {
    Component,
    ComponentInterface,
    h,
    Host,
    Listen,
    Prop,
    State,
    Element,
    Event,
    EventEmitter, Method
} from '@stencil/core';
import {MenuOpenedEventDetail} from '../com-nav/com-nav-interface';
import { inheritAriaAttributes, inheritAttributes, isEnterKey, isEscapeKey, isSpaceKey, setOrRemoveAttribute } from "../../utils/helpers";
import { comNavDidLoadWithResizeObserver, registerCloseHandlerForFocusOutEventOn } from "../com-nav/com-nav-utils";
import { ComNavSize } from "../com-nav/com-nav-size";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

const COM_NAV_SUBMENU_INHERITED_ATTRS = ['title'];

const WCS_COM_NAV_CATEGORY = 'WCS-COM-NAV-CATEGORY';

/**
 * The com-nav-submenu is a subcomponent of `wcs-com-nav`. It represents an expandable menu containing more items or categories.
 */
@Component({
    tag: 'wcs-com-nav-submenu',
    styleUrl: 'com-nav-submenu.scss',
    shadow: true,
})
export class ComNavSubmenu implements ComponentInterface, MutableAriaAttribute {
    @Element() private el!: HTMLWcsComNavSubmenuElement;
    private nativeButton!: HTMLButtonElement;
    private inheritedAttributes: { [k: string]: any } = {};
    
    @Prop() label: string;
    @Prop() panelTitle: string;
    @Prop() panelDescription: string;
    @State() private menuOpen: boolean = false;
    @Event() wcsSubmenuOpened: EventEmitter<MenuOpenedEventDetail>;
    /**
     * Emitted when a user click on a final navigation action.
     *
     * Used by the com-nav component to close the mobile menu overlay when a user click on a final action.
     */
    @Event() wcsClickOnFinalAction: EventEmitter<void>;

    private menuItemsId = `wcs-com-nav-submenu-items`;
    private resizeObserver: ResizeObserver;
    /**
     * To re-trigger re-render in order to render a button in case of desktop or a heading in mobile case
     * @private
     */
    @State() public currentActiveSizing: ComNavSize = 'desktop';

    componentWillLoad(): Promise<void> | void {
        const slottedCategoryItems = this.el.querySelectorAll(':scope > wcs-com-nav-category:not([slot])');
        registerCloseHandlerForFocusOutEventOn<HTMLWcsComNavCategoryElement>(slottedCategoryItems, WCS_COM_NAV_CATEGORY);

        this.inheritedAttributes = {
            ...inheritAriaAttributes(this.el),
            ...inheritAttributes(this.el, COM_NAV_SUBMENU_INHERITED_ATTRS)
        };
    }

    componentDidLoad(): void {
        if(!this.resizeObserver) {
            this.resizeObserver = comNavDidLoadWithResizeObserver(this);
            this.resizeObserver.observe(document.body);
        }
    }

    /**
     * If the user clicks outside the menu, we close it
     */
    @Listen('click', {target: 'window'})
    onWindowClickEvent(_: MouseEvent) {
        if (this.menuOpen) this.menuOpen = false;
    }

    @Listen('wcsSubmenuOpened', {target: 'window'})
    onSubmenuOpened(event: CustomEvent<MenuOpenedEventDetail>) {
        // If the clicked menu is not this component, we close it
        if (event.detail.menuElement !== this.el) {
            this.menuOpen = false;
        }
    }

    /**
     * Close the menu when escape is pressed
     * @param _event keydown event
     */
    @Listen('keydown', {target: 'window'})
    onEscapeKeyDown(_event: KeyboardEvent) {
        if (isEscapeKey(_event) && this.menuOpen) {
            this.menuOpen = false;
        }
    }

    @Method()
    async setAriaAttribute(attr: AriaAttributeName, value: string | null | undefined) {
        setOrRemoveAttribute(this.nativeButton, attr, value);
    }

    /**
     * Close the menu
     */
    @Method()
    async close() {
        this.menuOpen = false;
    }

    /**
     * Opens the menu
     */
    @Method()
    async open() {
        this.menuOpen = true;
    }

    /**
     * When the user clicks on the menu, we do not propagate the native event and we launch a custom event to manage
     * the closing of the menu correctly
     */
    private onClick(evt: MouseEvent) {
        evt.stopPropagation();
        this.wcsSubmenuOpened.emit({menuElement: this.el})
    }

    /**
     * Handle key down on menu items
     * @param _event the keyboard event
     * @private
     */
    private handleMenuItemsKeyDown(_event: KeyboardEvent) {
        if ((isSpaceKey(_event)) || isEnterKey(_event)) {
            this.handleMenuItemsClick(_event);
        }
    }

    private handleMenuItemsClick(evt: UIEvent) {
        if ((evt.target as HTMLElement).tagName === 'A') {
            this.close();
            this.wcsClickOnFinalAction.emit();
        }
    }

    /**
     * handle category item click to close the submenu
     * @param _
     * @private
     */
    @Listen('wcsCategoryItemClicked')
    // @ts-ignore
    private wcsCategoryItemClickedHandler(_: CustomEvent<UIEvent>) {
        // If a category item is clicked, we close the submenu drawer;
        this.close();
    }

    disconnectedCallback(): void {
        this.resizeObserver?.disconnect();
    }

    render(): any {
        return (
            <Host onClick={evt => this.onClick(evt)} role="listitem">
                {this.currentActiveSizing === 'mobile' ?
                    <h2 role="presentation" class="menu-button">
                        <span class="label">{this.label}</span><span class="arrow-container">
                        <span class="arrow-icon" data-open={this.menuOpen}>&#xf107;</span></span>
                    </h2>
                    : <button onClick={_ => this.menuOpen = !this.menuOpen}
                              aria-expanded={this.menuOpen ? 'true' : 'false'}
                              aria-controls={this.menuItemsId}
                              class="menu-button"
                              ref={(el) => (this.nativeButton = el)}
                              {...this.inheritedAttributes}>
                        <span class="label">{this.label}</span><span class="arrow-container">
                        <span aria-hidden="true" class="arrow-icon" data-open={this.menuOpen}>&#xf107;</span></span>
                    </button>
                }
                <div class="drawer" data-open={this.menuOpen} tabIndex={-1}>
                <div class="drawer-container">
                    <div class="drawer-content">
                        <div class="drawer-description">
                            <h3>{this.panelTitle}</h3>
                            <p>{this.panelDescription}</p>
                        </div>
                        <div role="list" aria-label={this.label} id={this.menuItemsId} class="menu-items"
                             onClick={(evt) => this.handleMenuItemsClick(evt)}
                                 onKeyDown={evt => this.handleMenuItemsKeyDown(evt)}>
                                <slot/>
                            </div>
                        </div>
                    </div>
                </div>
            </Host>
        );
    }
}
