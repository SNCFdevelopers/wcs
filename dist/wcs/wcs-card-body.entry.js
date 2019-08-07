import { r as registerInstance, h } from './chunk-2b7d6005.js';

class CardBody {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("slot", null));
    }
    static get style() { return ":host {\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  padding: var(--wcs-padding);\n}"; }
}

export { CardBody as wcs_card_body };
