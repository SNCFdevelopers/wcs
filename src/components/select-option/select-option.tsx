import { Component, Element, Event, Prop, EventEmitter, ComponentInterface, h, Host, Listen } from '@stencil/core';
import { SelectOptionChosedEvent } from './select-option-interface';
import { MDCRipple } from '@material/ripple';

/**
 * Select option component, use in conjunction with wcs-select.
 */
@Component({
    tag: 'wcs-select-option',
    styleUrl: 'select-option.scss'
})
export class SelectOption implements ComponentInterface {
    @Element() private el!: HTMLWcsSelectOptionElement;

    /** Wether this option can be selected. */
    @Prop({ mutable: true, reflect: true }) disabled = false;

    /** Wether this option is selected. */
    @Prop({ mutable: true, reflect: true }) selected = false;

    /** The option value, not what's displayed, use inner text instead. */
    @Prop() value?: any;

    /** Chip's displayed text color. */
    @Prop() chipColor?: string;

    /** Chip's background color. */
    @Prop() chipBackgroundColor?: string;

    /**
     * This property musn't be set by hand, it is used by the `wcs-select` component.
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

    @Listen('mousedown')
    onMouseDown(event: MouseEvent) {
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

    render() {
        return (
            <Host slot="wcs-select-option">
                {this.multiple &&
                    <wcs-checkbox checked={this.selected}></wcs-checkbox>
                }
                <slot />
            </Host>
        );
    }
}
