"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var css_1 = require("./css");
function position(elem) {
    var offsetParent, offset, doc, parentOffset = { top: 0, left: 0 };
    if (elem.style.position === "fixed") {
        offset = elem.getBoundingClientRect();
    }
    else {
        offset = elem.getBoundingClientRect();
        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;
        while (offsetParent &&
            (offsetParent === doc.body || offsetParent === doc.documentElement) && css_1.css(offsetParent, function (o) { return o.position; }) === "static") {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
            parentOffset = offsetParent.getBoundingClientRect();
            // parentOffset.top += offsetParent.style.borderTopWidth;
            // parentOffset.left += offsetParent.style.borderLeftWidth;
        }
    }
    return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left // - jQuery.css(elem, "marginLeft", true)
    };
}
exports.position = position;
//# sourceMappingURL=position.js.map