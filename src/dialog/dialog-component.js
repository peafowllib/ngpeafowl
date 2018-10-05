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
var PfDialogContentComponent = /** @class */ (function () {
    function PfDialogContentComponent() {
    }
    PfDialogContentComponent = __decorate([
        core_1.Component({
            selector: 'pf-dg-content',
            template: "<ng-content></ng-content>",
            host: {
                'class': 'pf-dg-content'
            }
        }),
        __metadata("design:paramtypes", [])
    ], PfDialogContentComponent);
    return PfDialogContentComponent;
}());
exports.PfDialogContentComponent = PfDialogContentComponent;
var PfDialogTitleComponent = /** @class */ (function () {
    function PfDialogTitleComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    PfDialogTitleComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    __decorate([
        core_1.Input("pf-title"),
        __metadata("design:type", String)
    ], PfDialogTitleComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input("pf-show-close"),
        __metadata("design:type", Boolean)
    ], PfDialogTitleComponent.prototype, "showClose", void 0);
    PfDialogTitleComponent = __decorate([
        core_1.Component({
            selector: 'pf-dg-header',
            templateUrl: "./dialog-header.html",
            host: {
                'class': 'pf-dg-header'
            }
        }),
        __metadata("design:paramtypes", [dialog_ref_1.PfDialogRef])
    ], PfDialogTitleComponent);
    return PfDialogTitleComponent;
}());
exports.PfDialogTitleComponent = PfDialogTitleComponent;
var PfDialogFooterComponent = /** @class */ (function () {
    function PfDialogFooterComponent() {
    }
    PfDialogFooterComponent = __decorate([
        core_1.Component({
            selector: 'pf-dg-footer',
            template: "<ng-content></ng-content>",
            host: {
                'class': 'pf-dg-footer'
            }
        }),
        __metadata("design:paramtypes", [])
    ], PfDialogFooterComponent);
    return PfDialogFooterComponent;
}());
exports.PfDialogFooterComponent = PfDialogFooterComponent;
//# sourceMappingURL=dialog-component.js.map