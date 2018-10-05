import {
    NgModule
} from '@angular/core';
import { PortalHostDirective} from './portal-directive';

@NgModule({
    exports: [PortalHostDirective],
    declarations: [PortalHostDirective],
})
export class PortalModule { }


export * from './portal-directive';
export * from './portal';
export * from './dom-host-portal';