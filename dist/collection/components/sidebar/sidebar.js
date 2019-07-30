import { h } from "@stencil/core";
export class Sidebar {
    hostData() {
        return {
            'slot': 'sidebar'
        };
    }
    render() {
        return (h("nav", null,
            h("slot", { name: "link" })));
    }
    static get is() { return "wcs-sidebar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["sidebar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["sidebar.css"]
    }; }
}
