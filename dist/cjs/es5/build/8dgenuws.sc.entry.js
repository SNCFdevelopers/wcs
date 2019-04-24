"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wcs_core_js_1 = require("../wcs.core.js");
var CardBody = function () { function e() { } return e.prototype.render = function () { return wcs_core_js_1.h("slot", null); }, Object.defineProperty(e, "is", { get: function () { return "wcs-card-body"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ".sc-wcs-card-body-h{-ms-flex:1 1 auto;flex:1 1 auto;padding:var(--wcs-padding)}"; }, enumerable: !0, configurable: !0 }), e; }();
exports.WcsCardBody = CardBody;
