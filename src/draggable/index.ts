import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, Type, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PfDraggableDirective } from './draggable-dirtective';

@NgModule({
    imports: [CommonModule],
    declarations: [PfDraggableDirective],
    exports: [PfDraggableDirective]
})

export class PfDraggableModule {

}

export * from './draggable-dirtective';
