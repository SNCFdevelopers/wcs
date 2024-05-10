import { Component, ComponentInterface, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
import { SelectArrow } from '../select/select-arrow';
import {
    isWcsButtonSize,
    WcsButtonMode,
    WcsButtonShape,
    WcsButtonSize,
    WcsButtonSizeValues
} from '../button/button-interface';
import { createPopper, Instance } from '@popperjs/core';
import { WcsDropdownPlacement } from './dropdown-interface';
import { clickTargetIsElementOrChildren } from '../../utils/helpers';
import { getActionForKeyboardEvent, KeyboardEventAssociatedAction } from "./dropdown-keyboard-event";

/**
 * The dropdown component use a wcs-button under the hood, so you can use the same css classes as the button to style the
 * dropdown.
 * 
 * @slot placeholder - The slot containing the placeholder displayed in button
 * @slot item - The slot container the list of `wcs-dropdown-item` elements
 */
@Component({
    tag: 'wcs-dropdown',
    styleUrl: 'dropdown.scss',
    shadow: {
        delegatesFocus: true
    }
})
export class Dropdown implements ComponentInterface {
    @Element() private el: HTMLWcsDropdownElement;

    /**
     * This button is visually hidden. It used to carry all aria attributes and acts as the controller of the menu.
     * The wcs-button could not handle the aria-controls and aria-activedescendant attributes because of the IDREF
     * not passing from a shadow-dom through another.
     * @private
     */
    private nativeButton!: HTMLButtonElement;

    /**
     * This button is shown on the user interface, and visually receives focus and catch click events.
     * @private
     */
    private wcsButton!: HTMLWcsButtonElement;

    /**
     * This div is shown on the user interface when the dropdown is expanded.
     * @private
     */
    private popoverDiv!: HTMLDivElement;

    /** Hides the arrow in the button */
    @Prop() noArrow: boolean = false;

    /** Dropdown's button mode */
    @Prop() mode: WcsButtonMode = 'stroked';

    /** Dropdown's button shape */
    @Prop() shape: WcsButtonShape = 'normal';
    
    /** Dropdown's button size */
    @Prop() size: WcsButtonSize = 'm';

    /** Specifies whether the dropdown button is clickable or not */
    @Prop() disabled: boolean = false;

    /** placement of the dropdown's popover */
    @Prop() placement: WcsDropdownPlacement = 'bottom-end';

    @State() private expanded = false;


    private popper: Instance;
    
    private lastFocusedItemElement: HTMLWcsDropdownItemElement | null;
    
    private get items(): HTMLWcsDropdownItemElement[] {
        return Array.from(this.el.querySelectorAll('wcs-dropdown-item'));
    }

    @Watch('placement')
    protected placementChange() {
        this.popper.setOptions({
            ...this.popper.state.options,
            placement: this.placement
        }).then(_ => this.popper.update());
    }
    
    @Listen('blur')
    onBlur() {
        this.clearLastFocusedItem();
        this.expanded = false;
    }

    componentDidLoad() {
        if (!isWcsButtonSize(this.size)) {
            console.warn(`Invalid size value for wcs-dropdown : "${this.size}". Must be one of "${WcsButtonSizeValues.join(', ')}"`);
            this.size = "m"; // Default fallback value
        }
        
        const buttonWrapper = this.wcsButton.shadowRoot.querySelector('button');
        // FIXME : remove this line and add aria-hidden="true" to the <wcs-button> in the render when aria attribute inheritance is handled for wcs-button
        buttonWrapper.setAttribute('aria-hidden', 'true');


        this.popper = createPopper(this.wcsButton, this.popoverDiv, {
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
        this.clearLastFocusedItem();
        this.expanded = !this.expanded;
        
        if (this.expanded) {
            this.focusItem(0);
        }
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
        this.nativeButton.focus();
    }

    @Listen('keydown')
    onKeyDown(_event: KeyboardEvent): void {
        const currentState = this.expanded ? 'opened' : 'closed';
        const actionsFromKeyboardEvents: KeyboardEventAssociatedAction[] = getActionForKeyboardEvent(_event, currentState);

        // If we have at least one associated actions, we prevent the default behavior of the event. 
        // Except if the action is a focus move (we have to handle the preventDefault behavior ourselves in the action implementation)
        if (actionsFromKeyboardEvents.length != 0) {
            _event.preventDefault();
        }

        for (const actionFromKeyboardEvent of actionsFromKeyboardEvents) {
            this.doActionFromKeyboardEventAssociatedAction(actionFromKeyboardEvent);
        }
    }

    doActionFromKeyboardEventAssociatedAction(actionFromKeyboardEvent: KeyboardEventAssociatedAction) {
        switch (actionFromKeyboardEvent.kind) {
            case 'OpenMenu':
                this.expanded = true;
                this.focusItem(0);
                break;
            case 'CloseMenu':
                this.expanded = false;
                this.nativeButton.focus();
                break;
            case 'ClearFocus':
                this.clearLastFocusedItem();
                break;
            case 'FocusItem':
                switch (actionFromKeyboardEvent.target) {
                    case 'previous':
                        this.focusClosestItem('previous');
                        break;
                    case 'next':
                        this.focusClosestItem('next');
                        break;
                    case 'first':
                        this.focusItem(0);
                        break;
                    case 'last':
                        this.focusItem(this.items.length - 1);
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    /**
     * Removes the focus and tabindex 0 of the last focused item if any.
     * @private
     */
    private clearLastFocusedItem() {
        if (this.lastFocusedItemElement) {
            this.lastFocusedItemElement.tabIndex = -1;
            this.lastFocusedItemElement = null;
        }
    }
    
    private focusItem(indexToFocus: number) {
        this.clearLastFocusedItem();
        this.lastFocusedItemElement = this.items[indexToFocus];
        if (this.lastFocusedItemElement) {
            this.lastFocusedItemElement.tabIndex = 0;
            requestAnimationFrame(() => {
                this.lastFocusedItemElement?.focus();
            });
        }
    }
    
    private focusClosestItem(direction: 'next' | 'previous'): void {
        const indexToFocus = this.getClosestActiveItemIndexForDirection(direction);
        if (indexToFocus === -1) return;
        
        this.focusItem(indexToFocus);
    }
    
    private getClosestActiveItemIndexForDirection(direction: 'next' | 'previous'): number {
        const items = this.items;
        let currentIndex = Array.from(items).indexOf(this.lastFocusedItemElement);

        const MIN_INDEX = 0;
        const MAX_INDEX = items.length - 1;

        if (direction === 'next' && currentIndex < MAX_INDEX) {
            currentIndex++;
        } else if (direction === 'previous' && currentIndex > MIN_INDEX) {
            currentIndex--;
        } else {
            // Used to scroll through items infinitely with keyboard
            if (direction === 'next' && currentIndex >= MAX_INDEX) {
                currentIndex = 0;
            }
            if (direction === 'previous' && currentIndex === MIN_INDEX) {
                currentIndex = MAX_INDEX;
            }
        }
        
        return currentIndex;
    }

    componentDidRender() {
        if (this.popper) {
            this.popper.update();
        }
    }
    
    render() {
        return (
            <Host>
                <button id="dropdown-button"
                        aria-controls="menu"
                        disabled={this.disabled}
                        aria-haspopup="true"
                        role="button"
                        aria-expanded={this.expanded ? 'true' : 'false'}
                        ref={el => this.nativeButton = el}
                        onClick={($event) => this.onButtonClick($event)}
                        onBlur={($event) => $event.stopImmediatePropagation()}>Dropdown</button>
                <wcs-button mode={this.mode} shape={this.shape} disabled={this.disabled} size={this.size}
                            ref={el => this.wcsButton = el}
                            tabindex={-1}
                            onClick={($event) => this.onButtonClick($event)}
                            onBlur={(e) => e.stopImmediatePropagation()}>
                    <div class="wcs-button-content-wrapper">
                        <slot name="placeholder"/>
                        {this.noArrow ? null : (<SelectArrow up={this.expanded}/>)}
                    </div>
                </wcs-button>
                <div class={(this.expanded ? 'show ' : '') + 'popover'}
                     id="menu"
                     role="menu"
                     aria-labelledby="dropdown-button"
                     tabindex={-1}
                     ref={el => this.popoverDiv = el}>
                    <div role="presentation" id="arrow" data-popper-arrow/>
                    <div role="presentation" class="container">
                        <slot name="item">
                            <span id={"is-empty"}></span>
                        </slot>
                    </div>
                </div>
            </Host>
        );
    }
}

