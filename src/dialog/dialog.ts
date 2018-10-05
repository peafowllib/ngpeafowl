import { Injectable, Type, ComponentRef, ApplicationRef, Injector, ReflectiveInjector, InjectionToken, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Overlay, GlobalPositionStrategy, OverlayState, OverlayRef } from './../overlay';
import { ComponentPortal, ComponentType } from './../portal';
import { PfDialogContainer } from './dialog-container';
import { PfDialogRef } from './dialog-ref';
import { PfDialogOption, PfAlertOption, PfConfirmOption, IConfirmEvent } from './dialog-option';
import { PfDialogPromptComponent, pfPromptType } from './dialog-prompt';
import { extend } from './../core';

@Injectable()
export class PfDialogService {
    constructor(private overlay: Overlay, private _injector: Injector) {

    }

    private _openDialogs: PfDialogRef<any>[] = [];

    private _afterAllClosed = new Subject<void>();

    private _boundKeydown = this._handleKeydown.bind(this);

    dialog<T>(digType: Type<T>, option?: PfDialogOption): PfDialogRef<T> {
        return this.openDialog(digType, this._extendDefaultOption(option));
    }

    alert(content: string | TemplateRef<any>, title?: string, option?: PfAlertOption): PfDialogRef<PfDialogPromptComponent> {
        option = this._extendDefaulAlerttOption(option);
        option.content = content;
        option.title = title;
        var dialogRef = this.openDialog(PfDialogPromptComponent, option);
        dialogRef.componentInstance.option = option;
        dialogRef.componentInstance.type = pfPromptType.Alert;
        return dialogRef;
    }

    confirm(content: string | TemplateRef<any>, title?: string, option?: PfConfirmOption): { onAction: Subject<IConfirmEvent>, dialogRef: PfDialogRef<PfDialogPromptComponent> } {
        option = this._extendDefaulConfirmtOption(option);
        option.content = content;
        option.title = title;
        var dialogRef = this.openDialog(PfDialogPromptComponent, option);
        dialogRef.componentInstance.option = option;
        dialogRef.componentInstance.type = pfPromptType.Confirm;
        return {
            onAction: option.action,
            dialogRef: dialogRef
        };
    }

    private openDialog<T>(digType: Type<T>, option?: PfDialogOption, provider?: any): PfDialogRef<T> {
        var overlayRef = this.overlay.create(this._getOverlayState(option));
        const dialogContainer = this._attachDialogContainer(overlayRef, option);
        const dialogRef = this._attachDialogContent(digType, dialogContainer, overlayRef, option, provider);
        this._openDialogs.push(dialogRef);
        return dialogRef;
    }

    private _attachDialogContainer(overlay: OverlayRef, config: PfDialogOption) {
        let containerPortal = new ComponentPortal(PfDialogContainer);
        let containerRef: ComponentRef<PfDialogContainer> = overlay.attach(containerPortal);
        containerRef.instance._config = config;
        document.addEventListener("keydown", this._boundKeydown);
        return containerRef.instance;
    }

    private _attachDialogContent<T>(componentOrTemplateRef: ComponentType<T>, dialogContainer: PfDialogContainer, overlayRef: OverlayRef, config: PfDialogOption, provider?: any) {
        var dialogRef = new PfDialogRef<T>(overlayRef, dialogContainer);
        const contentRef = dialogContainer.attachComponentPortal(
            new ComponentPortal(componentOrTemplateRef, undefined, this._createInjector(dialogRef, config)));
        dialogRef.componentInstance = contentRef.instance;
        dialogRef.updatePosition(config.position);
        return dialogRef;
    }

    private _createInjector<T>(dialogRef: PfDialogRef<T>, config: PfDialogOption, provider: any = []) {
        return ReflectiveInjector.resolveAndCreate([
            {
                provide: PF_DIALOG_DATA,
                useValue: config.data
            }, {
                provide: PfDialogRef,
                useValue: dialogRef
            },
            ...provider], this._injector);
    }

    private _getOverlayState(dialogConfig: PfDialogOption): OverlayState {
        const state = new OverlayState({
            hasBackdrop: dialogConfig.showBackdrop,
            width: dialogConfig.width,
            height: dialogConfig.height,
            positionStrategy: new GlobalPositionStrategy(),
            panelClass: ["as-dg-container"]
        });
        return state;
    }

    private _removeOpenDialog(dialogRef: PfDialogRef<any>) {
        const index = this._openDialogs.indexOf(dialogRef);
        if (index > -1) {
            this._openDialogs.splice(index, 1);
            if (!this._openDialogs.length) {
                this._afterAllClosed.next();
                document.removeEventListener('keydown', this._boundKeydown);
            }
        }
    }

    private _handleKeydown(event: KeyboardEvent): void {
        const topDialog = this._openDialogs[this._openDialogs.length - 1];
        const canClose = topDialog ? !topDialog.closeOnEscape : false;
        if (event.keyCode === 27 && canClose) {
            topDialog.close();
        }
    }

    private _extendDefaultOption(option: PfDialogOption) {
        option = option ? option : {};
        return extend({
            closeOnEscape: true,
            draggable: false,
            showBackdrop: true
        }, option);

    }

    private _extendDefaulAlerttOption(option: PfAlertOption) {
        option = option ? option : {};
        return extend({
            closeOnEscape: true,
            draggable: false,
            showBackdrop: true,
            closeIcon: true
        }, option);
    }

    private _extendDefaulConfirmtOption(option: PfConfirmOption) {
        option = option ? option : {};
        return extend({
            draggable: false,
            showBackdrop: true,
            action: new Subject(),
            buttonText: {
                cancel: "Cancel",
                Confirm: "Ok"
            }
        }, option);

    }
}

export var PF_DIALOG_DATA = new InjectionToken("PF dialog data");

