import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, NgZone} from '@angular/core';
import { OverlayContainer } from './overlay-container';
import { DomPortalHost } from './../portal';
import {OverlayRef } from './overlay-ref';
import { OverlayState } from './overlay-state';
let nextUniqueId = 0;

let defaultState = new OverlayState();

@Injectable()
export class Overlay {
    constructor(
        private _overlayContainer: OverlayContainer,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _appRef: ApplicationRef,
        private _injector: Injector,
        private _ngZone: NgZone) {
    }

    private _createPaneElement(): HTMLElement {
        let pane = document.createElement('div');
        pane.id = `pf-overlay-${nextUniqueId++}`;
        pane.classList.add('pf-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    }

    create(state: OverlayState = defaultState) {
        const pane = this._createPaneElement();
        const portalHost = this._createPortalHost(pane);
        return new OverlayRef(portalHost, pane, state, this._ngZone);
    }

    private _createPortalHost(pane: HTMLElement): DomPortalHost {
        return new DomPortalHost(pane, this._appRef, this._componentFactoryResolver, this._injector);
    }
}