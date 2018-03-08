import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'summary.component-dialog',
    templateUrl: 'summary.component-dialog.html',
})
export class SummaryComponentDialog {
    constructor(
        public dialogRef: MatDialogRef<SummaryComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
}
