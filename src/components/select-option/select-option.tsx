import { Component, Element, Event, Prop, EventEmitter, ComponentInterface, h } from '@stencil/core';
import { SelectOptionChosedEvent } from './select-option-interface';

/**
 * Select option component, use in conjuction with wcs-select.
 */
@Component({
    tag: 'wcs-select-option',
    styleUrl: 'select-option.scss'
})
export class SelectOption implements ComponentInterface {
    @Element() el!: HTMLWcsSelectOptionElement;

    /** Wether this option can be selected. */
    @Prop() disabled = false;

    /** Wether this option is selected. */
    @Prop({ mutable: true }) selected = false;

    /** The option value, not what's displayed, use inner text instead. */
    @Prop({ mutable: true, reflectToAttr: true }) value?: any | null;

    /**
     * This property should not be used,
     * it is only meant for internal use.
     * @internal
     * @ignore
     */
    @Prop({ reflectToAttr: true }) slot = 'wcs-select-option';

    @Event({
        eventName: 'wcsSelectOptionClick',
    })
        // TODO: find a better name ?
    wcsSelectOptionClick: EventEmitter<SelectOptionChosedEvent>;

    componentWillLoad() {
        if (this.value === undefined) {
            // If no value was given we use the text content instead.
            this.value = this.el.textContent || '';
        }
    }

    componentDidLoad() {
        this.addClickEventListener();
    }

    private addClickEventListener() {
        this.el.addEventListener('mousedown', () => {
            if (!this.disabled) {
                // We select inner HTML as it's what's passed into the slot.
                const displayText = this.el.getElementsByClassName('wcs-selection-option-container')[0].innerHTML;
                this.wcsSelectOptionClick.emit({
                    value: this.value,
                    displayText
                });
            }
        });
    }

    render() {
        const wrapperClasses =
            (this.disabled ? 'disabled ' : '') +
            (this.selected ? 'selected ' : '');
        return (
            // TODO: Try to remove this div
            <div class={wrapperClasses + 'wcs-selection-option-container'}>
                <slot/>
            </div>
        );
    }
}
