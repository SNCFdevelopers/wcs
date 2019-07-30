import { h } from "@stencil/core";
export class App {
    componentDidLoad() {
        const contentSlot = this.el.shadowRoot.querySelector('slot[name="content"]');
        if (contentSlot && contentSlot.assignedElements) {
            const contentEl = contentSlot.assignedElements()[0];
            contentEl.addEventListener('onscroll', (evt) => {
                console.log(evt);
            });
        }
    }
    render() {
        return [
            h("slot", { name: "header" }),
            h("slot", { name: "sidebar" }),
            h("slot", { name: "content" })
        ];
    }
    static get is() { return "wcs-app"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["app.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["app.css"]
    }; }
    static get elementRef() { return "el"; }
}
