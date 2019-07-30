import { Component, ComponentInterface, Element, h } from '@stencil/core';


@Component({
    tag: 'wcs-app',
    styleUrl: 'app.scss',
    shadow: true
})
export class App implements ComponentInterface {
    @Element() el!: HTMLWcsAppElement;

    componentDidLoad() {
        const contentSlot: HTMLSlotElement = this.el.shadowRoot.querySelector('slot[name="content"]');
        if (contentSlot && contentSlot.assignedElements) {
            const contentEl = contentSlot.assignedElements()[0];
            contentEl.addEventListener('onscroll', (evt) => {
                console.log(evt);
            });
        }
    }

    render() {
        return [
            <slot name="header"/>,
            <slot name="sidebar"/>,
            <slot name="content"/>
        ];
    }
}
