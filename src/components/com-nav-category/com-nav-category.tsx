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
import {isEnterKey, isSpaceKey} from "../../utils/helpers";

@Component({
    tag: 'wcs-com-nav-category',
    styleUrl: 'com-nav-category.scss',
    shadow: true,
})
export class ComNavCategory implements ComponentInterface {
    @Element() el!: HTMLWcsComNavCategoryElement;
    @Prop() label: string;
    @State() categoryOpen: boolean = false;
    @Event() wcsCategoryOpened: EventEmitter<CategoryOpenedEventDetail>;
    @Event() wcsCategoryItemClicked: EventEmitter<UIEvent>;

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

    /**
     * Open the menu if it is closed and closed the menu if it is already opened
     * @param _event the keyboard event
     * @private
     */
    private handleMenuKeyDown(_event: KeyboardEvent) {
        if ((isSpaceKey(_event)) || isEnterKey(_event)) {
            this.categoryOpen = !this.categoryOpen;
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
            this.wcsCategoryItemClicked.emit(evt);
        }
    }

    render(): any {
        return (
            <Host onClick={evt => this.onClick(evt)}>
                <div tabindex={screen.width < 576 ? "-1" : "0"}
                     class="label-container"
                     data-open={this.categoryOpen}
                     onKeyDown={evt => this.handleMenuKeyDown(evt)}
                     onClick={_ => this.categoryOpen = !this.categoryOpen}><span class="label">{this.label}</span></div>
                <div class="item-container"
                     data-open={this.categoryOpen}
                     onKeyDown={evt => this.handleCategoryItemsKeyDown(evt)}
                     onClick={(evt) => this.handleItemClick(evt)}>
                    <slot/>
                </div>
            </Host>
        )
    }

}
