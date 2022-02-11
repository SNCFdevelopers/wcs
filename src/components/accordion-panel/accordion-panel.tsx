import { Component, h, Host, Prop, Event, EventEmitter, Watch, Method } from '@stencil/core';
import { SelectArrow } from '../select/select-arrow';

@Component({
    tag: 'wcs-accordion-panel',
    styleUrl: 'accordion-panel.scss',
    shadow: true
})
export class AccordionPanel {
    @Prop({reflect: true, mutable: true}) open = false;


    @Event() wcsOpenChange!: EventEmitter<boolean>;

    @Watch('open')
    openChange(newValue: boolean) {
        this.wcsOpenChange.emit(newValue);
    }

    @Method()
    async close() {
        this.open = false;
    }

    render() {
        return (
            <Host>
                <div class="header" onClick={() => this.open = !this.open}>
                    <slot name="header"/>
                    <div class="header-action">
                        <span>{this.open ? 'Fermez' : 'Ouvrez'}</span>
                        <SelectArrow up={this.open}/>
                    </div>
                </div>
                <div class="content">
                    <slot name="content"/>
                </div>
            </Host>
        );
    }
}
