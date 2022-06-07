import { Component, Event, EventEmitter, h, Host, Method, Prop, Watch } from '@stencil/core';
import { SelectArrow } from '../select/select-arrow';

@Component({
    tag: 'wcs-accordion-panel',
    styleUrl: 'accordion-panel.scss',
    shadow: true
})
export class AccordionPanel {
    @Prop({reflect: true, mutable: true}) open = false;

    /**
     * Specifies whether the component should display the open/close text.
     * if false, it won't show the open/close text.
     */
    @Prop({reflect: true}) hideActionText: boolean = false;

    /**
     * Specifies whether the component should highlight when open with primary color.
     * if true, the background color will be the primary color.
     * if false, the background color will be wcs-light.
     */
    @Prop({reflect: true}) highlight: boolean = false;

    /**
     * Specifies wether the component should group the content with header in one card
     * if true, there will be only one card with the header and the content
     * Nothing change when the panel is close
     */
    @Prop({reflect: true}) groupContentWithHeader: boolean = false;

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
                        {!this.hideActionText && (
                            <span>{this.open ? 'Fermez' : 'Ouvrez'}</span>)
                        }
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
