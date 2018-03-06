import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {Emotion} from'./emotion';
import {AddEmotionComponent} from "./home.component-dialog";
import {EmotionListService} from "./emotion-list.service";

/**
 * @title Injecting data when opening a dialog
 */
@Component({
    selector: 'home.component',
    templateUrl: 'home.component.html',
    //styleUrls: ['./home.component.css']

})
export class HomeComponent {

    // The ID of the
    private highlightedID: {'$oid': string} = { '$oid': '' };

    // Inject the UserListService into this component.
    constructor(public emotionListService: EmotionListService, public dialog: MatDialog) {

    }

    isHighlighted(emotion: Emotion): boolean {
        return emotion._id['$oid'] === this.highlightedID['$oid'];
    }

    openDialog(): void {
        const newEmotion: Emotion = {_id: '', mood: '', time: '', day: '', month: '', year: ''};
        const dialogRef = this.dialog.open(AddEmotionComponent, {
            width: '70vw',
            height: '250px',
            data: { emotion: newEmotion }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.emotionListService.addNewEmotion(result).subscribe(
                addEmotionResult => {
                    this.highlightedID = addEmotionResult;
                    //this.refreshUsers();
                },
                err => {
                    // This should probably be turned into some sort of meaningful response.
                    console.log('There was an error adding the emotion.');
                    console.log('The error was ' + JSON.stringify(err));
                });
        });
    }
}
