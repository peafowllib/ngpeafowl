"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var css_1 = require("./css");
function offsetParent(element) {
    var offsetParent = element.offsetParent;
    while (offsetParent && css_1.css(element, function (o) { return o.position; }) === "static") {
        offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || document.documentElement;
}
exports.offsetParent = offsetParent;
function offset(element) {
    return element.getBoundingClientRect();
}
exports.offset = offset;
//# sourceMappingURL=offset.js.map