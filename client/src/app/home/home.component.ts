import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

/**
 * @title Injecting data when opening a dialog
 */
@Component({
    selector: 'home.component',
    templateUrl: 'home.component.html',
})
export class HomeComponent {
    constructor(public dialog: MatDialog) {}

    openDialog() {
        this.dialog.open(HomeComponentDialog, {
            width: '50vw',
            height: '50vh',
        });
    }
}

@Component({
    selector: 'home.component-dialog',
    templateUrl: 'home.component-dialog.html',
})
export class HomeComponentDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
