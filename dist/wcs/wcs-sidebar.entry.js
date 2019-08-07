import { r as registerInstance, h, H as Host } from './chunk-2b7d6005.js';

class Sidebar {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    hostData() {
        return {
            'slot': 'sidebar'
        };
    }
    __stencil_render() {
        return (h("nav", null, h("slot", { name: "link" })));
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ".wcs-background-primary {\n  background-color: #0088ce;\n}\n\n.wcs-color-primary {\n  color: #fff;\n}\n\n.wcs-background-primary-hover {\n  background-color: #0088ce;\n}\n.wcs-background-primary-hover:hover {\n  background-color: #00a1f4;\n  border-color: #02a9ff;\n}\n\n.wcs-background-secondary {\n  background-color: #4d4f53;\n}\n\n.wcs-color-secondary {\n  color: #fff;\n}\n\n.wcs-background-secondary-hover {\n  background-color: #4d4f53;\n}\n.wcs-background-secondary-hover:hover {\n  background-color: #5f6267;\n  border-color: #66686d;\n}\n\n.wcs-background-success {\n  background-color: #82be00;\n}\n\n.wcs-color-success {\n  color: #212529;\n}\n\n.wcs-background-success-hover {\n  background-color: #82be00;\n}\n.wcs-background-success-hover:hover {\n  background-color: #9ce400;\n  border-color: #a5f100;\n}\n\n.wcs-background-info {\n  background-color: #009aa6;\n}\n\n.wcs-color-info {\n  color: #fff;\n}\n\n.wcs-background-info-hover {\n  background-color: #009aa6;\n}\n.wcs-background-info-hover:hover {\n  background-color: #00bdcc;\n  border-color: #00c9d9;\n}\n\n.wcs-background-danger {\n  background-color: #cd0037;\n}\n\n.wcs-color-danger {\n  color: #fff;\n}\n\n.wcs-background-danger-hover {\n  background-color: #cd0037;\n}\n.wcs-background-danger-hover:hover {\n  background-color: #f30041;\n  border-color: #ff0145;\n}\n\n.wcs-background-warning {\n  background-color: #ffb612;\n}\n\n.wcs-color-warning {\n  color: #212529;\n}\n\n.wcs-background-warning-hover {\n  background-color: #ffb612;\n}\n.wcs-background-warning-hover:hover {\n  background-color: #ffc238;\n  border-color: #ffc645;\n}\n\n.wcs-background-light {\n  background-color: #f2f2f2;\n}\n\n.wcs-color-light {\n  color: #212529;\n}\n\n.wcs-background-light-hover {\n  background-color: #f2f2f2;\n}\n.wcs-background-light-hover:hover {\n  background-color: white;\n  border-color: white;\n}\n\n.wcs-background-dark {\n  background-color: #343a40;\n}\n\n.wcs-color-dark {\n  color: #fff;\n}\n\n.wcs-background-dark-hover {\n  background-color: #343a40;\n}\n.wcs-background-dark-hover:hover {\n  background-color: #454d55;\n  border-color: #4b545c;\n}\n\nnav {\n  z-index: 2;\n  background: #0088ce;\n  height: calc(100% - 2.5rem);\n  padding: 1rem 1.5rem;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 64px;\n  overflow-y: auto;\n}\n\n::slotted(a) {\n  color: white;\n  text-decoration: none;\n  display: block;\n  padding: 0.25rem;\n}"; }
}

export { Sidebar as wcs_sidebar };
