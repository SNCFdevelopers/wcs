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
import { MenuOpenedEventDetail } from '../com-nav/com-nav-interface';


@Component({
    tag: 'wcs-com-nav-submenu',
    styleUrl: 'com-nav-submenu.scss',
    shadow: true,
})
export class ComNavSubmenu implements ComponentInterface {
    @Element() el!: HTMLWcsComNavSubmenuElement;
    @Prop() label: string;
    @Prop() panelTitle: string;
    @Prop() panelDescription: string;
    @State() menuOpen: boolean = false;
    @Event() wcsSubmenuOpened: EventEmitter<MenuOpenedEventDetail>;

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


    private handleMenuItemsClick(evt: MouseEvent) {
        if ((evt.target as HTMLElement).tagName === 'A') {
            this.close();
        }
    }

    /**
     * handle category item click to close the submenu
     * @param _
     * @private
     */
    @Listen('wcsCategoryItemClicked')
    // @ts-ignore
    private wcsCategoryItemClickedHandler(_: CustomEvent<MouseEvent>) {
        // If a category item is clicked, we close the submenu drawer;
        this.close();
    }


    render(): any {
        return (
            <Host onClick={evt => this.onClick(evt)}>
                <div onClick={_ => this.menuOpen = !this.menuOpen} class="menu-button">
                    <span class="label">{this.label}</span><span class="arrow-container"><span
                    class="arrow-icon" data-open={this.menuOpen}>&#xf107;</span></span>
                </div>
                <div class="drawer" data-open={this.menuOpen}>
                    <div class="drawer-container">
                        <div class="drawer-content">
                            <div>
                                <h3>{this.panelTitle}</h3>
                                <p>{this.panelDescription}</p>
                            </div>
                            <div class="menu-items" onClick={(evt) => this.handleMenuItemsClick(evt)}>
                                <slot/>
                            </div>
                        </div>
                    </div>
                </div>
            </Host>
        );
    }


}
