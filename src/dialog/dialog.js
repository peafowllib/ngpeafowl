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
var rxjs_1 = require("rxjs");
var overlay_1 = require("./../overlay");
var portal_1 = require("./../portal");
var dialog_container_1 = require("./dialog-container");
var dialog_ref_1 = require("./dialog-ref");
var dialog_prompt_1 = require("./dialog-prompt");
var core_2 = require("./../core");
var PfDialogService = /** @class */ (function () {
    function PfDialogService(overlay, _injector) {
        this.overlay = overlay;
        this._injector = _injector;
        this._openDialogs = [];
        this._afterAllClosed = new rxjs_1.Subject();
        this._boundKeydown = this._handleKeydown.bind(this);
    }
    PfDialogService.prototype.dialog = function (digType, option) {
        return this.openDialog(digType, this._extendDefaultOption(option));
    };
    PfDialogService.prototype.alert = function (content, title, option) {
        option = this._extendDefaulAlerttOption(option);
        option.content = content;
        option.title = title;
        var dialogRef = this.openDialog(dialog_prompt_1.PfDialogPromptComponent, option);
        dialogRef.componentInstance.option = option;
        dialogRef.componentInstance.type = dialog_prompt_1.pfPromptType.Alert;
        return dialogRef;
    };
    PfDialogService.prototype.confirm = function (content, title, option) {
        option = this._extendDefaulConfirmtOption(option);
        option.content = content;
        option.title = title;
        var dialogRef = this.openDialog(dialog_prompt_1.PfDialogPromptComponent, option);
        dialogRef.componentInstance.option = option;
        dialogRef.componentInstance.type = dialog_prompt_1.pfPromptType.Confirm;
        return {
            onAction: option.action,
            dialogRef: dialogRef
        };
    };
    PfDialogService.prototype.openDialog = function (digType, option, provider) {
        var overlayRef = this.overlay.create(this._getOverlayState(option));
        var dialogContainer = this._attachDialogContainer(overlayRef, option);
        var dialogRef = this._attachDialogContent(digType, dialogContainer, overlayRef, option, provider);
        this._openDialogs.push(dialogRef);
        return dialogRef;
    };
    PfDialogService.prototype._attachDialogContainer = function (overlay, config) {
        var containerPortal = new portal_1.ComponentPortal(dialog_container_1.PfDialogContainer);
        var containerRef = overlay.attach(containerPortal);
        containerRef.instance._config = config;
        document.addEventListener("keydown", this._boundKeydown);
        return containerRef.instance;
    };
    PfDialogService.prototype._attachDialogContent = function (componentOrTemplateRef, dialogContainer, overlayRef, config, provider) {
        var dialogRef = new dialog_ref_1.PfDialogRef(overlayRef, dialogContainer);
        var contentRef = dialogContainer.attachComponentPortal(new portal_1.ComponentPortal(componentOrTemplateRef, undefined, this._createInjector(dialogRef, config)));
        dialogRef.componentInstance = contentRef.instance;
        dialogRef.updatePosition(config.position);
        return dialogRef;
    };
    PfDialogService.prototype._createInjector = function (dialogRef, config, provider) {
        if (provider === void 0) { provider = []; }
        return core_1.ReflectiveInjector.resolveAndCreate([
            {
                provide: exports.PF_DIALOG_DATA,
                useValue: config.data
            }, {
                provide: dialog_ref_1.PfDialogRef,
                useValue: dialogRef
            }
        ].concat(provider), this._injector);
    };
    PfDialogService.prototype._getOverlayState = function (dialogConfig) {
        var state = new overlay_1.OverlayState({
            hasBackdrop: dialogConfig.showBackdrop,
            width: dialogConfig.width,
            height: dialogConfig.height,
            positionStrategy: new overlay_1.GlobalPositionStrategy(),
            panelClass: ["as-dg-container"]
        });
        return state;
    };
    PfDialogService.prototype._removeOpenDialog = function (dialogRef) {
        var index = this._openDialogs.indexOf(dialogRef);
        if (index > -1) {
            this._openDialogs.splice(index, 1);
            if (!this._openDialogs.length) {
                this._afterAllClosed.next();
                document.removeEventListener('keydown', this._boundKeydown);
            }
        }
    };
    PfDialogService.prototype._handleKeydown = function (event) {
        var topDialog = this._openDialogs[this._openDialogs.length - 1];
        var canClose = topDialog ? !topDialog.closeOnEscape : false;
        if (event.keyCode === 27 && canClose) {
            topDialog.close();
        }
    };
    PfDialogService.prototype._extendDefaultOption = function (option) {
        option = option ? option : {};
        return core_2.extend({
            closeOnEscape: true,
            draggable: false,
            showBackdrop: true
        }, option);
    };
    PfDialogService.prototype._extendDefaulAlerttOption = function (option) {
        option = option ? option : {};
        return core_2.extend({
            closeOnEscape: true,
            draggable: false,
            showBackdrop: true,
            closeIcon: true
        }, option);
    };
    PfDialogService.prototype._extendDefaulConfirmtOption = function (option) {
        option = option ? option : {};
        return core_2.extend({
            draggable: false,
            showBackdrop: true,
            action: new rxjs_1.Subject(),
            buttonText: {
                cancel: "Cancel",
                Confirm: "Ok"
            }
        }, option);
    };
    PfDialogService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [overlay_1.Overlay, core_1.Injector])
    ], PfDialogService);
    return PfDialogService;
}());
exports.PfDialogService = PfDialogService;
exports.PF_DIALOG_DATA = new core_1.InjectionToken("PF dialog data");
//# sourceMappingURL=dialog.js.map