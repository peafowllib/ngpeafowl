"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStyle(elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
        view = window;
    }
    return view.getComputedStyle(elem);
}
function css(elem, getProperty) {
    var style = getStyle(elem);
    return getProperty(style);
}
exports.css = css;
//# sourceMappingURL=css.js.map