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
    getDate;
    private setMood: string;

    private morning = 0;
    private afternoon = 0;
    private night = 0;

    private oneAm = 0;
    private twoAm = 0;
    private threeAm = 0;
    private fourAm = 0;
    private fiveAm = 0;
    private sixAm = 0;
    private sevenAm = 0;
    private eightAm = 0;
    private nineAm = 0;
    private tenAm = 0;
    private elevenAm = 0;
    private twelvePm = 0;
    private onePm = 0;
    private twoPm = 0;
    private threePm = 0;
    private fourPm = 0;
    private fivePm = 0;
    private sixPm = 0;
    private sevenPm = 0;
    private eightPm = 0;
    private ninePm = 0;
    private tenPm = 0;
    private elevenPm = 0;
    private twelveAm = 0;
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
        this.getDate = new Date(time);
        var hour = this.getDate.getHours();

        if (mood != this.setMood) {
            this.resetNums()
            this.setMood = mood;
        }

        /*  if(mood != this.setMood){
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
          }*/
        if(hour >= 0 && hour < 1) {
            this.twelveAm++;
        }
        else if (hour > 1 && hour < 2 ) {
            this.oneAm++;
        }
        else if (hour >= 2 && hour < 3) {
            this.twoAm++;
        }
        else if (hour >= 3 && hour < 4) {
            this.threeAm++;
        }
        else if (hour >= 4 && hour < 5) {
            this.fourAm++;
        }
        else if (hour >= 5 && hour < 6) {
            this.fiveAm++;
        }
        else if (hour >= 6 && hour < 7) {
            this.sixAm++;
        }
        else if (hour >= 7 && hour < 8) {
            this.sevenAm++;
        }
        else if (hour >= 8 && hour < 9) {
            this.eightAm++;
        }
        else if (hour >= 9 && hour < 10) {
            this.nineAm++;
        }
        else if (hour >= 10 && hour < 11) {
            this.tenAm++;
        }
        else if (hour >= 11 && hour < 12) {
            this.elevenAm++;
        }
        else if (hour >= 12 && hour < 13) {
            this.twelvePm++;
        }
        else if (hour >= 13 && hour < 14) {
            this.onePm++;
        }
        else if (hour >= 14 && hour < 15) {
            this.twoPm++;
        }
        else if (hour >= 15 && hour < 16) {
            this.threePm++;
        }
        else if (hour >= 16 && hour < 17) {
            this.fourPm++;
        }
        else if (hour >= 17 && hour < 18) {
            this.fivePm++;
        }
        else if (hour >= 18 && hour < 19) {
            this.sixPm++;
        }
        else if (hour >= 19 && hour < 20) {
            this.sevenPm++;
        }
        else if (hour >= 20 && hour < 21) {
            this.eightPm++;
        }
        else if (hour >= 21 && hour < 22) {
            this.ninePm++;
        }
        else if (hour >= 22 && hour < 23) {
            this.tenPm++;
        }
        else if (hour >= 23 && hour < 24) {
            this.elevenPm++;
        }
    }

    returnMoreData(mood:string, time: string): string{
        if(time == "twelveAm" && this.twelveAm != 0){
            return "You felt " + mood + " " + this.twelveAm + " times at 12 am.";
        }
        else if(time == "oneAm" && this.oneAm != 0){
            return "You felt " + mood + " " + this.oneAm + " times at 1 am.";
        }
        else if(time == "twoAm" && this.twoAm != 0){
            return "You felt " + mood + " " + this.twoAm + " times at 2 am.";
        }
        else if(time == "threeAm" && this.threeAm != 0){
            return "You felt " + mood + " " + this.threeAm + " times at 3 am.";
        }
        else if(time == "fourAm" && this.fourAm != 0){
            return "You felt " + mood + " " + this.fourAm + " times at 4 am.";
        }
        else if(time == "fiveAm" && this.fiveAm != 0){
            return "You felt " + mood + " " + this.fiveAm + " times at 5 am.";
        }
        else if(time == "sixAm" && this.sixAm != 0){
            return "You felt " + mood + " " + this.sixAm + " times at 6 am.";
        }
        else if(time == "sevenAm" && this.sevenAm != 0){
            return "You felt " + mood + " " + this.sevenAm + " times at 7 am.";
        }
        else if(time == "eightAm" && this.eightAm != 0){
            return "You felt " + mood + " " + this.eightAm + " times at 8 am.";
        }
        else if(time == "nineAm" && this.nineAm != 0){
            return "You felt " + mood + " " + this.nineAm + " times at 9 am.";
        }
        else if(time == "tenAm" && this.tenAm != 0){
            return "You felt " + mood + " " + this.tenAm + " times at 10 am.";
        }
        else if(time == "elevenAm" && this.elevenAm != 0){
            return "You felt " + mood + " " + this.elevenAm + " times at 11 am.";
        }
        else if(time == "twelvePm" && this.twelvePm != 0){
            return "You felt " + mood + " " + this.twelvePm + " times at 12 pm.";
        }
        else if(time == "onePm" && this.onePm != 0){
            return "You felt " + mood + " " + this.onePm + " times at 1 pm.";
        }
        else if(time == "twoPm" && this.twoPm != 0){
            return "You felt " + mood + " " + this.twoPm + " times at 2 pm.";
        }
        else if(time == "threePm" && this.threePm != 0){
            return "You felt " + mood + " " + this.threePm + " times at 3 pm.";
        }
        else if(time == "fourPm" && this.fourPm != 0){
            return "You felt " + mood + " " + this.fourPm + " times at 4 pm.";
        }
        else if(time == "fivePm" && this.fivePm != 0){
            return "You felt " + mood + " " + this.fivePm + " times at 5 pm.";
        }
        else if(time == "sixPm" && this.sixPm != 0){
            return "You felt " + mood + " " + this.sixPm + " times at 6 pm.";
        }
        else if(time == "sevenPm" && this.sevenPm != 0){
            return "You felt " + mood + " " + this.sevenPm + " times at 7 pm.";
        }
        else if(time == "eightPm" && this.eightPm != 0){
            return "You felt " + mood + " " + this.eightPm + " times at 8 pm.";
        }
        else if(time == "ninePm" && this.ninePm != 0){
            return "You felt " + mood + " " + this.ninePm + " times at 9 pm.";
        }
        else if(time == "tenPm" && this.tenPm != 0){
            return "You felt " + mood + " " + this.tenPm + " times at 10 pm.";
        }
        else if(time == "elevenPm" && this.elevenPm != 0){
            return "You felt " + mood + " " + this.elevenPm + " times at 11 pm.";
        }

        return "";
    }

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
