import { Component, Element, Event, Prop, EventEmitter } from '@stencil/core';

@Component({
    tag: 'select-option',
    styleUrl: 'select-option.scss'
})
export class SelectOption {
    private inputId = `wcs-selopt-${selectOptionIds++}`;

    @Element() el!: HTMLElement;
    @Prop() disabled = false;
    @Prop() selected = false;
    @Prop({ mutable: true }) value?: any | null;

    /**
     * Emitted when the select option loads.
     * @internal
     */
    @Event() wcsSelectOptionDidLoad!: EventEmitter<void>;

    /**
     * Emitted when the select option unloads.
     * @internal
     */
    @Event() wcsSelectOptionDidUnload!: EventEmitter<void>;

    componentWillLoad() {
        if (this.value === undefined) {
            this.value = this.el.textContent || '';
        }
    }

    componentDidLoad() {
        this.wcsSelectOptionDidLoad.emit();
    }

    componentDidUnload() {
        this.wcsSelectOptionDidUnload.emit();
    }

    hostData() {
        return {
            'role': 'option',
            'id': this.inputId
        };
    }
}

let selectOptionIds = 0;
