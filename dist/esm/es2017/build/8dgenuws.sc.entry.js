import { h } from '../wcs.core.js';

class CardBody {
    render() {
        return (h("slot", null));
    }
    static get is() { return "wcs-card-body"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return ".sc-wcs-card-body-h{-ms-flex:1 1 auto;flex:1 1 auto;padding:var(--wcs-padding)}"; }
}

export { CardBody as WcsCardBody };
