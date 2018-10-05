import { Component, Input, Inject, InjectionToken, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { PF_DIALOG_DATA } from './dialog';
import { PfAlertOption, PfConfirmOption, pfDgBtnAction, IPfPromptOption } from './dialog-option';
import { PfDialogRef } from './dialog-ref';
import { PortalHostDirective, TemplatePortal } from './../portal';

@Component({
    selector: 'pf-dg-prompt',
    templateUrl: `./dialog-prompt.html`,
    host: {
        'class': 'pf-dg-prompt'
    }
})
export class PfDialogPromptComponent implements OnInit {
    constructor(private dialogRef: PfDialogRef<PfDialogPromptComponent>) {
    }
    content: string;

    ngOnInit() {
        this._attachContentPortal();
        this._attachFooterPortal();
        if (this.type == pfPromptType.Confirm)
            this.dialogRef.beforeClose().subscribe((action: pfDgBtnAction) => {
                this.option.action.next({ action: action });
            });
    }

    @ViewChild("portalHostContent", { read: PortalHostDirective }) _portalHostContent: PortalHostDirective;
    @ViewChild("portalHostFooter", { read: PortalHostDirective }) _portalHostFooter: PortalHostDirective;

    @ViewChild("templateContent") _templateContent: TemplateRef<{}>;
    @ViewChild("templateFooterAlert") _templateFooterAlert: TemplateRef<{}>;
    @ViewChild("templateFooterConfirm") _templateFooterConfirm: TemplateRef<{}>;

    public option: IPfPromptOption;
    public type: pfPromptType = pfPromptType.Alert;

    onActionClicked(action: pfDgBtnAction) {
        this.dialogRef.close(action);
    }

    private _attachContentPortal() {
        var contentPortal = new TemplatePortal(this._templateContent, null);
        if (this.option.content instanceof TemplateRef) {
            contentPortal = new TemplatePortal(this.option.content, null);
        } else {
            this.content = this.option.content;
        }
        this._portalHostContent.attachTemplatePortal(contentPortal);
    }
    private _attachFooterPortal() {
        var footerTemplate: TemplateRef<any> = this._templateFooterConfirm;
        if (this.type == pfPromptType.Alert)
            footerTemplate = this._templateFooterAlert;
        else if (this.option.footer) {
            footerTemplate = this.option.footer;
        }
        var footerPortal = new TemplatePortal(footerTemplate, null);
        this._portalHostFooter.attachTemplatePortal(footerPortal);
    }
}
export enum pfPromptType {
    Alert,
    Confirm
}