"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatCssUnit(value) {
    return typeof value === 'string' ? value : value + "px";
}
exports.formatCssUnit = formatCssUnit;
function unFormatCssUnit(value) {
    return typeof value === 'string' ? parseInt(value) : value;
}
exports.unFormatCssUnit = unFormatCssUnit;
//# sourceMappingURL=formatter.js.map