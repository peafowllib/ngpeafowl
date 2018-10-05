"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var portal_1 = require("./../portal");
var draggable_1 = require("./../draggable");
var core_2 = require("./../core");
var PfDialogContainer = /** @class */ (function (_super) {
    __extends(PfDialogContainer, _super);
    function PfDialogContainer(_changeDetectorRef, element) {
        var _this = _super.call(this) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        _this.element = element;
        _this._onPositionChanged = new core_1.EventEmitter();
        _this._animationStateChanged = new core_1.EventEmitter();
        _this._state = 'enter';
        return _this;
    }
    PfDialogContainer.prototype.ngOnInit = function () {
        if (this._config.draggable) {
            var dgHeader = undefined;
            if (core_2.isObject(this._config.draggable) && this._config.draggable.handle)
                var dgHeader = this.element.nativeElement.querySelector(this._config.draggable.handle);
            this._dragHandle.Initialize({
                handle: dgHeader,
                init: true
            });
        }
    };
    PfDialogContainer.prototype.attachComponentPortal = function (portal) {
        return this._portalHost.attachComponentPortal(portal);
    };
    PfDialogContainer.prototype.attachTemplatePortal = function (portal) {
        return this._portalHost.attachTemplatePortal(portal);
    };
    PfDialogContainer.prototype.OnDialogDragged = function (event) {
        event.isCancel = true;
        this._onPositionChanged.emit(event);
    };
    PfDialogContainer.prototype._onAnimationDone = function (event) {
        this._animationStateChanged.emit(event);
        this._isAnimating = false;
    };
    PfDialogContainer.prototype._onAnimationStart = function (event) {
        this._isAnimating = true;
        this._animationStateChanged.emit(event);
    };
    PfDialogContainer.prototype._startExitAnimation = function () {
        this._state = 'exit';
        this._changeDetectorRef.markForCheck();
    };
    __decorate([
        core_1.ViewChild(portal_1.PortalHostDirective),
        __metadata("design:type", portal_1.PortalHostDirective)
    ], PfDialogContainer.prototype, "_portalHost", void 0);
    __decorate([
        core_1.ViewChild(draggable_1.PfDraggableDirective),
        __metadata("design:type", draggable_1.PfDraggableDirective)
    ], PfDialogContainer.prototype, "_dragHandle", void 0);
    PfDialogContainer = __decorate([
        core_1.Component({
            selector: 'pf-dg-container',
            templateUrl: "dialog-container.html",
            host: {
                'class': 'pf-dg-container',
                '[@slideDialog]': '_state',
                '(@slideDialog.start)': '_onAnimationStart($event)',
                '(@slideDialog.done)': '_onAnimationDone($event)'
            },
            animations: [
                animations_1.trigger('slideDialog', [
                    animations_1.state('enter', animations_1.style({ transform: 'none', opacity: 1 })),
                    animations_1.state('void', animations_1.style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
                    animations_1.state('exit', animations_1.style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
                    animations_1.transition('* => *', animations_1.animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
                ])
            ]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.ElementRef])
    ], PfDialogContainer);
    return PfDialogContainer;
}(portal_1.BasePortalHost));
exports.PfDialogContainer = PfDialogContainer;
//# sourceMappingURL=dialog-container.js.map