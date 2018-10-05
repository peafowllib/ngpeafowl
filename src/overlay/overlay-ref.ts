import { PortalHost, Portal } from './../portal';
import { OverlayState } from './overlay-state';
import { Subject, Observable } from 'rxjs';
import { NgZone } from '@angular/core';
import { formatCssUnit } from './../core';

export class OverlayRef implements PortalHost {
    constructor(
        private _portalHost: PortalHost,
        private _pane: HTMLElement,
        private _state: OverlayState,
        private _ngZone: NgZone) {
    }

    private _backdropElement: HTMLElement;

    private _backdropClick: Subject<any> = new Subject();

    get overlayElement() {
        return this._pane;
    }


    getState() {
        return this._state;
    }

    attach(portal: Portal<any>): any {
        let attachResult = this._portalHost.attach(portal);
        if (this._state.positionStrategy)
            this._state.positionStrategy.attach(this);

        if (this._state.hasBackdrop)
            this._attachBackdrop();
        this.updateSize();
        this.updatePosition();

        if (this._state.panelClass) {
            if (Array.isArray(this._state.panelClass)) {
                this._state.panelClass.forEach(cls => this._pane.classList.add(cls));
            } else {
                this._pane.classList.add(this._state.panelClass);
            }
        }
        return attachResult;
    }

    detach(): Promise<any> {
        let detachmentResult = this._portalHost.detach();

        return detachmentResult;
    }

    backdropClick(): Observable<void> {
        return this._backdropClick.asObservable();
    }

    updatePosition() {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply();
        }
    }

    updateSize() {
        if (this._state.width || this._state.width === 0) {
            this._pane.style.width = formatCssUnit(this._state.width);
        }

        if (this._state.height || this._state.height === 0) {
            this._pane.style.height = formatCssUnit(this._state.height);
        }

        if (this._state.minWidth || this._state.minWidth === 0) {
            this._pane.style.minWidth = formatCssUnit(this._state.minWidth);
        }

        if (this._state.minHeight || this._state.minHeight === 0) {
            this._pane.style.minHeight = formatCssUnit(this._state.minHeight);
        }

        if (this._state.maxWidth || this._state.maxWidth === 0) {
            this._pane.style.maxWidth = formatCssUnit(this._state.maxWidth);
        }

        if (this._state.maxHeight || this._state.maxHeight === 0) {
            this._pane.style.maxHeight = formatCssUnit(this._state.maxHeight);
        }
    }

    detachBackdrop(): void {
        let backdropToDetach = this._backdropElement;

        if (backdropToDetach) {
            let finishDetach = () => {
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                if (this._backdropElement == backdropToDetach) {
                    this._backdropElement = null;
                }
            };

            backdropToDetach.classList.remove('pf-overlay-backdrop-showing');

            if (this._state.backdropClass) {
                backdropToDetach.classList.remove(this._state.backdropClass);
            }

            backdropToDetach.addEventListener('transitionend', finishDetach);

            backdropToDetach.style.pointerEvents = 'none';

            this._ngZone.runOutsideAngular(() => {
                setTimeout(finishDetach, 500);
            });
        }
    }

    hasAttached() {
        return this._portalHost.hasAttached();
    }

    private _attachBackdrop() {
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('pf-overlay-backdrop');

        if (this._state.backdropClass) {
            this._backdropElement.classList.add(this._state.backdropClass);
        }

        this._pane.parentElement!.insertBefore(this._backdropElement, this._pane);

        this._backdropElement.addEventListener('click', () => this._backdropClick.next(null));

        requestAnimationFrame(() => {
            if (this._backdropElement) {
                this._backdropElement.classList.add('pf-overlay-backdrop-showing');
            }
        });

    }

    dispose() {
        if (this.hasAttached()) {
            if (this._state.positionStrategy) {
                this._state.positionStrategy.dispose();
            }

            this.detachBackdrop();
            this._portalHost.dispose();
        }
    }
}
