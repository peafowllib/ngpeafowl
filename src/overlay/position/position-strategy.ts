import { OverlayRef} from './../overlay-ref';

export interface PositionStrategy {

    attach(overlay: OverlayRef): void;
    apply(): void;
    dispose(): void;
}

