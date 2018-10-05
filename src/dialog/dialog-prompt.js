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
var dialog_ref_1 = require("./dialog-ref");
var portal_1 = require("./../portal");
var PfDialogPromptComponent = /** @class */ (function () {
    function PfDialogPromptComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.type = pfPromptType.Alert;
    }
    PfDialogPromptComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._attachContentPortal();
        this._attachFooterPortal();
        if (this.type == pfPromptType.Confirm)
            this.dialogRef.beforeClose().subscribe(function (action) {
                _this.option.action.next({ action: action });
            });
    };
    PfDialogPromptComponent.prototype.onActionClicked = function (action) {
        this.dialogRef.close(action);
    };
    PfDialogPromptComponent.prototype._attachContentPortal = function () {
        var contentPortal = new portal_1.TemplatePortal(this._templateContent, null);
        if (this.option.content instanceof core_1.TemplateRef) {
            contentPortal = new portal_1.TemplatePortal(this.option.content, null);
        }
        else {
            this.content = this.option.content;
        }
        this._portalHostContent.attachTemplatePortal(contentPortal);
    };
    PfDialogPromptComponent.prototype._attachFooterPortal = function () {
        var footerTemplate = this._templateFooterConfirm;
        if (this.type == pfPromptType.Alert)
            footerTemplate = this._templateFooterAlert;
        else if (this.option.footer) {
            footerTemplate = this.option.footer;
        }
        var footerPortal = new portal_1.TemplatePortal(footerTemplate, null);
        this._portalHostFooter.attachTemplatePortal(footerPortal);
    };
    __decorate([
        core_1.ViewChild("portalHostContent", { read: portal_1.PortalHostDirective }),
        __metadata("design:type", portal_1.PortalHostDirective)
    ], PfDialogPromptComponent.prototype, "_portalHostContent", void 0);
    __decorate([
        core_1.ViewChild("portalHostFooter", { read: portal_1.PortalHostDirective }),
        __metadata("design:type", portal_1.PortalHostDirective)
    ], PfDialogPromptComponent.prototype, "_portalHostFooter", void 0);
    __decorate([
        core_1.ViewChild("templateContent"),
        __metadata("design:type", core_1.TemplateRef)
    ], PfDialogPromptComponent.prototype, "_templateContent", void 0);
    __decorate([
        core_1.ViewChild("templateFooterAlert"),
        __metadata("design:type", core_1.TemplateRef)
    ], PfDialogPromptComponent.prototype, "_templateFooterAlert", void 0);
    __decorate([
        core_1.ViewChild("templateFooterConfirm"),
        __metadata("design:type", core_1.TemplateRef)
    ], PfDialogPromptComponent.prototype, "_templateFooterConfirm", void 0);
    PfDialogPromptComponent = __decorate([
        core_1.Component({
            selector: 'pf-dg-prompt',
            templateUrl: "./dialog-prompt.html",
            host: {
                'class': 'pf-dg-prompt'
            }
        }),
        __metadata("design:paramtypes", [dialog_ref_1.PfDialogRef])
    ], PfDialogPromptComponent);
    return PfDialogPromptComponent;
}());
exports.PfDialogPromptComponent = PfDialogPromptComponent;
var pfPromptType;
(function (pfPromptType) {
    pfPromptType[pfPromptType["Alert"] = 0] = "Alert";
    pfPromptType[pfPromptType["Confirm"] = 1] = "Confirm";
})(pfPromptType = exports.pfPromptType || (exports.pfPromptType = {}));
//# sourceMappingURL=dialog-prompt.js.map