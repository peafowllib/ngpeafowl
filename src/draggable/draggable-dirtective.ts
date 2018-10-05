import { Directive, ElementRef, Input, OnInit, EventEmitter, HostListener, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, takeUntil, flatMap } from 'rxjs/operators';
import { formatCssUnit, unFormatCssUnit, offsetParent, offset, position, css } from './../core';

@Directive(
    {
        selector: '[pf-draggable]',
        providers: []
    })
export class PfDraggableDirective implements OnInit {
    constructor(private elementRef: ElementRef) {
        var option = this.options;
        debugger;
    }
    private _docMouseUp = new EventEmitter<MouseEvent>();
    private _handlerMouseDown = new EventEmitter<MouseEvent>();
    private _docMouseMove = new EventEmitter<MouseEvent>();
    private _mouseDrag: Subscription;
    private _mouseStarted: boolean;
    private _mouseDownEvent: MouseEvent;
    private _positionAbs: IPoisition;
    private _originalposition: IPoisition;
    private _position: IPoisition;
    private _offset: IDragOffset;
    private HandlerElement: HTMLElement;

    @Output() onDragStart: EventEmitter<IDragEvent> = new EventEmitter();
    @Output() onDragStop: EventEmitter<any> = new EventEmitter();
    @Output() onDrag: EventEmitter<IDragEvent> = new EventEmitter();
    @Input("pf-draggable") options: IPfDraggableOption;

    private _boundHandlerMouseDown = this.onHandlerMousedown.bind(this);
    private _boundDocMouseup = this.onMouseup.bind(this);
    private _boundDocMousemove = this.onMousemove.bind(this);
    private _offsetParent: HTMLElement;

    onMouseup(event: MouseEvent) {
        this._onMouseStop(event);
        this._docMouseUp.emit(event);
    }

    onMousemove(event: MouseEvent) {
        if (this._mouseStarted) {
            this._docMouseMove.emit(event);
            return event.preventDefault();
        }
        if (this._mouseDistanceMet(event)) {
            this._onMouseStarted(this._mouseDownEvent);
            this._docMouseMove.emit(event);
        }
    }

    onHandlerMousedown(event: MouseEvent) {
        this._mouseDownEvent = event;
        document.addEventListener("mouseup", this._boundDocMouseup);
        document.addEventListener("mousemove", this._boundDocMousemove);
        this._handlerMouseDown.emit(event);
        event.preventDefault();
    }

    private _onMouseStarted(event: MouseEvent) {
        this._mouseStarted = true;
        this._positionAbs = offset(this._layoutElement);
        this._refreshOffset(event);
    }

    private _onMouseStop(event: MouseEvent) {
        document.removeEventListener("mouseup", this._boundDocMouseup);
        document.removeEventListener("mousemove", this._boundDocMousemove);
        this._mouseStarted = false;
        this._mouseDownEvent = null;
    }

    ngOnInit() {
        if (!this.options || this.options.init) {
            this.Initialize();
        }
    }

    ngOnDestroy() {
        this.Destory();
    }

    ngOnChanges(changes: any) {
    }

    Initialize(option?: IPfDraggableOption) {
        this.options = option ? option : this.options;
        this.HandlerElement = this._getHandler();
        this._offsetParent = offsetParent(this._layoutElement);
        this.HandlerElement.style.cursor = this.options.cursor ? this.options.cursor : "move";
        var listener = this._addHandlerEvent();
        this._createDrag();
    }

