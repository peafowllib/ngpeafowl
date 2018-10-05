import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild, ComponentRef, Optional, Inject, EventEmitter, ChangeDetectorRef, OnInit, ElementRef, EmbeddedViewRef, HostBinding } from '@angular/core';
import { BasePortalHost, PortalHostDirective, ComponentPortal, TemplatePortal } from './../portal';
import { DOCUMENT } from '@angular/platform-browser';
import { PfDialogOption, IDraggableOption } from './dialog-option';
import { IDragEvent, PfDraggableDirective, IPfDraggableOption } from './../draggable';
import { PfDialogTitleComponent } from './dialog-component';
import { isObject } from './../core';
@Component({
    selector: 'pf-dg-container',
    templateUrl: "dialog-container.html",
    host: {
        'class': 'pf-dg-container',
        '[@slideDialog]': '_state',
        '(@slideDialog.start)': '_onAnimationStart($event)',
        '(@slideDialog.done)': '_onAnimationDone($event)'
    },
    animations: [
        trigger('slideDialog', [
            state('enter', style({ transform: 'none', opacity: 1 })),
            state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
            state('exit', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
            transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
        ])
    ]
})
export class PfDialogContainer extends BasePortalHost implements OnInit {

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private element: ElementRef) {
        super();
    }
    _onPositionChanged: EventEmitter<IDragEvent> = new EventEmitter();

    _config: PfDialogOption;

    @ViewChild(PortalHostDirective) _portalHost: PortalHostDirective;

    @ViewChild(PfDraggableDirective) _dragHandle: PfDraggableDirective;

    _animationStateChanged = new EventEmitter<AnimationEvent>();

    _state: 'void' | 'enter' | 'exit' = 'enter';

    _isAnimating: boolean;

    ngOnInit() {
        if (this._config.draggable) {
            var dgHeader = undefined;
            if (isObject(this._config.draggable) && (<IDraggableOption>this._config.draggable).handle)
                var dgHeader = (<HTMLElement>this.element.nativeElement).querySelector<any>((<IDraggableOption>this._config.draggable).handle);
            this._dragHandle.Initialize({
                handle: dgHeader,
                init: true
            });
        }
    }

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        return this._portalHost.attachComponentPortal(portal);
    }

    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        return this._portalHost.attachTemplatePortal(portal);
    }

    OnDialogDragged(event: IDragEvent) {
        event.isCancel = true;
        this._onPositionChanged.emit(event);
    }

    _onAnimationDone(event: AnimationEvent) {
        this._animationStateChanged.emit(event);
        this._isAnimating = false;
    }

    _onAnimationStart(event: AnimationEvent) {
        this._isAnimating = true;
        this._animationStateChanged.emit(event);
    }

    _startExitAnimation(): void {
        this._state = 'exit';
        this._changeDetectorRef.markForCheck();
    }
}