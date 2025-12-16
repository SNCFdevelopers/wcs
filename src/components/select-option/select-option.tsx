import { Component, Element, Event, Prop, EventEmitter, ComponentInterface, h, Host, Listen } from '@stencil/core';
import { SelectOptionChosedEvent } from './select-option-interface';
import {isEnterKey, generateUniqueId, isSpaceKey} from "../../utils/helpers";

/**
 * The select option is a subcomponent of `wcs-select` that represents a single option in a select list.
 * 
 * @cssprop --wcs-select-option-background-color-default - Default background color of the option
 * @cssprop --wcs-select-option-background-color-hover - Background color of the option when hovered
 * @cssprop --wcs-select-option-background-color-press - Background color of the option when pressed
 * @cssprop --wcs-select-option-background-color-selected - Background color of the option when selected
 * @cssprop --wcs-select-option-background-color-selected-hover - Background color of the option when selected and hovered
 * @cssprop --wcs-select-option-background-color-selected-press - Background color of the option when selected and pressed
 * @cssprop --wcs-select-option-background-color-selected-disabled - Background color of the option when selected and disabled
 * @cssprop --wcs-select-option-background-color-focus - Background color of the option when focused
 * 
 * @cssprop --wcs-select-option-border-color-focus - Border color for autocomplete mode
 * @cssprop --wcs-select-option-border-width-focus - Border width for autocomplete mode
 * @cssprop --wcs-select-option-border-style-focus - Border style of the option when focused
 * 
 * @cssprop --wcs-select-option-height - Height of the option
 * @cssprop --wcs-select-option-padding-horizontal - Horizontal padding of the option
 * @cssprop --wcs-select-option-padding-vertical - Vertical padding of the option
 * 
 * @cssprop --wcs-select-option-text-font-size - Font size of the option text
 * @cssprop --wcs-select-option-text-font-weight - Font weight of the option text
 * @cssprop --wcs-select-option-text-color-default - Default color of the option text
 * @cssprop --wcs-select-option-text-color-focus - Color of the option text when focused
 * @cssprop --wcs-select-option-text-color-hover - Color of the option text when hovered
 * @cssprop --wcs-select-option-text-color-selected - Color of the option text when selected
 * @cssprop --wcs-select-option-text-color-disabled - Color of the option text when disabled
 * 
 * @cssprop --wcs-select-option-checkbox-color - Color of the checkbox
 * 
 * @cssprop --wcs-select-option-gap - Gap between the checkbox and the text
 * @cssprop --wcs-select-option-transition-duration - Duration of the transition
 */
@Component({
    tag: 'wcs-select-option',
    styleUrl: 'select-option.scss'
})
export class SelectOption implements ComponentInterface {
    @Element() private el!: HTMLWcsSelectOptionElement;
    private selectOptionId: string;

    /** Whether this option can be selected. */
    @Prop({ mutable: true, reflect: true }) disabled: boolean = false;

    /** Whether this option is selected. */
    @Prop({ mutable: true, reflect: true }) selected: boolean = false;
    
    /** This property mustn't be set by hand, it is used by the `wcs-select` component.
     * Applies a highlight design on the option for autocomplete mode.
     * @internal
     * @ignore
    */
    @Prop({ mutable: true, reflect: true }) highlighted: boolean = false;

    /** The option value, not what's displayed, use inner text instead. */
    @Prop() value?: any;

    /** Chip's displayed text color. */
    @Prop() chipColor?: string;

    /** Chip's background color. */
    @Prop() chipBackgroundColor?: string;

    /**
     * This property mustn't be set by hand, it is used by the `wcs-select` component.
     * If you want a multiple select, set `multiple` attribute on the parent select instead.
     * @internal
     * @ignore
     */
    @Prop({ reflect: true, mutable: true }) multiple: boolean = false;

    @Event({
        eventName: 'wcsSelectOptionClick',
    })
    // TODO: find a better name ?
    wcsSelectOptionClick: EventEmitter<SelectOptionChosedEvent>;

    componentWillLoad() {
        this.selectOptionId = generateUniqueId(this.el.tagName);

        if (this.value === undefined) {
            // If no value was given we use the text content instead.
            this.value = this.el.innerText || '';
        }
    }

    private chooseOption(event: UIEvent) {
        if (!this.disabled) {
            event.stopPropagation();
            // We select inner HTML as it's what's passed into the slot.
            const displayText = this.el.innerText;
            this.wcsSelectOptionClick.emit({
                source: this.el,
                value: this.value,
                displayText
            });
        }
    }

    @Listen('mouseup')
    onMouseUp(event: MouseEvent) {
        this.chooseOption(event);
    }

    /**
     * Handles the keydown event to update the selection.
     * @param event keyboard event
     */
    @Listen('keydown')
    handleKeydown(event: KeyboardEvent) {
        if(isEnterKey(event) || isSpaceKey(event)) {
            this.chooseOption(event);
            event.preventDefault();
            event.stopPropagation();
        }
    }

    render() {
        return (
            <Host id={this.selectOptionId} aria-selected={this.selected || this.highlighted ? 'true' : 'false'} slot="options" role="option" tabindex="-1">
                {this.multiple &&
                    <wcs-checkbox tabindex="-1" checked={this.selected} disabled={this.disabled}></wcs-checkbox>
                }
                <slot />
            </Host>
        );
    }
}
