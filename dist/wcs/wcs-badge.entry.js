import { r as registerInstance, h, H as Host } from './chunk-2b7d6005.js';

class Badge {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Select the badge color.
         * @default 'primary'
         */
        this.color = 'primary';
    }
    createColorClass(color) {
        return {
            [`wcs-background-${color}`]: true,
            [`wcs-color-${color}`]: true
        };
    }
    hostData() {
        return {
            class: Object.assign({}, this.createColorClass(this.color))
        };
    }
    __stencil_render() {
        return (h("slot", null));
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  display: inline-block;\n  padding: 0.313rem 1.5rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.75rem;\n}"; }
}

export { Badge as wcs_badge };
