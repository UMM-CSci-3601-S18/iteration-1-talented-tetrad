import {Component, OnInit} from '@angular/core';
import {SummaryListService} from './summary-list.service';
import {Summary} from './summary';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-summary-list-component',
    templateUrl: 'summary-list.component.html',
    styleUrls: ['./summary-list.component.css'],
})

export class SummaryListComponent implements OnInit {
    private setEmotion: string;
    private morning = 0;
    private afternoon = 0;
    private night = 0;
    // These are public so that tests can reference them (.spec.ts)
    public summarys: Summary[];
    public filteredSummarys: Summary[];

    // These are the target values used in searching.
    // We should rename them to make that clearer.
    public summaryEmotion: string;

    // The ID of the
    private highlightedID: {'$oid': string} = { '$oid': '' };

    // Inject the SummaryListService into this component.
    constructor(public summaryListService: SummaryListService, public dialog: MatDialog) {

    }

    isHighlighted(summary: Summary): boolean {
        return summary._id['$oid'] === this.highlightedID['$oid'];
    }

    public filterSummarys(searchEmotion: string): Summary[] {

        this.filteredSummarys = this.summarys;

        // Filter by Emotion
        if (searchEmotion != null) {
            searchEmotion = searchEmotion.toLocaleLowerCase();

            this.filteredSummarys = this.filteredSummarys.filter(summary => {
                return !searchEmotion || summary.emotion.toLowerCase().indexOf(searchEmotion) !== -1;
            });
        }

        return this.filteredSummarys;
    }

    /*
     * Starts an asynchronous operation to update the users list
     *
     */
    refreshSummarys(): Observable<Summary[]> {
        // Get Users returns an Observable, basically a "promise" that
        // we will get the data from the server.
        //
        // Subscribe waits until the data is fully downloaded, then
        // performs an action on it (the first lambda)

        const summaryListObservable: Observable<Summary[]> = this.summaryListService.getSummarys();
        summaryListObservable.subscribe(
            summarys => {
                this.summarys = summarys;
                this.filterSummarys(this.summaryEmotion);
            },
            err => {
                console.log(err);
            });
        return summaryListObservable;
    }


    loadService(): void {
        this.summaryListService.getSummarys(this.summaryEmotion).subscribe(
            summarys => {
                this.summarys = summarys;
                this.filteredSummarys = this.summarys;
            },
            err => {
                console.log(err);
            }
        );
    }

    totalNumberEntries(): number{
        return this.summarys.length;
    }

    totalNumberEmotions(emotion: string): number{
        this.filteredSummarys = this.summarys;
        this.filteredSummarys = this.filteredSummarys.filter(summary=>{
            return !emotion || emotion.toLowerCase().indexOf(summary.emotion) !== -1;
        })

        return this.filteredSummarys.length;
    }

    aveTime(emotion: string, time: number){
        if(emotion != this.setEmotion){
            this.resetNums()
            this.setEmotion = emotion;
        }

        if(time >= 600 && time <= 1100){
            this.morning++;
        }
        else if(time >= 1101 && time <= 1600){
            this.afternoon++;
        }
        else{
            this.night++;
        }
    }

    returnTime(emotion: string): string{
        if(emotion == ""){
            return "";
        }

        if(this.morning > this.afternoon && this.morning > this.night){
            return "You usually feel this way in the morning";
        }

        else if (this.afternoon > this.morning && this.afternoon > this.night){
            return "You usually feel this way in the afternoon";
        }
        else{
            return "You usually feel this way at night";
        }
    }

    resetNums(){
        this.morning = 0;
        this.afternoon = 0;
        this.night = 0;
    }

    ngOnInit(): void {
        this.refreshSummarys();
        this.loadService();
    }
}
