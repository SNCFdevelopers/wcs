import { h } from "@stencil/core";
export class CardBody {
    render() {
        return (h("slot", null));
    }
    static get is() { return "wcs-card-body"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["card-body.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["card-body.css"]
    }; }
}
