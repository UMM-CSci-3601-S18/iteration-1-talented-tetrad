import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Emotion} from './emotion';

@Component({
    selector: 'home.component-dialog',
    templateUrl: 'home.component-dialog.html',
    styleUrls: ['./home.component-dialog.css']
})
export class AddEmotionComponent {
    constructor(
        public dialogRef: MatDialogRef<AddEmotionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {emotion: Emotion}) {
    }

    onNoClick(): void {

        this.dialogRef.close();
    }
}
