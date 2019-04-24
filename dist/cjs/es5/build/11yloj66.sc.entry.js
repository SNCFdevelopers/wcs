"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wcs_core_js_1 = require("../wcs.core.js");
var Icon = function () { function e() { } return e.prototype.render = function () { var e, n = { class: (e = {}, e["icons-" + this.icon] = !0, e["icons-size-" + this.size] = !0, e) }; return wcs_core_js_1.h("i", Object.assign({}, n)); }, Object.defineProperty(e, "is", { get: function () { return "wcs-icon"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { icon: { type: String, attr: "icon" }, size: { type: String, attr: "size" } }; }, enumerable: !0, configurable: !0 }), e; }();
exports.WcsIcon = Icon;
