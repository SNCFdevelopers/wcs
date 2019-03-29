import { Component, Element, Event, Prop, EventEmitter, ComponentInterface } from '@stencil/core';


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
    @Prop({ mutable: true }) value?: any | null;

    /**
     * This property should not be used,
     * it is only meant for internal use.
     * @internal
     * @ignore
     */
    @Prop({ reflectToAttr: true }) slot = 'wcs-select-option';

    @Event() wcsSelectOptionClick: EventEmitter<void>;

    componentWillLoad() {
        if (this.value === undefined) {
            this.value = this.el.textContent || '';
        }
    }

    componentDidLoad() {
        this.el.addEventListener('click', () =>
            this.wcsSelectOptionClick.emit()
        );
    }

    render() {
        return (
            <div class="wcs-selection-option-container">
                <slot />
            </div>
        );
    }
}
