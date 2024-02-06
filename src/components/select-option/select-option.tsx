import { Component, Element, Event, Prop, EventEmitter, ComponentInterface, h, Host, Listen } from '@stencil/core';
import { SelectOptionChosedEvent } from './select-option-interface';
import { MDCRipple } from '@material/ripple';
import {isEnterKey, generateUniqueId, isSpaceKey} from "../../utils/helpers";

/**
 * The select option is a subcomponent of `wcs-select` that represents a single option in a select list.
 */
@Component({
    tag: 'wcs-select-option',
    styleUrl: 'select-option.scss'
})
export class SelectOption implements ComponentInterface {
    @Element() private el!: HTMLWcsSelectOptionElement;
    private selectOptionId: string = generateUniqueId(this.el.tagName);

    /** Whether this option can be selected. */
    @Prop({ mutable: true, reflect: true }) disabled = false;

    /** Whether this option is selected. */
    @Prop({ mutable: true, reflect: true }) selected = false;
    
    /** This property mustn't be set by hand, it is used by the `wcs-select` component.
     * Applies a highlight design on the option for autocomplete mode.
     * @internal
     * @ignore
    */
    @Prop({ mutable: true, reflect: true }) highlighted = false;

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
    @Prop({ reflect: true, mutable: true }) multiple = false;

    // @ts-ignore
    private mdcRipple: MDCRipple;

    @Event({
        eventName: 'wcsSelectOptionClick',
    })
    // TODO: find a better name ?
    wcsSelectOptionClick: EventEmitter<SelectOptionChosedEvent>;

    componentWillLoad() {
        if (this.value === undefined) {
            // If no value was given we use the text content instead.
            this.value = this.el.innerText || '';
        }
    }

    componentDidLoad() {
        this.mdcRipple = new MDCRipple(this.el);
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

    @Listen('mousedown')
    onMouseDown(event: MouseEvent) {
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
            <Host id={this.selectOptionId} aria-selected={this.selected || this.highlighted ? 'true' : 'false'} slot="wcs-select-option" role="option" tabindex="-1">
                {this.multiple &&
                    <wcs-checkbox tabindex="-1" checked={this.selected}></wcs-checkbox>
                }
                <slot />
            </Host>
        );
    }
}
