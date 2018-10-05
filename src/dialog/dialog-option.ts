import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

export interface DialogPosition {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
}



export class PfDialogOption {
    height?: string | number;
    width?: string | number;
    showBackdrop?: boolean;
    data?: any;
    position?: DialogPosition;
    closeOnEscape?: boolean;
    draggable?: IDraggableOption | boolean;
}
export class PfAlertOption {
    height?: string | number;
    width?: string | number;
    closeIcon?: boolean;
    showBackdrop?: boolean;
    position?: DialogPosition;
    closeOnEscape?: boolean;
    title?: string;
    showClose?: boolean;
    content?: string | TemplateRef<any>;
}

export class PfConfirmOption {
    height?: string | number;
    width?: string | number;
    closeIcon?: boolean;
    showBackdrop?: boolean;
    position?: DialogPosition;
    title?: string;
    showClose?: boolean;
    content?: string | TemplateRef<any>;
    footer?: TemplateRef<any>;
    action?: Subject<IConfirmEvent>;
    buttonText?: IButtonText;
}

export interface IPfPromptOption extends PfConfirmOption, PfAlertOption {
}

export interface IConfirmEvent {
    action: pfDgBtnAction;
}

export enum pfDgBtnAction {
    Confirm,
    Cancel
}

export interface IButtonText {
    confirm?: string;
    cancel?: string;
}

export interface IDraggableOption {
    handle: string;
}