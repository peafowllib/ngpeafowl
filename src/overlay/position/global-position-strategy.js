"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalPositionStrategy = /** @class */ (function () {
    function GlobalPositionStrategy() {
        this._cssPosition = 'relative';
        this._verticalAlign = "center";
        this._topOffset = '';
        this._bottomOffset = '';
        this._leftOffset = '';
        this._rightOffset = '';
    }
    GlobalPositionStrategy.prototype.attach = function (overlayRef) {
        this._overlayRef = overlayRef;
    };
    GlobalPositionStrategy.prototype.top = function (value) {
        if (value === void 0) { value = ''; }
        this._bottomOffset = '';
        this._topOffset = value;
        this._verticalAlign = 'top';
        return this;
    };
    GlobalPositionStrategy.prototype.bottom = function (value) {
        if (value === void 0) { value = ''; }
        this._topOffset = '';
        this._bottomOffset = value;
        this._verticalAlign = 'bottom';
        return this;
    };
    GlobalPositionStrategy.prototype.left = function (value) {
        if (value === void 0) { value = ''; }
        this._rightOffset = '';
        this._leftOffset = value;
        this._textAlign = 'left';
        return this;
    };
    GlobalPositionStrategy.prototype.right = function (value) {
        if (value === void 0) { value = ''; }
        this._leftOffset = '';
        this._rightOffset = value;
        this._textAlign = 'right';
        return this;
    };
    GlobalPositionStrategy.prototype.centerHorizontally = function (offset) {
        if (offset === void 0) { offset = ''; }
        this.left(offset);
        this._textAlign = 'center';
        return this;
    };
    GlobalPositionStrategy.prototype.centerVertically = function (offset) {
        if (offset === void 0) { offset = ''; }
        this.top(offset);
        this._verticalAlign = 'center';
        return this;
    };
    GlobalPositionStrategy.prototype.apply = function () {
        var element = this._overlayRef.overlayElement;
        if (!this._wrapper && element.parentNode) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('pf-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }
        if (this._verticalAlign != 'center' && this._alignWrapper) {
            this._wrapper.removeChild(this._alignWrapper);
            this._alignWrapper = null;
        }
        else if (this._verticalAlign === 'center' && !this._alignWrapper) {
            this._alignWrapper = document.createElement('div');
            this._alignWrapper.classList.add('pf-global-position-anchor');
            this._wrapper.insertBefore(this._alignWrapper, this._wrapper.firstChild);
        }
        var parentElement = element.parentElement;
        parentElement.style.textAlign = this._textAlign;
        element.style.position = this._cssPosition;
        element.style.top = this._topOffset;
        element.style.left = this._leftOffset;
        element.style.bottom = this._bottomOffset;
        element.style.right = this._rightOffset;
        element.classList.add("pf-global-position-center");
    };
    GlobalPositionStrategy.prototype.dispose = function () {
        if (this._wrapper) {
            this._wrapper.parentElement.removeChild(this._wrapper);
            this._wrapper = null;
            this._alignWrapper = null;
        }
    };
    return GlobalPositionStrategy;
}());
exports.GlobalPositionStrategy = GlobalPositionStrategy;
//# sourceMappingURL=global-position-strategy.js.map