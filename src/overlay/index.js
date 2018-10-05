"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var overlay_container_1 = require("./overlay-container");
var overlay_1 = require("./overlay");
var OverlayModule = /** @class */ (function () {
    function OverlayModule() {
    }
    OverlayModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            providers: [overlay_container_1.OverlayContainer, overlay_1.Overlay]
        })
    ], OverlayModule);
    return OverlayModule;
}());
exports.OverlayModule = OverlayModule;
__export(require("./overlay-container"));
__export(require("./overlay-ref"));
__export(require("./overlay-state"));
__export(require("./overlay"));
__export(require("./position/global-position-strategy"));
//# sourceMappingURL=index.js.map