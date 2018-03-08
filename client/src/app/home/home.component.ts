import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
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
export class HomeComponent implements OnInit{


    // Use to test exporting properly
    public testingExport = 'Hello World!';

    // The ID of the
    private highlightedID: {'$oid': string} = { '$oid': '' };

    // Inject the UserListService into this component.
    constructor
    (
        public emotionListService: EmotionListService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
    ) {}

    isHighlighted(emotion: Emotion): boolean {
        return emotion._id['$oid'] === this.highlightedID['$oid'];
    }

    openDialog(): void {
        const newEmotion: Emotion = {_id: '', mood: '...', date: ''};
        const dialogRef = this.dialog.open(AddEmotionComponent, {
            width: '70vw',
            height: '400px',
            data: { emotion: newEmotion },
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

    /* this is commented out because it breaks our e2e tests. we are not sure how to
    * test this as of yet and since it was not a story we sold, we're leaving it commented
    * out until we figure out what to do with it. */

    openSnackBar(){
        this.snackBar.open("Make sure to log an emotion!", "Ok", {
            duration: 8000,
        });
    }

    ngOnInit()
    {
        this.openSnackBar();
    }

}