    private get _layoutElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }


    private _createDrag() {
        var mouseDragEvent = this._handlerMouseDown
            .pipe(flatMap((imageOffset) => {
                return this._docMouseMove.pipe(map(event => ({
                    position: {
                        top: event.pageY - unFormatCssUnit(this._offset.click.top) - unFormatCssUnit(this._offset.parent.top) - unFormatCssUnit(this._offset.relative.top),
                        left: event.pageX - unFormatCssUnit(this._offset.click.left) - unFormatCssUnit(this._offset.parent.left) - unFormatCssUnit(this._offset.relative.left)
                    },
                    handle: this.HandlerElement,
                    event: event
                })))
                    .pipe(takeUntil(this._docMouseUp));
            }));

        this._mouseDrag = mouseDragEvent.subscribe({
            next: (pos: IDragEvent) => {
                this.onDrag.emit(pos);
                if (!pos.isCancel) {
                    this._layoutElement.style.top = formatCssUnit(pos.position.top);
                    this._layoutElement.style.left = formatCssUnit(pos.position.left);
                }
            }
        });
    }

    private _generatePosition(event: MouseEvent) {
        return {
            top: event.pageY - unFormatCssUnit(this._offset.click.top) - unFormatCssUnit(this._offset.parent.top) - unFormatCssUnit(this._offset.relative.top),
            left: event.pageX - unFormatCssUnit(this._offset.click.left) - unFormatCssUnit(this._offset.parent.left) - unFormatCssUnit(this._offset.relative.left)
        };
    }

    private _refreshOffset(event: MouseEvent) {
        this._offset = {
            top: this._positionAbs.top,
            left: this._positionAbs.left,
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset()
        };
        this._offset.click = {
            top: event.pageY - unFormatCssUnit(this._offset.top),
            left: event.pageX - unFormatCssUnit(this._offset.left)
        };
    }

    private _getRelativeOffset() {
        if (css(this._layoutElement, o => o.position) !== "relative") {
            return { top: 0, left: 0 };
        }
        var p = position(this._layoutElement);
        return {
            top: p.top - unFormatCssUnit(css(this._layoutElement, o => o.top)),
            left: p.left - unFormatCssUnit(css(this._layoutElement, o => o.left))
        };
    }

    private _getParentOffset() {
        var po: IPoisition = this._offsetParent.getBoundingClientRect();
        if (this._isRootNode(this._offsetParent)) {
            po = { top: 0, left: 0 };
        }
        return {
            top: po.top,
            left: po.left
        };
    }

    private _getHandler() {
        var handler: HTMLElement = this._layoutElement;
        if (this.options.handle instanceof Node) {
            handler = this.options.handle;
        } else if (this.options.handle === 'string') {
            handler = this._layoutElement.querySelector<any>(this.options.handle);
        }
        handler.classList.add("pk-drag-handle");
        return handler;
    }

    private _isRootNode(element: Element) {
        return (/(html|body)/i).test(element.tagName) || element === document.documentElement;
    }

    private _mouseDistanceMet(event: MouseEvent) {
        return (Math.max(
            Math.abs(this._mouseDownEvent.pageX - event.pageX),
            Math.abs(this._mouseDownEvent.pageY - event.pageY)
        ) >= 1
        );
    }

    private _addHandlerEvent() {
        this.HandlerElement.addEventListener("mousedown", this._boundHandlerMouseDown);
    }

    private _removeHandlerEvent() {
        this.HandlerElement.removeEventListener("mousedown", this._boundHandlerMouseDown);
    }

    private Destory() {
        this._removeHandlerEvent();
        if (this._mouseDrag) {
            this._mouseDrag.unsubscribe();
        }
    }
}

var dragEventName = {
    start: "asDragStart",
    stop: "asDragStop"
};

export interface IPfDraggableOption {
    handle?: string | HTMLElement;
    init?: boolean;
    cursor?: string;
}

export interface IDragEvent {
    event: MouseEvent;
    position: IPoisition;
    handle: Element;
    isCancel?: boolean;
}

export interface IStartDragEvent {
    event: MouseEvent;
    position: IPoisition;
    handle: Element;
}

export interface IPoisition {
    top: number | string;
    left: number | string;
}

export interface IDragOffset extends IPoisition {
    relative?: IPoisition;
    parent?: IPoisition;
    click?: IPoisition;
}
