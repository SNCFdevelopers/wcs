import {
    Component,
    ComponentInterface, Element,
    h, Host, Listen, Prop, State, Watch
} from '@stencil/core';
import { SelectArrow } from '../select/select-arrow';
import { WcsButtonMode, WcsButtonShape } from '../button/button-interface';
import { createPopper, Instance } from '@popperjs/core';
import { WcsDropdownPlacement } from './dropdown-interface';
import { clickTargetIsElementOrChildren, isEscapeKey, isKeydown, isKeyup } from '../../utils/helpers';
import { isElementFocused } from "../../utils/accessibility";


@Component({
    tag: 'wcs-dropdown',
    styleUrl: 'dropdown.scss',
    shadow: true
})
export class Dropdown implements ComponentInterface {
    @Element() private el: HTMLWcsDropdownElement;

    /** Hides the arrow in the button */
    @Prop() noArrow: boolean = false;

    /** Dropdown's button mode */
    @Prop() mode: WcsButtonMode = 'stroked';

    /** Dropdown's button shape */
    @Prop() shape: WcsButtonShape = 'normal';

    /** Specifies whether the dropdown button is clickable or not */
    @Prop() disabled: boolean = false;

    /** placement of the dropdown's popover */
    @Prop() placement: WcsDropdownPlacement = 'bottom-end';

    @State() expanded = false;


    private popper: Instance;

    private buttonTextColor: string;

    @Watch('placement')
    protected placementChange() {
        this.popper.setOptions({
            ...this.popper.state.options,
            placement: this.placement
        }).then(_ => this.popper.update());
    }

    componentDidLoad() {
        const wcsButtonElement = this.el.shadowRoot.querySelector('wcs-button');
        const buttonWrapper = wcsButtonElement.shadowRoot.querySelector('button');
        this.buttonTextColor = window.getComputedStyle(buttonWrapper).color;
        const popoverDiv = this.el.shadowRoot.querySelector('.popover') as HTMLElement;


        this.popper = createPopper(wcsButtonElement, popoverDiv, {
            placement: this.placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8]
                    }
                }
            ]
        });

        if (!this.noArrow) {
            (this.el.shadowRoot.querySelector('.arrow') as HTMLElement).style.fill = this.buttonTextColor;
        }
        this.fixForFirefoxBelow63();
    }

    private fixForFirefoxBelow63() {
        // If the items appear out of the slot we place them back
        const items = this.el.querySelectorAll('wcs-dropdown-item');
        const container = this.el.querySelector('.container');
        if (items.length > 0 && container) {
            items.forEach(i => {
                this.el.removeChild(i);
                container.appendChild(i);
            });
        }
    }

    private onButtonClick(_: MouseEvent): void {
        this.expanded = !this.expanded;
    }

    @Listen('click', {target: 'window'})
    onWindowClickEvent(event: MouseEvent) {
        const clickedOnDropdownOrChildren = clickTargetIsElementOrChildren(event, this.el);
        if (this.expanded && !clickedOnDropdownOrChildren) {
            this.expanded = false;
        }
    }

    @Listen('wcsDropdownItemClick')
    dropdownItemClick(_: CustomEvent<void>) {
        this.expanded = false;
    }

    @Listen('keydown')
    onKeyDown(evt: KeyboardEvent): void {
        if (this.expanded && (isKeydown(evt) || isKeyup(evt))) {
            // If the user presses an arrow key (up or down), the browser is prevented from scrolling through
            evt.preventDefault();
            const items = Array.from(this.el.querySelectorAll('wcs-dropdown-item'));
            const currentFocusedItemIndex = items.findIndex(item => isElementFocused(item));
            // If the dropdown is expended by the user, but no item is focused and the keydown is pressed
            if (currentFocusedItemIndex === -1 && isKeydown(evt)) {
                this.focusFirstItemIfPresent(items);
            } else {
                this.moveFocusedItemByDirection(items, currentFocusedItemIndex, isKeydown(evt) ? 'down' : 'up');
            }
        }
        if (this.expanded && isEscapeKey(evt)) {
            this.closeOverlayAndFocusButton();
        }
    }


    private focusFirstItemIfPresent<T extends HTMLElement>(items: T[]) {
        if (items[0]) {
            items[0].focus();
        }
    }

    private moveFocusedItemByDirection<T extends HTMLElement>(items: T[], currentFocusedItemIndex: number, direction: 'up' | 'down') {
        const itemToFocus = items[(currentFocusedItemIndex) + (direction === 'down' ? 1 : -1)];
        if (itemToFocus) {
            itemToFocus.focus();
        }
    }

    private closeOverlayAndFocusButton() {
        this.expanded = !this.expanded;
        const wcsButton = this.el.shadowRoot.querySelector('wcs-button') as HTMLWcsButtonElement;
        wcsButton.focus();
    }

    componentDidRender() {
        if (this.popper) {
            this.popper.update();
        }
        if (!this.noArrow) {
            (this.el.shadowRoot.querySelector('.arrow') as HTMLElement).style.fill = this.buttonTextColor;
        }
    }

    render() {
        return (
            <Host>
                <wcs-button mode={this.mode} shape={this.shape} disabled={this.disabled}
                            onClick={($event) => this.onButtonClick($event)}>
                    <div class="wcs-button-content-wrapper">
                        <slot name="placeholder"/>
                        {this.noArrow ? null : (<SelectArrow up={this.expanded}/>)}
                    </div>
                </wcs-button>
                <div class={(this.expanded ? 'show ' : '') + 'popover'}>
                    <div id="arrow" data-popper-arrow/>
                    <div class="container">
                        <slot name="item"/>
                    </div>
                </div>
            </Host>
        );
    }
}

