"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var overlay_container_1 = require("./overlay-container");
var portal_1 = require("./../portal");
var overlay_ref_1 = require("./overlay-ref");
var overlay_state_1 = require("./overlay-state");
var nextUniqueId = 0;
var defaultState = new overlay_state_1.OverlayState();
var Overlay = /** @class */ (function () {
    function Overlay(_overlayContainer, _componentFactoryResolver, _appRef, _injector, _ngZone) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._injector = _injector;
        this._ngZone = _ngZone;
    }
    Overlay.prototype._createPaneElement = function () {
        var pane = document.createElement('div');
        pane.id = "pf-overlay-" + nextUniqueId++;
        pane.classList.add('pf-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    };
    Overlay.prototype.create = function (state) {
        if (state === void 0) { state = defaultState; }
        var pane = this._createPaneElement();
        var portalHost = this._createPortalHost(pane);
        return new overlay_ref_1.OverlayRef(portalHost, pane, state, this._ngZone);
    };
    Overlay.prototype._createPortalHost = function (pane) {
        return new portal_1.DomPortalHost(pane, this._appRef, this._componentFactoryResolver, this._injector);
    };
    Overlay = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [overlay_container_1.OverlayContainer,
            core_1.ComponentFactoryResolver,
            core_1.ApplicationRef,
            core_1.Injector,
            core_1.NgZone])
    ], Overlay);
    return Overlay;
}());
exports.Overlay = Overlay;
//# sourceMappingURL=overlay.js.map