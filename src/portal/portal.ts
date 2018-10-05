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

export interface ComponentType<T> {
    new(...args: any[]): T;
}

export interface PortalHost {
    attach(portal: Portal<any>): any;

    detach(): any;

    dispose(): void;

    hasAttached(): boolean;
}

export abstract class Portal<T> {
    private _attachedHost: PortalHost | null;


    attach(host: PortalHost): T {
        this._attachedHost = host;
        return <T>host.attach(this);
    }

    detach(): void {
        let host = this._attachedHost;

        if (host == null) {
        } else {
            this._attachedHost = null;
            host.detach();
        }
    }

    get isAttached(): boolean {
        return this._attachedHost != null;
    }

    setAttachedHost(host: PortalHost | null) {
        this._attachedHost = host;
    }
}

export class ComponentPortal<T> extends Portal<ComponentRef<T>> {
    component: ComponentType<T>;

    viewContainerRef?: ViewContainerRef | null;

    injector?: Injector | null;

    constructor(
        component: ComponentType<T>,
        viewContainerRef?: ViewContainerRef | null,
        injector?: Injector | null) {
        super();
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
}

export class TemplatePortal<C> extends Portal<C> {
    templateRef: TemplateRef<C>;

    viewContainerRef: ViewContainerRef;

    context: C | undefined;

    constructor(template: TemplateRef<any>, viewContainerRef: ViewContainerRef, context?: C) {
        super();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
        if (context) {
            this.context = context;
        }
    }

    get origin(): ElementRef {
        return this.templateRef.elementRef;
    }

    attach(host: PortalHost, context: C | undefined = this.context): C {
        this.context = context;
        return super.attach(host);
    }

    detach(): void {
        this.context = undefined;
        return super.detach();
    }
}

export abstract class BasePortalHost implements PortalHost {
    private _attachedPortal: Portal<any> | null;

    private _disposeFn: (() => void) | null;

    private _isDisposed: boolean = false;

    hasAttached(): boolean {
        return !!this._attachedPortal;
    }

    attach(portal: Portal<any>): any {
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        } else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
    }

    abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;

    abstract attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;

    detach(): void {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }

        this._invokeDisposeFn();
    }

    dispose() {
        if (this.hasAttached()) {
            this.detach();
        }

        this._invokeDisposeFn();
        this._isDisposed = true;
    }

    setDisposeFn(fn: () => void) {
        this._disposeFn = fn;
    }

    private _invokeDisposeFn() {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    }
}
