import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Emoji} from './emoji';

@Component({
    selector: 'app-add-emoji.component',
    templateUrl: 'add-emoji.component.html',
})
export class AddEmojiComponent {
    constructor(
        public dialogRef: MatDialogRef<AddEmojiComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {emoji: Emoji}) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

