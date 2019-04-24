import { h } from '../wcs.core.js';

class App {
    componentDidLoad() {
        const contentSlot = this.el.shadowRoot.querySelector('slot[name="content"]');
        const contentEl = contentSlot.assignedElements()[0];
        contentEl.addEventListener('onscroll', (evt) => {
            console.log(evt);
        });
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
    static get properties() { return {
        "el": {
            "elementRef": true
        }
    }; }
    static get style() { return ":host{background-color:#f2f2f2;margin:0;display:grid;grid-template-areas:\"header header\" \"sidebar content\";grid-template-columns:-webkit-min-content auto;grid-template-columns:min-content auto;overflow-y:hidden}::slotted(main){padding:8px;grid-area:content;overflow-y:scroll;height:calc(100vh - 64px)}::slotted(wcs-header){grid-area:header}\@media screen and (max-width:768px){:host{grid-template-areas:\"header\" \"sidebar\" \"content\";grid-template-columns:auto}::slotted(header){position:relative}::slotted(main){overflow-y:visible;height:auto}}"; }
}

export { App as WcsApp };
