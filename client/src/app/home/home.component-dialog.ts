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

    onNoClick(response): void {

        const date = new Date();

        this.data.emotion.mood = response;
        this.data.emotion.time = date.getTime();
        this.data.emotion.day = date.getDate();
        this.data.emotion.month = date.getMonth();
        this.data.emotion.year = date.getFullYear();

        this.dialogRef.close();
    }
}
