import { Injectable, Optional, SkipSelf, OnDestroy } from '@angular/core';

@Injectable()
export class OverlayContainer implements OnDestroy {
    protected _containerElement: HTMLElement;

    ngOnDestroy() {
        if (this._containerElement && this._containerElement.parentNode) {
            this._containerElement.parentNode.removeChild(this._containerElement);
        }
    }

    getContainerElement(): HTMLElement {
        if (!this._containerElement) { this._createContainer(); }
        return this._containerElement;
    }

    protected _createContainer(): void {
        let container = document.createElement('div');
        container.classList.add('pf-overlay-container');
        document.body.appendChild(container);
        this._containerElement = container;
    }
}