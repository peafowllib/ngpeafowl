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
var portal_directive_1 = require("./portal-directive");
var PortalModule = /** @class */ (function () {
    function PortalModule() {
    }
    PortalModule = __decorate([
        core_1.NgModule({
            exports: [portal_directive_1.PortalHostDirective],
            declarations: [portal_directive_1.PortalHostDirective],
        })
    ], PortalModule);
    return PortalModule;
}());
exports.PortalModule = PortalModule;
__export(require("./portal-directive"));
__export(require("./portal"));
__export(require("./dom-host-portal"));
//# sourceMappingURL=index.js.map