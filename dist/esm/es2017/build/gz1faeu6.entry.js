import { h } from '../wcs.core.js';

class ProgressBar {
    constructor() {
        this.small = false;
        this.showLabel = false;
        this.value = 0;
    }
    render() {
        const style = {
            width: this.value + '%'
        };
        return (h("div", { class: this.rootClasses() },
            h("div", { class: "progress-bar", style: style }, this.showLabel &&
                h("span", { class: "progress-label" },
                    this.value,
                    h("sup", null, "%")))));
    }
    rootClasses() {
        let classes = 'progress';
        if (this.small)
            classes += ' small';
        if (this.showLabel)
            classes += ' has-label';
        if (this.value === 0)
            classes += ' value-zero';
        return classes;
    }
    static get is() { return "wcs-progress-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "showLabel": {
            "type": Boolean,
            "attr": "show-label",
            "mutable": true
        },
        "small": {
            "type": Boolean,
            "attr": "small",
            "mutable": true
        },
        "value": {
            "type": Number,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get style() { return ".progress{display:-ms-flexbox;display:flex;height:.625rem;font-size:.75rem;color:#4d4f53;background-color:#fff;background-image:-webkit-gradient(linear,left top,right top,color-stop(50%,#e1ded9),color-stop(50%,transparent));background-image:linear-gradient(90deg,#e1ded9 50%,transparent 0);background-size:.25rem .625rem;border-radius:.3125rem}.progress.has-label{margin-top:2.375rem}.progress.small{height:.3125rem;overflow:hidden;background-color:#fff;background-image:none;background-size:auto;border-radius:.15625rem}.progress.value-zero>.progress-bar>.progress-label{right:unset}.progress-bar{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;color:#4d4f53;text-align:center;background-color:#0088ce;border-radius:.3125rem;-webkit-transition:width .375s ease-out;transition:width .375s ease-out}.progress-label{position:absolute;right:0;bottom:calc(100% + .5rem);font-size:1.5rem;font-weight:500}.progress-label sup{font-size:.875rem;top:-.5em;position:relative;line-height:0;vertical-align:baseline}"; }
}

export { ProgressBar as WcsProgressBar };
