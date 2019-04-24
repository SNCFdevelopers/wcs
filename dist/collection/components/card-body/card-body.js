export class CardBody {
    render() {
        return (h("slot", null));
    }
    static get is() { return "wcs-card-body"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return "/**style-placeholder:wcs-card-body:**/"; }
}
