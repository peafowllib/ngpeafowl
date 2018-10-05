import { NgModule, Type, ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayContainer, Overlay, OverlayModule } from './../overlay';
import { PortalModule } from './../portal';
import { PfDialogContentComponent, PfDialogFooterComponent, PfDialogTitleComponent } from './dialog-component';
import { PfDialogContainer } from './dialog-container';
import { PfDialogService } from './dialog';
import { PfDraggableModule } from './../draggable';
import { PfDialogPromptComponent } from './dialog-prompt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PfDialogRef } from './dialog-ref';

@NgModule({
    imports: [OverlayModule, PortalModule, CommonModule, BrowserAnimationsModule, PfDraggableModule],
    declarations: [PfDialogContentComponent, PfDialogFooterComponent, PfDialogTitleComponent, PfDialogContainer, PfDialogPromptComponent],
    exports: [PfDialogContentComponent, PfDialogFooterComponent, PfDialogTitleComponent],
    entryComponents: [PfDialogContainer, PfDialogPromptComponent],
    providers: [PfDialogService]
})
export class PfDialogModule {
    static WithComponents(components: Array<Type<any>>): ModuleWithProviders {
        return {
            ngModule: PfDialogModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
            ]
        };
    }
}



export { PfDialogService, PfDialogRef };
