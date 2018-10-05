"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("./../core");
var uniqueId = 1;
var PfDialogRef = /** @class */ (function () {
    function PfDialogRef(_overlayRef, _containerInstance, id) {
        if (id === void 0) { id = "md-dialog-" + uniqueId++; }
        var _this = this;
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this.id = id;
        this._afterClosed = new rxjs_1.Subject();
        this._beforeClose = new rxjs_1.Subject();
        _containerInstance._onPositionChanged.subscribe(function (event) {
            _this.updatePosition(event.position);
        });
    }
    Object.defineProperty(PfDialogRef.prototype, "closeOnEscape", {
        get: function () {
            return this._containerInstance._config.closeOnEscape;
        },
        enumerable: true,
        configurable: true
    });
    PfDialogRef.prototype.close = function (dialogResult) {
        var _this = this;
        this._result = dialogResult;
        this._containerInstance._animationStateChanged.subscribe(function (event) {
            if (event.phaseName === 'start') {
                _this._beforeClose.next(dialogResult);
                _this._beforeClose.complete();
                _this._overlayRef.detachBackdrop();
            }
            else if (event.phaseName === 'done' && event.toState === 'exit') {
                _this._overlayRef.dispose();
                _this._afterClosed.next(_this._result);
                _this._afterClosed.complete();
                _this.componentInstance = null;
            }
        });
        this._containerInstance._startExitAnimation();
    };
    PfDialogRef.prototype.afterClosed = function () {
        return this._afterClosed.asObservable();
    };
    PfDialogRef.prototype.beforeClose = function () {
        return this._beforeClose.asObservable();
    };
    PfDialogRef.prototype.backdropClick = function () {
        return this._overlayRef.backdropClick();
    };
    PfDialogRef.prototype.updateSize = function (width, height) {
        if (width === void 0) { width = 'auto'; }
        if (height === void 0) { height = 'auto'; }
        // this._getPositionStrategy().width(width).height(height);
        this._overlayRef.updatePosition();
        return this;
    };
    PfDialogRef.prototype.updatePosition = function (position) {
        var strategy = this._getPositionStrategy();
        if (position && (position.left || position.right || position.left === 0 || position.right === 0)) {
            position.left ? strategy.left(core_1.formatCssUnit(position.left)) : strategy.right(core_1.formatCssUnit(position.right));
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom || position.top === 0 || position.bottom === 0)) {
            position.top ? strategy.top(core_1.formatCssUnit(position.top)) : strategy.bottom(core_1.formatCssUnit(position.bottom));
        }
        else {
            strategy.centerVertically();
        }
        this._overlayRef.updatePosition();
        return this;
    };
    PfDialogRef.prototype._isAnimating = function () {
        return this._containerInstance._isAnimating;
    };
    PfDialogRef.prototype._getPositionStrategy = function () {
        return this._overlayRef.getState().positionStrategy;
    };
    return PfDialogRef;
}());
exports.PfDialogRef = PfDialogRef;
//# sourceMappingURL=dialog-ref.js.map