
import { PositionStrategy } from './position/position-strategy';

export class OverlayState {

    positionStrategy?: PositionStrategy;

    panelClass?: string | string[] = '';

    hasBackdrop?: boolean = false;

    backdropClass?: string = '';


    width?: number | string;


    height?: number | string;


    minWidth?: number | string;


    minHeight?: number | string;


    maxWidth?: number | string;


    maxHeight?: number | string;

    constructor(state?: OverlayState) {
        if (state) {
            Object.keys(state).forEach(key => this[key] = state[key]);
        }
    }
}