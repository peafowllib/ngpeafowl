import { OverlayRef } from './../overlay-ref';
import { PositionStrategy } from './position-strategy';
import { Subject } from 'rxjs';

export class GlobalPositionStrategy implements PositionStrategy {

    private _cssPosition: string = 'relative';

    private _textAlign: string;
    private _verticalAlign: string = "center";

    private _topOffset: string = '';
    private _bottomOffset: string = '';
    private _leftOffset: string = '';
    private _rightOffset: string = '';
    private _overlayRef: OverlayRef;

    private _wrapper: HTMLElement;

    private _alignWrapper: HTMLElement;

    attach(overlayRef: OverlayRef): void {
        this._overlayRef = overlayRef;
    }

    top(value = ''): this {
        this._bottomOffset = '';
        this._topOffset = value;
        this._verticalAlign = 'top';
        return this;
    }

    bottom(value = ''): this {
        this._topOffset = '';
        this._bottomOffset = value;
        this._verticalAlign = 'bottom';
        return this;
    }

    left(value = ''): this {
        this._rightOffset = '';
        this._leftOffset = value;
        this._textAlign = 'left';
        return this;
    }

    right(value = ''): this {
        this._leftOffset = '';
        this._rightOffset = value;
        this._textAlign = 'right';
        return this;
    }

    centerHorizontally(offset = ''): this {
        this.left(offset);
        this._textAlign = 'center';
        return this;
    }

    centerVertically(offset = ''): this {
        this.top(offset);
        this._verticalAlign = 'center';
        return this;
    }

    apply(): void {
        const element = this._overlayRef.overlayElement;
        if (!this._wrapper && element.parentNode) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('pf-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }
        if (this._verticalAlign != 'center' && this._alignWrapper) {
            this._wrapper.removeChild(this._alignWrapper);
            this._alignWrapper = null;
        } else if (this._verticalAlign === 'center' && !this._alignWrapper) {
            this._alignWrapper = document.createElement('div');
            this._alignWrapper.classList.add('pf-global-position-anchor');
            this._wrapper.insertBefore(this._alignWrapper, this._wrapper.firstChild);
        }
        const parentElement = element.parentElement;
        parentElement.style.textAlign = this._textAlign;
        element.style.position = this._cssPosition;
        element.style.top = this._topOffset;
        element.style.left = this._leftOffset;
        element.style.bottom = this._bottomOffset;
        element.style.right = this._rightOffset;
        element.classList.add("pf-global-position-center");
    }
    dispose() {
        if (this._wrapper) {
            this._wrapper.parentElement.removeChild(this._wrapper);
            this._wrapper = null;
            this._alignWrapper = null;
        }
    }
}