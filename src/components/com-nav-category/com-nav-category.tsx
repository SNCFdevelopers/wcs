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
import {
    getCssRootPropertyValue,
    inheritAriaAttributes,
    inheritAttributes,
    isEnterKey,
    isSpaceKey, setOrRemoveAttribute
} from "../../utils/helpers";
import { AriaAttributeName, MutableAriaAttribute } from "../../utils/mutable-aria-attribute";

const COM_NAV_CATEGORY_INHERITED_ATTRS = ['title'];

/**
 * The com-nav-category is a subcomponent of `wcs-com-nav`. It represents a category nested inside a `wcs-com-nav-submenu`.
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
    @Event() wcsCategoryItemClicked: EventEmitter<UIEvent>;

    private categoryItemsId = `wcs-com-nav-category-items`;
    private resizeObserver: ResizeObserver;
    /**
     * To re-trigger re-render in order to render a button in case of desktop or a heading in mobile case
     * @private
     */
    @State() private currentActiveSizing: 'desktop' | 'mobile' = 'desktop';

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
            const smallBreakpoint = getCssRootPropertyValue('--wcs-phone-breakpoint-max-width') || '576px';
            const smallBreakpointValue = parseInt(smallBreakpoint, 10);
    
            this.resizeObserver = new ResizeObserver(entry => {
                const cr = entry[0].contentRect;
                const paddingRight = cr.right - cr.width;
                const paddingLeft = cr.left;
    
                if (cr.width < smallBreakpointValue - (paddingLeft + paddingRight)) {
                    this.currentActiveSizing = 'mobile';
                } else {
                    this.currentActiveSizing = 'desktop';
                }
            });
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
            this.wcsCategoryItemClicked.emit(evt);
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
