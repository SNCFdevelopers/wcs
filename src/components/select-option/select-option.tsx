import { Component, Element, Event, Prop, EventEmitter, ComponentInterface } from '@stencil/core';
import { SelectOptionChosedEvent } from './select-option-interface';

@Component({
    tag: 'wcs-select-option',
    styleUrl: 'select-option.scss'
})
export class SelectOption implements ComponentInterface {

    @Element() el!: HTMLWcsSelectOptionElement;

    /**
     * Wether this option can be selected.
     */
    @Prop() disabled = false;

    /**
     * Wether this option is selected.
     */
    @Prop() selected = false;

    /**
     * The options value, not necessarily what's displayed.
     */
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
    wcsSelectOptionClick: EventEmitter<SelectOptionChosedEvent>;

    componentWillLoad() {
        if (this.value === undefined) {
            this.value = this.el.textContent || '';
        }
    }

    componentDidLoad() {
        this.el.addEventListener('click', () =>
            this.wcsSelectOptionClick.emit({
                value: this.value,
                displayText: this.el.getElementsByClassName('wcs-selection-option-container')[0].innerHTML
            })
        );
    }

    render() {
        return (
            // TODO: Try to remove this div
            <div class="wcs-selection-option-container">
                <slot />
            </div>
        );
    }
}
