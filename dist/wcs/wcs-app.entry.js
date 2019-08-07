import { r as registerInstance, h, d as getElement } from './chunk-2b7d6005.js';

class App {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
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
    get el() { return getElement(this); }
    static get style() { return ":host {\n  background-color: #f2f2f2;\n  margin: 0;\n  display: grid;\n  grid-template-areas: \"header header\" \"sidebar content\";\n  grid-template-columns: -webkit-min-content auto;\n  grid-template-columns: min-content auto;\n  overflow-y: hidden;\n}\n\n::slotted(main) {\n  padding: 8px;\n  grid-area: content;\n  overflow-y: scroll;\n  height: calc(100vh - 64px);\n}\n\n::slotted(wcs-header) {\n  grid-area: header;\n}\n\n\@media screen and (max-width: 768px) {\n  :host {\n    grid-template-areas: \"header\" \"sidebar\" \"content\";\n    grid-template-columns: auto;\n  }\n\n  ::slotted(header) {\n    position: relative;\n  }\n\n  ::slotted(main) {\n    overflow-y: visible;\n    height: initial;\n  }\n}"; }
}

export { App as wcs_app };
