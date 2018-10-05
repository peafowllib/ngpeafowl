"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OverlayState = /** @class */ (function () {
    function OverlayState(state) {
        var _this = this;
        this.panelClass = '';
        this.hasBackdrop = false;
        this.backdropClass = '';
        if (state) {
            Object.keys(state).forEach(function (key) { return _this[key] = state[key]; });
        }
    }
    return OverlayState;
}());
exports.OverlayState = OverlayState;
//# sourceMappingURL=overlay-state.js.map