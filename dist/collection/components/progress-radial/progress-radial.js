import { h } from "@stencil/core";
export class ProgressRadial {
    constructor() {
        this.size = 120;
        this.showLabel = false;
        this.value = 0;
    }
    render() {
        const { size, halfSize } = { size: this.size, halfSize: this.size / 2 };
        return (h("div", { class: "progress-circle", "data-component": "radial-progress" },
            h("svg", { class: "progress-circle-figure", "data-role": "figure", width: this.size, height: this.size, viewBox: `0 0 ${size} ${size}`, style: this.getSvgStyle() },
                h("circle", { class: "progress-circle-meter", cx: halfSize, cy: halfSize, r: "54", "stroke-width": "12" }),
                h("circle", { class: "progress-circle-value", cx: halfSize, cy: halfSize, r: "54", "stroke-width": "12" })),
            this.showLabel &&
                h("div", { class: "progress-circle-label", "data-role": "label" },
                    h("span", null,
                        h("span", { "data-role": "labelvalue" }, this.value),
                        h("sup", null, "%"))),
            h("input", { "data-role": "control", class: "sr-only", type: "range", value: this.value })));
    }
    getSvgStyle() {
        return {
            'stroke-dasharray': '339.292',
            'stroke-dashoffset': `${339.292 - (this.value / 100) * 339.292}`
        };
    }
    static get is() { return "wcs-progress-radial"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["progress-radial.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["progress-radial.css"]
    }; }
    static get properties() { return {
        "size": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "120"
        },
        "showLabel": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "show-label",
            "reflect": false,
            "defaultValue": "false"
        },
        "value": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "0"
        }
    }; }
}
