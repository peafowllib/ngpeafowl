import { Subject, Observable } from 'rxjs';
import { OverlayRef, GlobalPositionStrategy } from './../overlay';
import { PfDialogContainer } from './dialog-container';
import { DialogPosition } from './dialog-option';
import { formatCssUnit } from './../core';

var uniqueId: number = 1;


export class PfDialogRef<T> {
    componentInstance: T;

    private _afterClosed: Subject<any> = new Subject();

    private _beforeClose: Subject<any> = new Subject();

    private _result: any;

    constructor(
        private _overlayRef: OverlayRef,
        private _containerInstance: PfDialogContainer,
        public readonly id: string = `md-dialog-${uniqueId++}`) {
        _containerInstance._onPositionChanged.subscribe((event) => {
            this.updatePosition(event.position);
        });
    }

    get closeOnEscape(): boolean {
        return this._containerInstance._config.closeOnEscape;
    }

   close(dialogResult?: any): void {
        this._result = dialogResult;
        this._containerInstance._animationStateChanged.subscribe((event: any) => {
            if (event.phaseName === 'start') {
                this._beforeClose.next(dialogResult);
                this._beforeClose.complete();
                this._overlayRef.detachBackdrop();
            } else if (event.phaseName === 'done' && event.toState === 'exit') {
                this._overlayRef.dispose();
                this._afterClosed.next(this._result);
                this._afterClosed.complete();
                this.componentInstance = null!;
            }
        });
        this._containerInstance._startExitAnimation();
    }

    afterClosed(): Observable<any> {
        return this._afterClosed.asObservable();
    }

    beforeClose(): Observable<any> {
        return this._beforeClose.asObservable();
    }

    backdropClick(): Observable<void> {
        return this._overlayRef.backdropClick();
    }

    updateSize(width = 'auto', height = 'auto'): this {
        // this._getPositionStrategy().width(width).height(height);
        this._overlayRef.updatePosition();
        return this;
    }

    updatePosition(position?: DialogPosition): this {
        let strategy = this._getPositionStrategy();

        if (position && (position.left || position.right || position.left === 0 || position.right === 0)) {
            position.left ? strategy.left(formatCssUnit(position.left)) : strategy.right(formatCssUnit(position.right));
        } else {
            strategy.centerHorizontally();
        }

        if (position && (position.top || position.bottom || position.top === 0 || position.bottom === 0)) {
            position.top ? strategy.top(formatCssUnit(position.top)) : strategy.bottom(formatCssUnit(position.bottom));
        } else {
            strategy.centerVertically();
        }

        this._overlayRef.updatePosition();
        return this;
    }

    _isAnimating(): boolean {
        return this._containerInstance._isAnimating;
    }

    private _getPositionStrategy(): GlobalPositionStrategy {
        return this._overlayRef.getState().positionStrategy as GlobalPositionStrategy;
    }
}