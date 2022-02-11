import { Component, Element, h, Host, Listen } from '@stencil/core';

@Component({
    tag: 'wcs-accordion',
    // styleUrl: 'accordion.scss',
    shadow: true
})
export class Accordion {
    @Element() private el!: HTMLWcsAccordionElement;
    private accordionPanels: HTMLWcsAccordionPanelElement[] = [];

    componentWillLoad(): Promise<void> | void {
        this.accordionPanels = this.getAllAccordionPanelsFromHostElement();
    }


    @Listen('wcsOpenChange')
    wcsOpenChangeHandler(event: CustomEvent<boolean>) {
        if (event.detail) {
            this.closeAllAccordionsExcept(event.target);
        }
    }


    render() {
        return (
            <Host>
                <slot/>
            </Host>
        );
    }

    private getAllAccordionPanelsFromHostElement(): HTMLWcsAccordionPanelElement[] {
        return Array.from(this.el.children)
            .filter(el => el.tagName === 'WCS-ACCORDION-PANEL') as HTMLWcsAccordionPanelElement[];
    }

    /**
     * Close all accordion panels except the one that match the eventTarget reference
     */
    private closeAllAccordionsExcept(eventTarget: EventTarget): void {
        this.accordionPanels.filter(a => a !== eventTarget).forEach(a => a.close());
    }
}
