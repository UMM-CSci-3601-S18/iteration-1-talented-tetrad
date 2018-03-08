import {Component, OnInit} from '@angular/core';
import {Inject} from '@angular/core';
import {SummaryListService} from './summary-list.service';
import {Summary} from './summary';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import {SummaryComponentDialog} from "./summary.component-dialog";

@Component({
    selector: 'app-summary-list-component',
    templateUrl: 'summary-list.component.html',
    styleUrls: ['./summary-list.component.css'],
})

export class SummaryListComponent implements OnInit {
    startDate;
    endDate;
    private setMood: string;

    private morning = 0;
    private afternoon = 0;
    private night = 0;
    /*
        private twoAm = 0;
        private fourAm = 0;
        private sixAm = 0;
        private eightAm = 0;
        private tenAm = 0;
        private twelvePm = 0;
        private twoPm = 0;
        private fourPm = 0;
        private sixPm = 0;
        private eightPm = 0;
        private tenPm = 0;
        private twelveAm = 0;*/
    // These are public so that tests can reference them (.spec.ts)
    public summarys: Summary[];
    public filteredSummarys: Summary[];

    // These are the target values used in searching.
    // We should rename them to make that clearer.
    public summaryMood: string;

    // The ID of the
    private highlightedID: {'$oid': string} = { '$oid': '' };

    // Inject the SummaryListService into this component.
    constructor(public summaryListService: SummaryListService, public dialog: MatDialog) {

    }

    isHighlighted(summary: Summary): boolean {
        return summary._id['$oid'] === this.highlightedID['$oid'];
    }

    public filterSummarys(searchMood: string): Summary[] {

        this.filteredSummarys = this.summarys;

        // Filter by Mood
        if (searchMood != null) {
            searchMood = searchMood.toLocaleLowerCase();

            this.filteredSummarys = this.filteredSummarys.filter(summary => {
                return !searchMood || summary.mood.toLowerCase().indexOf(searchMood) !== -1;
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
                this.filterSummarys(this.summaryMood);
            },
            err => {
                console.log(err);
            });
        return summaryListObservable;
    }


    loadService(): void {
        this.summaryListService.getSummarys(this.summaryMood).subscribe(
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

    totalNumberMoods(mood: string): number{
        this.filteredSummarys = this.summarys;
        this.filteredSummarys = this.filteredSummarys.filter(summary=>{
            return !mood || mood.toLowerCase().indexOf(summary.mood) !== -1;
        })

        return this.filteredSummarys.length;
    }

    aveTime(mood: string, time: number) {
        if (mood != this.setMood) {
            this.resetNums()
            this.setMood = mood;
        }

        if(mood != this.setMood){
            this.resetNums()
            this.setMood = mood;
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

    /*   if (time >= 101 && time <= 300) {
           this.twoAm++;
       }
       else if (time >= 301 && time <= 500) {
           this.fourAm++;
       }
       else if (time >= 501 && time <= 700) {
           this.sixAm++;
       }
       else if (time >= 701 && time <= 900) {
           this.sixAm++;
       }
       else if (time >= 901 && time <= 1100) {
           this.eightAm++;
       }
       else if (time >= 1101 && time <= 1300) {
           this.tenAm++;
       }
       else if (time >= 1301 && time <= 1500) {
           this.twelvePm++;
       }
       else if (time >= 1501 && time <= 1700) {
           this.twoPm++;
       }
       else if (time >= 1701 && time <= 1900) {
           this.sixPm++;
       }
       else if (time >= 1901 && time <= 2100) {
           this.eightPm++;
       }
       else if (time >= 2101 && time <= 2300) {
           this.tenPm++;
       }
       else if (time >= 2301 && time <= 100) {
           this.twelveAm++;
       }
   }*/

    returnTime(mood: string): string{
        if(mood == ""){
            return "";
        }

        if(this.morning > this.afternoon && this.morning > this.night){
            return "You usually feel " + mood + " in the morning";
        }

        else if (this.afternoon > this.morning && this.afternoon > this.night){
            return "You usually feel " + mood + " in the afternoon";
        }
        else{
            return "You usually feel " + mood + " in the night";
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(SummaryComponentDialog, {
            width: '70vw',
            height: '400px'
        });
    }





    /*getHeight(time:number):number{
        if(time == 200){
            return this.twoAm;
        }
        if(time == 400){
            return this.fourAm;
        }
        if(time == 600){
            return this.sixAm;
        }
        if(time == 800){
            return this.eightAm;
        }
        if(time == 1000){
            return this.tenAm;
        }
        if(time == 1200){
            return this.twelvePm;
        }
        if(time == 1400){
            return this.twoPm;
        }
        if(time == 1600){
            return this.fourPm;
        }
        if(time == 1800){
            return this.sixPm;
        }
        if(time == 2000){
            return this.eightPm;
        }
        if(time == 2200){
            return this.tenPm;
        }
        if(time == 2400){
            return this.twelveAm;
        }
    }*/



    resetNums(){

        this.morning = 0;
        this.afternoon = 0;
        this.night = 0;

        /*this.twoAm = 0;
        this.fourAm = 0;
        this.sixAm = 0;
        this.eightAm = 0;
        this.tenAm = 0;
        this.twelvePm = 0;
        this.twoPm = 0;
        this.fourPm = 0;
        this.sixPm = 0;
        this.eightPm = 0;
        this.tenPm = 0;
        this.twelveAm = 0;*/
    }

    ngOnInit(): void {
        this.refreshSummarys();
        this.loadService();
        this.startDate = new Date();
        this.endDate = new Date();
    }
}
