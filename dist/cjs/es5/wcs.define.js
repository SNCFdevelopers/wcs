"use strict";
// wcs: Custom Elements Define Library, ES Module/es5 Target
Object.defineProperty(exports, "__esModule", { value: true });
var wcs_core_js_1 = require("./wcs.core.js");
var wcs_components_js_1 = require("./wcs.components.js");
function defineCustomElements(win, opts) {
    return wcs_core_js_1.defineCustomElement(win, wcs_components_js_1.COMPONENTS, opts);
}
exports.defineCustomElements = defineCustomElements;
