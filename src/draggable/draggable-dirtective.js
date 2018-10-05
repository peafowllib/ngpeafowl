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
var operators_1 = require("rxjs/operators");
var core_2 = require("./../core");
var PfDraggableDirective = /** @class */ (function () {
    function PfDraggableDirective(elementRef) {
        this.elementRef = elementRef;
        this._docMouseUp = new core_1.EventEmitter();
        this._handlerMouseDown = new core_1.EventEmitter();
        this._docMouseMove = new core_1.EventEmitter();
        this.onDragStart = new core_1.EventEmitter();
        this.onDragStop = new core_1.EventEmitter();
        this.onDrag = new core_1.EventEmitter();
        this._boundHandlerMouseDown = this.onHandlerMousedown.bind(this);
        this._boundDocMouseup = this.onMouseup.bind(this);
        this._boundDocMousemove = this.onMousemove.bind(this);
        var option = this.options;
        debugger;
    }
    PfDraggableDirective.prototype.onMouseup = function (event) {
        this._onMouseStop(event);
        this._docMouseUp.emit(event);
    };
    PfDraggableDirective.prototype.onMousemove = function (event) {
        if (this._mouseStarted) {
            this._docMouseMove.emit(event);
            return event.preventDefault();
        }
        if (this._mouseDistanceMet(event)) {
            this._onMouseStarted(this._mouseDownEvent);
            this._docMouseMove.emit(event);
        }
    };
    PfDraggableDirective.prototype.onHandlerMousedown = function (event) {
        this._mouseDownEvent = event;
        document.addEventListener("mouseup", this._boundDocMouseup);
        document.addEventListener("mousemove", this._boundDocMousemove);
        this._handlerMouseDown.emit(event);
        event.preventDefault();
    };
    PfDraggableDirective.prototype._onMouseStarted = function (event) {
        this._mouseStarted = true;
        this._positionAbs = core_2.offset(this._layoutElement);
        this._refreshOffset(event);
    };
    PfDraggableDirective.prototype._onMouseStop = function (event) {
        document.removeEventListener("mouseup", this._boundDocMouseup);
        document.removeEventListener("mousemove", this._boundDocMousemove);
        this._mouseStarted = false;
        this._mouseDownEvent = null;
    };
    PfDraggableDirective.prototype.ngOnInit = function () {
        if (!this.options || this.options.init) {
            this.Initialize();
        }
    };
    PfDraggableDirective.prototype.ngOnDestroy = function () {
        this.Destory();
    };
    PfDraggableDirective.prototype.ngOnChanges = function (changes) {
    };
    PfDraggableDirective.prototype.Initialize = function (option) {
        this.options = option ? option : this.options;
        this.HandlerElement = this._getHandler();
        this._offsetParent = core_2.offsetParent(this._layoutElement);
        this.HandlerElement.style.cursor = this.options.cursor ? this.options.cursor : "move";
        var listener = this._addHandlerEvent();
        this._createDrag();
    };
    Object.defineProperty(PfDraggableDirective.prototype, "_layoutElement", {
        get: function () {
            return this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    PfDraggableDirective.prototype._createDrag = function () {
        var _this = this;
        var mouseDragEvent = this._handlerMouseDown
            .pipe(operators_1.flatMap(function (imageOffset) {
            return _this._docMouseMove.pipe(operators_1.map(function (event) { return ({
                position: {
                    top: event.pageY - core_2.unFormatCssUnit(_this._offset.click.top) - core_2.unFormatCssUnit(_this._offset.parent.top) - core_2.unFormatCssUnit(_this._offset.relative.top),
                    left: event.pageX - core_2.unFormatCssUnit(_this._offset.click.left) - core_2.unFormatCssUnit(_this._offset.parent.left) - core_2.unFormatCssUnit(_this._offset.relative.left)
                },
                handle: _this.HandlerElement,
                event: event
            }); }))
                .pipe(operators_1.takeUntil(_this._docMouseUp));
        }));
        this._mouseDrag = mouseDragEvent.subscribe({
            next: function (pos) {
                _this.onDrag.emit(pos);
                if (!pos.isCancel) {
                    _this._layoutElement.style.top = core_2.formatCssUnit(pos.position.top);
                    _this._layoutElement.style.left = core_2.formatCssUnit(pos.position.left);
                }
            }
        });
    };
    PfDraggableDirective.prototype._generatePosition = function (event) {
        return {
            top: event.pageY - core_2.unFormatCssUnit(this._offset.click.top) - core_2.unFormatCssUnit(this._offset.parent.top) - core_2.unFormatCssUnit(this._offset.relative.top),
            left: event.pageX - core_2.unFormatCssUnit(this._offset.click.left) - core_2.unFormatCssUnit(this._offset.parent.left) - core_2.unFormatCssUnit(this._offset.relative.left)
        };
    };
    PfDraggableDirective.prototype._refreshOffset = function (event) {
        this._offset = {
            top: this._positionAbs.top,
            left: this._positionAbs.left,
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset()
        };
        this._offset.click = {
            top: event.pageY - core_2.unFormatCssUnit(this._offset.top),
            left: event.pageX - core_2.unFormatCssUnit(this._offset.left)
        };
    };
    PfDraggableDirective.prototype._getRelativeOffset = function () {
        if (core_2.css(this._layoutElement, function (o) { return o.position; }) !== "relative") {
            return { top: 0, left: 0 };
        }
        var p = core_2.position(this._layoutElement);
        return {
            top: p.top - core_2.unFormatCssUnit(core_2.css(this._layoutElement, function (o) { return o.top; })),
            left: p.left - core_2.unFormatCssUnit(core_2.css(this._layoutElement, function (o) { return o.left; }))
        };
    };
    PfDraggableDirective.prototype._getParentOffset = function () {
        var po = this._offsetParent.getBoundingClientRect();
        if (this._isRootNode(this._offsetParent)) {
            po = { top: 0, left: 0 };
        }
        return {
            top: po.top,
            left: po.left
        };
    };
    PfDraggableDirective.prototype._getHandler = function () {
        var handler = this._layoutElement;
        if (this.options.handle instanceof Node) {
            handler = this.options.handle;
        }
        else if (this.options.handle === 'string') {
            handler = this._layoutElement.querySelector(this.options.handle);
        }
        handler.classList.add("pk-drag-handle");
        return handler;
    };
    PfDraggableDirective.prototype._isRootNode = function (element) {
        return (/(html|body)/i).test(element.tagName) || element === document.documentElement;
    };
    PfDraggableDirective.prototype._mouseDistanceMet = function (event) {
        return (Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= 1);
    };
    PfDraggableDirective.prototype._addHandlerEvent = function () {
        this.HandlerElement.addEventListener("mousedown", this._boundHandlerMouseDown);
    };
    PfDraggableDirective.prototype._removeHandlerEvent = function () {
        this.HandlerElement.removeEventListener("mousedown", this._boundHandlerMouseDown);
    };
    PfDraggableDirective.prototype.Destory = function () {
        this._removeHandlerEvent();
        if (this._mouseDrag) {
            this._mouseDrag.unsubscribe();
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PfDraggableDirective.prototype, "onDragStart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PfDraggableDirective.prototype, "onDragStop", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PfDraggableDirective.prototype, "onDrag", void 0);
    __decorate([
        core_1.Input("pf-draggable"),
        __metadata("design:type", Object)
    ], PfDraggableDirective.prototype, "options", void 0);
    PfDraggableDirective = __decorate([
        core_1.Directive({
            selector: '[pf-draggable]',
            providers: []
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], PfDraggableDirective);
    return PfDraggableDirective;
}());
exports.PfDraggableDirective = PfDraggableDirective;
var dragEventName = {
    start: "asDragStart",
    stop: "asDragStop"
};
//# sourceMappingURL=draggable-dirtective.js.map