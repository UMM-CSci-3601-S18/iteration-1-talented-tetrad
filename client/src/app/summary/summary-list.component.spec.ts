import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Summary} from './summary';
import {SummaryListComponent} from './summary-list.component';
import {SummaryListService} from './summary-list.service';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {CustomModule} from '../custom.module';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';
import {MatDialog} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

describe('Summary list', () => {

    let summaryList: SummaryListComponent;
    let fixture: ComponentFixture<SummaryListComponent>;

    let summaryListServiceStub: {
        getSummarys: () => Observable<Summary[]>
    };

    beforeEach(() => {
        // stub SummaryService for test purposes
        summaryListServiceStub = {
            getSummarys: () => Observable.of([
                {
                    _id: "5aa09a0f14bb3a882d54decc",
                    mood: "down",
                    date: "Mon Mar 21 2018 21:16:00 GMT-0600 (CST)"
                },
                {
                    _id: "5aa09a0f14bb3a882d54decd",
                    mood: "radiant",
                    date: "Wed Mar 12 2018 07:46:00 GMT-0600 (CST)"
                },
                {
                    _id: "5aa09a0f14bb3a882d54dece",
                    mood: "meh",
                    date: "Tue Mar 10 2018 09:57:00 GMT-0600 (CST)"
                },
                {
                    _id: "5aa09a0f14bb3a882d54decf",
                    mood: "down",
                    date: "Tue Mar 08 2018 14:44:00 GMT-0600 (CST)"
                },
            ])
        };

        TestBed.configureTestingModule({
            imports: [CustomModule],
            declarations: [SummaryListComponent],
            // providers:    [ SummaryListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{provide: SummaryListService, useValue: summaryListServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(SummaryListComponent);
            summaryList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('contains all the summarys', () => {
        expect(summaryList.summarys.length).toBe(4);
    });

    it('contains a summary with id \'5aa09a0f14bb3a882d54decc\'', () => {
        expect(summaryList.summarys.some((summary: Summary) => summary._id === '5aa09a0f14bb3a882d54decc')).toBe(true);
    });

    it('contain a summary with mood \'meh\'', () => {
        expect(summaryList.summarys.some((summary: Summary) => summary.mood === 'meh')).toBe(true);
    });

    it('doesn\'t contain a summary with date \'Thu Mar 19 2018 12:15:00 GMT-0600 (CST)\'', () => {
        expect(summaryList.summarys.some((summary: Summary) => summary.date === 'Thu Mar 19 2018 12:15:00 GMT-0600 (CST)')).toBe(false);
    });

    it('has two summaries that have mood down', () => {
        expect(summaryList.summarys.filter((summary: Summary) => summary.mood === 'down').length).toBe(2);
    });

    it('summary list filters by mood', () => {
        expect(summaryList.filteredSummarys.length).toBe(1);
        summaryList.summaryMood = 'dow';
        summaryList.refreshSummarys().subscribe(() => {
            expect(summaryList.filteredSummarys.length).toBe(1);
        });
    });

/*    it('summary list filters by mood', () => {
        expect(summaryList.filteredSummarys.length).toBe(1);
        summaryList.summaryMood = 'rad';
        summaryList.refreshSummarys().subscribe(() => {
            expect(summaryList.filteredSummarys.length).toBe(1);
        });
    });*/

    it('summary list filters by mood', () => {
        expect(summaryList.filteredSummarys.length).toBe(1);
        summaryList.summaryMood = 'm';
        summaryList.refreshSummarys().subscribe(() => {
            expect(summaryList.filteredSummarys.length).toBe(0);
        });
    });

});

/*describe('Misbehaving Summary List', () => {
    let summaryList: SummaryListComponent;
    let fixture: ComponentFixture<SummaryListComponent>;

    let summaryListServiceStub: {
        getSummarys: () => Observable<Summary[]>
    };

    beforeEach(() => {
        // stub SummaryService for test purposes
        summaryListServiceStub = {
            getSummarys: () => Observable.create(observer => {
                observer.error('Error-prone observable');
            })
        };

        TestBed.configureTestingModule({
            imports: [FormsModule, CustomModule],
            declarations: [SummaryListComponent],
            providers: [{provide: SummaryListService, useValue: summaryListServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(SummaryListComponent);
            summaryList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('generates an error if we don\'t set up a SummaryListService', () => {
        // Since the observer throws an error, we don't expect summarys to be defined.
        expect(summaryList.summarys).toBeUndefined();
    });
});


describe('Adding a summary', () => {
    let summaryList: SummaryListComponent;
    let fixture: ComponentFixture<SummaryListComponent>;
    const newSummary: Summary =  {
            _id: "5aa09a0f14bb3a882d54decc",
            mood: "down",
            date: "Mon Mar 21 2018 21:16:00 GMT-0600 (CST)"
        };
    const newId = 'down_id';

    let calledSummary: Summary;

    let summaryListServiceStub: {
        getSummarys: () => Observable<Summary[]>,
        addNewSummary: (newSummary: Summary) => Observable<{'$oid': string}>
    };
    let mockMatDialog: {
        open: (AddSummaryComponent, any) => {
            afterClosed: () => Observable<Summary>
        };
    };

    beforeEach(() => {
        calledSummary = null;
        // stub SummaryService for test purposes
        summaryListServiceStub = {
            getSummarys: () => Observable.of([]),
            addNewSummary: (summaryToAdd: Summary) => {
                calledSummary = summaryToAdd;
                return Observable.of({
                    '$oid': newId
                });
            }
        };
        mockMatDialog = {
            open: () => {
                return {
                    afterClosed: () => {
                        return Observable.of(newSummary);
                    }
                };
            }
        };

        TestBed.configureTestingModule({
            imports: [FormsModule, CustomModule],
            declarations: [SummaryListComponent],
            providers: [
                {provide: SummaryListService, useValue: summaryListServiceStub},
                {provide: MatDialog, useValue: mockMatDialog},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(SummaryListComponent);
            summaryList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('calls SummaryListService.addSummary', () => {
        expect(calledSummary).toBeNull();
        summaryList.openDialog();
        expect(calledSummary).toEqual(newSummary);
    });
});*/

