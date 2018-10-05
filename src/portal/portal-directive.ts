import {
    TemplateRef,
    ViewContainerRef,
    ElementRef,
    ComponentRef,
    EmbeddedViewRef,
    Injector,
    NgModule,
    Directive,
    ComponentFactoryResolver,
    OnDestroy,
    Input
} from '@angular/core';
import { Portal, ComponentPortal, BasePortalHost, TemplatePortal} from './portal';

@Directive({
    selector: '[pfPortalHost], [portalHost]',
    inputs: ['portal: pfPortalHost']
})
export class PortalHostDirective extends BasePortalHost implements OnDestroy {

    private _portal: Portal<any> | null = null;

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _viewContainerRef: ViewContainerRef) {
        super();
    }

    @Input('portalHost')
    get _deprecatedPortal() { return this.portal; }
    set _deprecatedPortal(v) { this.portal = v; }

    get portal(): Portal<any> | null {
        return this._portal;
    }

    set portal(portal: Portal<any> | null) {
        if (this.hasAttached()) {
            super.detach();
        }

        if (portal) {
            super.attach(portal);
        }

        this._portal = portal;
    }

    ngOnDestroy() {
        super.dispose();
        this._portal = null;
    }

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        portal.setAttachedHost(this);
        let viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;

        let componentFactory =
            this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let ref = viewContainerRef.createComponent(
            componentFactory, viewContainerRef.length,
            portal.injector || viewContainerRef.parentInjector);

        super.setDisposeFn(() => ref.destroy());
        this._portal = portal;

        return ref;
    }
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        let viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        portal.setAttachedHost(this);
        const viewRef = viewContainerRef.createEmbeddedView(portal.templateRef, portal.context);
        super.setDisposeFn(() => viewContainerRef.clear());

        this._portal = portal;

        return viewRef;
    }
}