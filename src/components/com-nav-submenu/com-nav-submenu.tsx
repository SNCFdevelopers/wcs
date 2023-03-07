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
import {isEnterKey, isEscapeKey, isSpaceKey} from "../../utils/helpers";
import {registerCloseHandlerForFocusOutEventOn} from "../com-nav/com-nav-utils";


const WCS_COM_NAV_CATEGORY = 'WCS-COM-NAV-CATEGORY';

@Component({
    tag: 'wcs-com-nav-submenu',
    styleUrl: 'com-nav-submenu.scss',
    shadow: true,
})
export class ComNavSubmenu implements ComponentInterface {
    @Element() private el!: HTMLWcsComNavSubmenuElement;
    @Prop() label: string;
    @Prop() panelTitle: string;
    @Prop() panelDescription: string;
    @State() menuOpen: boolean = false;
    @Event() wcsSubmenuOpened: EventEmitter<MenuOpenedEventDetail>;
    /**
     * Emitted when a user click on a final navigation action.
     *
     * Used by the com-nav component to close the mobile menu overlay when a user click on a final action.
     */
    @Event() wcsClickOnFinalAction: EventEmitter<void>;

    componentWillLoad(): Promise<void> | void {
        const slottedCategoryItems = this.el.querySelectorAll(':scope > wcs-com-nav-category:not([slot])');
        registerCloseHandlerForFocusOutEventOn<HTMLWcsComNavCategoryElement>(slottedCategoryItems, WCS_COM_NAV_CATEGORY);
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

    /**
     * Open the menu if it is closed and closed the menu if it is already opened
     * @param _event the keyboard event
     * @private
     */
    private handleMenuKeyDown(_event: KeyboardEvent) {
        if ((isSpaceKey(_event)) || isEnterKey(_event)) {
            this.menuOpen = !this.menuOpen;
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


    render(): any {
        return (
            <Host onClick={evt => this.onClick(evt)}>
                <div tabindex={screen.width < 576 ? "-1" : "0"}
                     onClick={_ => this.menuOpen = !this.menuOpen}
                     onKeyDown={evt => this.handleMenuKeyDown(evt)}
                     class="menu-button">
                    <span class="label">{this.label}</span><span class="arrow-container"><span
                    class="arrow-icon" data-open={this.menuOpen}>&#xf107;</span></span>
                </div>
                <div class="drawer" data-open={this.menuOpen} tabIndex={-1}>
                    <div class="drawer-container">
                        <div class="drawer-content">
                            <div class="drawer-description">
                                <h3>{this.panelTitle}</h3>
                                <p>{this.panelDescription}</p>
                            </div>
                            <div class="menu-items"
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
