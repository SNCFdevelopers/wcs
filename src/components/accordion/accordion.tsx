import { Component, Element, h, Host, Listen, Prop, Watch } from '@stencil/core';

@Component({
    tag: 'wcs-accordion',
    // styleUrl: 'accordion.scss',
    shadow: true
})
export class Accordion {
    @Element() private el!: HTMLWcsAccordionElement;
    private accordionPanels: HTMLWcsAccordionPanelElement[] = [];

    /**
     * Specifies whether accordion-panel components should display the open/close text.
     * if false, it won't show the open/close text in all accordion-panel.
     */
    @Prop({reflect: true}) hideActionText: boolean = false;

    /**
     * Specifies whether accordion-panel components should highlight when open with primary color.
     * if true, the background color of the accordion-panel will be the primary color.
     * if false, the background color of the accordion-panel will be wcs-light.
     */
    @Prop({reflect: true}) highlight: boolean = false;

    /**
     * Specifies wether accordion-panel components should group the content with header in one card
     * if true, there will be only one card with the header and the content
     * Nothing change when the panel is close
     */
    @Prop({reflect: true}) groupContentWithHeader: boolean = false;

    componentWillLoad(): Promise<void> | void {
        this.accordionPanels = this.getAllAccordionPanelsFromHostElement();

        this.updateHideActiontextOnPanel();
        this.updateHighlightOnPanel();
        this.updateGroupContentWithHeader();
    }

    @Listen('wcsOpenChange')
    wcsOpenChangeHandler(event: CustomEvent<boolean>) {
        if (event.detail) {
            this.closeAllAccordionsExcept(event.target);
        }
    }

    @Watch('hideActionText')
    private updateHideActiontextOnPanel() {
        this.accordionPanels.forEach((opt: HTMLWcsAccordionPanelElement) => {
            opt.hideActionText = this.hideActionText;
        })
    }

    @Watch('highlight')
    private updateHighlightOnPanel() {
        this.accordionPanels.forEach((opt: HTMLWcsAccordionPanelElement) => {
            opt.highlight = this.highlight;
        })
    }
    @Watch('groupContentWithHeader')
    private updateGroupContentWithHeader() {
        this.accordionPanels.forEach((opt: HTMLWcsAccordionPanelElement) => {
            opt.groupContentWithHeader = this.groupContentWithHeader;
        })
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
