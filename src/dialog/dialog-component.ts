import { Component, Input } from '@angular/core';
import { PfDialogRef } from './dialog-ref';


@Component({
    selector: 'pf-dg-content',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'pf-dg-content'
    }
})
export class PfDialogContentComponent {
    constructor() {
    }
}

@Component({
    selector: 'pf-dg-header',
    templateUrl: `./dialog-header.html`,
    host: {
        'class': 'pf-dg-header'
    }
})
export class PfDialogTitleComponent {
    constructor(private dialogRef: PfDialogRef<any>) {

    }
    @Input("pf-title") title: string;
    @Input("pf-show-close") showClose: boolean;

    close() {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'pf-dg-footer',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'pf-dg-footer'
    }
})
export class PfDialogFooterComponent {
    constructor() {
    }
}
