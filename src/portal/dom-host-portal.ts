import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Type, EmbeddedViewRef, Injector } from '@angular/core';
import { PortalHost, BasePortalHost, ComponentPortal, TemplatePortal } from './portal';

export class DomPortalHost extends BasePortalHost {
    private attached: boolean = false;

    private disposeFn: () => void;

    constructor(
        private _hostDomElement: Element,
        private _appRef: ApplicationRef,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _defaultInjector: Injector) {
        super();
    }

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let componentRef: ComponentRef<T>;
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(
                componentFactory,
                portal.viewContainerRef.length,
                portal.injector || portal.viewContainerRef.parentInjector);

            this.setDisposeFn(() => componentRef.destroy());
        } else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(() => {
                this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    }

    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        let viewContainer = portal.viewContainerRef;
        let viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context);
        viewRef.detectChanges();
        viewRef.rootNodes.forEach(rootNode => this._hostDomElement.appendChild(rootNode));

        this.setDisposeFn((() => {
            let index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        return viewRef;
    }

    private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    dispose() {
        if (this.attached) {
            this.disposeFn();
        }
    }
}