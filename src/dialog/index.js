"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var overlay_1 = require("./../overlay");
var portal_1 = require("./../portal");
var dialog_component_1 = require("./dialog-component");
var dialog_container_1 = require("./dialog-container");
var dialog_1 = require("./dialog");
exports.PfDialogService = dialog_1.PfDialogService;
var draggable_1 = require("./../draggable");
var dialog_prompt_1 = require("./dialog-prompt");
var animations_1 = require("@angular/platform-browser/animations");
var dialog_ref_1 = require("./dialog-ref");
exports.PfDialogRef = dialog_ref_1.PfDialogRef;
var PfDialogModule = /** @class */ (function () {
    function PfDialogModule() {
    }
    PfDialogModule_1 = PfDialogModule;
    PfDialogModule.WithComponents = function (components) {
        return {
            ngModule: PfDialogModule_1,
            providers: [
                { provide: core_1.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
            ]
        };
    };
    var PfDialogModule_1;
    PfDialogModule = PfDialogModule_1 = __decorate([
        core_1.NgModule({
            imports: [overlay_1.OverlayModule, portal_1.PortalModule, common_1.CommonModule, animations_1.BrowserAnimationsModule, draggable_1.PfDraggableModule],
            declarations: [dialog_component_1.PfDialogContentComponent, dialog_component_1.PfDialogFooterComponent, dialog_component_1.PfDialogTitleComponent, dialog_container_1.PfDialogContainer, dialog_prompt_1.PfDialogPromptComponent],
            exports: [dialog_component_1.PfDialogContentComponent, dialog_component_1.PfDialogFooterComponent, dialog_component_1.PfDialogTitleComponent],
            entryComponents: [dialog_container_1.PfDialogContainer, dialog_prompt_1.PfDialogPromptComponent],
            providers: [dialog_1.PfDialogService]
        })
    ], PfDialogModule);
    return PfDialogModule;
}());
exports.PfDialogModule = PfDialogModule;
//# sourceMappingURL=index.js.map