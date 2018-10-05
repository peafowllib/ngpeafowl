"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("./../core");
var OverlayRef = /** @class */ (function () {
    function OverlayRef(_portalHost, _pane, _state, _ngZone) {
        this._portalHost = _portalHost;
        this._pane = _pane;
        this._state = _state;
        this._ngZone = _ngZone;
        this._backdropClick = new rxjs_1.Subject();
    }
    Object.defineProperty(OverlayRef.prototype, "overlayElement", {
        get: function () {
            return this._pane;
        },
        enumerable: true,
        configurable: true
    });
    OverlayRef.prototype.getState = function () {
        return this._state;
    };
    OverlayRef.prototype.attach = function (portal) {
        var _this = this;
        var attachResult = this._portalHost.attach(portal);
        if (this._state.positionStrategy)
            this._state.positionStrategy.attach(this);
        if (this._state.hasBackdrop)
            this._attachBackdrop();
        this.updateSize();
        this.updatePosition();
        if (this._state.panelClass) {
            if (Array.isArray(this._state.panelClass)) {
                this._state.panelClass.forEach(function (cls) { return _this._pane.classList.add(cls); });
            }
            else {
                this._pane.classList.add(this._state.panelClass);
            }
        }
        return attachResult;
    };
    OverlayRef.prototype.detach = function () {
        var detachmentResult = this._portalHost.detach();
        return detachmentResult;
    };
    OverlayRef.prototype.backdropClick = function () {
        return this._backdropClick.asObservable();
    };
    OverlayRef.prototype.updatePosition = function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply();
        }
    };
    OverlayRef.prototype.updateSize = function () {
        if (this._state.width || this._state.width === 0) {
            this._pane.style.width = core_1.formatCssUnit(this._state.width);
        }
        if (this._state.height || this._state.height === 0) {
            this._pane.style.height = core_1.formatCssUnit(this._state.height);
        }
        if (this._state.minWidth || this._state.minWidth === 0) {
            this._pane.style.minWidth = core_1.formatCssUnit(this._state.minWidth);
        }
        if (this._state.minHeight || this._state.minHeight === 0) {
            this._pane.style.minHeight = core_1.formatCssUnit(this._state.minHeight);
        }
        if (this._state.maxWidth || this._state.maxWidth === 0) {
            this._pane.style.maxWidth = core_1.formatCssUnit(this._state.maxWidth);
        }
        if (this._state.maxHeight || this._state.maxHeight === 0) {
            this._pane.style.maxHeight = core_1.formatCssUnit(this._state.maxHeight);
        }
    };
    OverlayRef.prototype.detachBackdrop = function () {
        var _this = this;
        var backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            var finishDetach_1 = function () {
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                if (_this._backdropElement == backdropToDetach) {
                    _this._backdropElement = null;
                }
            };
            backdropToDetach.classList.remove('pf-overlay-backdrop-showing');
            if (this._state.backdropClass) {
                backdropToDetach.classList.remove(this._state.backdropClass);
            }
            backdropToDetach.addEventListener('transitionend', finishDetach_1);
            backdropToDetach.style.pointerEvents = 'none';
            this._ngZone.runOutsideAngular(function () {
                setTimeout(finishDetach_1, 500);
            });
        }
    };
    OverlayRef.prototype.hasAttached = function () {
        return this._portalHost.hasAttached();
    };
    OverlayRef.prototype._attachBackdrop = function () {
        var _this = this;
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('pf-overlay-backdrop');
        if (this._state.backdropClass) {
            this._backdropElement.classList.add(this._state.backdropClass);
        }
        this._pane.parentElement.insertBefore(this._backdropElement, this._pane);
        this._backdropElement.addEventListener('click', function () { return _this._backdropClick.next(null); });
        requestAnimationFrame(function () {
            if (_this._backdropElement) {
                _this._backdropElement.classList.add('pf-overlay-backdrop-showing');
            }
        });
    };
    OverlayRef.prototype.dispose = function () {
        if (this.hasAttached()) {
            if (this._state.positionStrategy) {
                this._state.positionStrategy.dispose();
            }
            this.detachBackdrop();
            this._portalHost.dispose();
        }
    };
    return OverlayRef;
}());
exports.OverlayRef = OverlayRef;
//# sourceMappingURL=overlay-ref.js.map