import {Component, OnInit} from '@angular/core';
import {EmojiListService} from './emoji-list.service';
import {Emoji} from './emoji';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {AddEmojiComponent} from './add-emoji.component';

@Component({
    selector: 'app-emoji-list-component',
    templateUrl: 'emoji-list.component.html',
    styleUrls: ['./emoji-list.component.css'],
})

export class EmojiListComponent implements OnInit {
    // These are public so that tests can reference them (.spec.ts)
    public emojis: Emoji[];
    public filteredEmojis: Emoji[];

    // These are the target values used in searching.
    // We should rename them to make that clearer.
    public emojiEmotion: string;

    // The ID of the
    private highlightedID: {'$oid': string} = { '$oid': '' };

    // Inject the EmojiListService into this component.
    constructor(public emojiListService: EmojiListService, public dialog: MatDialog) {

    }

    isHighlighted(emoji: Emoji): boolean {
        return emoji.emotion['$oid'] === this.highlightedID['$oid'];
    }

    openDialog(): void {
        const newEmoji: Emoji = {emotion: ''};
        const dialogRef = this.dialog.open(AddEmojiComponent, {
            width: '500px',
            data: { emoji: newEmoji }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.emojiListService.addNewEmoji(result).subscribe(
                addEmojiResult => {
                    this.highlightedID = addEmojiResult;
                    this.refreshEmojis();
                },
                err => {
                    // This should probably be turned into some sort of meaningful response.
                    console.log('There was an error adding the emoji.');
                    console.log('The error was ' + JSON.stringify(err));
                });
        });
    }

    public filterEmojis(searchEmotion: string): Emoji[] {

        this.filteredEmojis = this.emojis;

        // Filter by emotion
        if (searchEmotion != null) {
            searchEmotion = searchEmotion.toLocaleLowerCase();

            this.filteredEmojis = this.filteredEmojis.filter(emoji => {
                return !searchEmotion || emoji.emotion.toLowerCase().indexOf(searchEmotion) !== -1;
            });
        }

        return this.filteredEmojis;
    }

    /*
     * Starts an asynchronous operation to update the emojis list
     *
     */
    refreshEmojis(): Observable<Emoji[]> {
        // Get Emojis returns an Observable, basically a "promise" that
        // we will get the data from the server.
        //
        // Subscribe waits until the data is fully downloaded, then
        // performs an action on it (the first lambda)

        const emojiListObservable: Observable<Emoji[]> = this.emojiListService.getEmojis();
        emojiListObservable.subscribe(
            emojis => {
                this.emojis = emojis;
                this.filterEmojis(this.emojiEmotion);
            },
            err => {
                console.log(err);
            });
        return emojiListObservable;
    }


    loadService(): void {
        this.emojiListService.getEmojis(this.emojiEmotion).subscribe(
            emojis => {
                this.emojis = emojis;
                this.filteredEmojis = this.emojis;
            },
            err => {
                console.log(err);
            }
        );
    }


    ngOnInit(): void {
        this.refreshEmojis();
        this.loadService();
    }
}

