import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayContainer } from './overlay-container';
import { Overlay } from './overlay';

@NgModule({
    imports: [CommonModule],
    providers: [OverlayContainer, Overlay]
})
export class OverlayModule {
}

export * from './overlay-container';
export * from './overlay-ref';
export * from './overlay-state';
export * from './overlay';
export * from './position/global-position-strategy';
export * from './position/position-strategy';
