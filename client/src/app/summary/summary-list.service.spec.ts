import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Summary} from './summary';
import {SummaryListService} from './summary-list.service';

describe('Summary list service: ', () => {
    // A small collection of test summarys
    const testSummarys: Summary[] = [
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
    ];
    const mSummarys: Summary[] = testSummarys.filter(summary =>
        summary.mood.toLowerCase().indexOf('m') !== -1
    );

    // We will need some url information from the summaryListService to meaningfully test mood filtering;
    // https://stackoverflow.com/questions/35987055/how-to-write-unit-testing-for-angular-2-typescript-for-private-methods-with-ja
    let summaryListService: SummaryListService;
    let currentlyImpossibleToGenerateSearchSummaryUrl: string;

    // These are used to mock the HTTP requests so that we (a) don't have to
    // have the server running and (b) we can check exactly which HTTP
    // requests were made to ensure that we're making the correct requests.
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        // Set up the mock handling of the HTTP requests
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        // Construct an instance of the service with the mock
        // HTTP client.
        summaryListService = new SummaryListService(httpClient);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('getSummarys() calls api/summarys', () => {
        // Assert that the summarys we get from this call to getSummarys()
        // should be our set of test summarys. Because we're subscribing
        // to the result of getSummarys(), this won't actually get
        // checked until the mocked HTTP request "returns" a response.
        // This happens when we call req.flush(testSummarys) a few lines
        // down.
        summaryListService.getSummarys().subscribe(
            summarys => expect(summarys).toBe(testSummarys)
        );

        // Specify that (exactly) one request will be made to the specified URL.
        const req = httpTestingController.expectOne(summaryListService.baseUrl);
        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');
        // Specify the content of the response to that request. This
        // triggers the subscribe above, which leads to that check
        // actually being performed.
        req.flush(testSummarys);
    });

    it('getSummarys(summaryMood) adds appropriate param string to called URL', () => {
        summaryListService.getSummarys('m').subscribe(
            summarys => expect(summarys).toEqual(mSummarys)
        );

        const req = httpTestingController.expectOne(summaryListService.baseUrl + '?mood=m&');
        expect(req.request.method).toEqual('GET');
        req.flush(mSummarys);
    });

    it('filterByMood(summaryMood) deals appropriately with a URL that already had a mood', () => {
        currentlyImpossibleToGenerateSearchSummaryUrl = summaryListService.baseUrl + '?mood=f&something=k&';
        summaryListService['summaryUrl'] = currentlyImpossibleToGenerateSearchSummaryUrl;
        summaryListService.filterByMood('m');
        expect(summaryListService['summaryUrl']).toEqual(summaryListService.baseUrl + '?something=k&mood=m&');
    });

    it('filterByMood(summaryMood) deals appropriately with a URL that already had some filtering, but no mood', () => {
        currentlyImpossibleToGenerateSearchSummaryUrl = summaryListService.baseUrl + '?something=k&';
        summaryListService['summaryUrl'] = currentlyImpossibleToGenerateSearchSummaryUrl;
        summaryListService.filterByMood('m');
        expect(summaryListService['summaryUrl']).toEqual(summaryListService.baseUrl + '?something=k&mood=m&');
    });

    it('filterByMood(summaryMood) deals appropriately with a URL has the keyword mood, but nothing after the =', () => {
        currentlyImpossibleToGenerateSearchSummaryUrl = summaryListService.baseUrl + '?mood=&';
        summaryListService['summaryUrl'] = currentlyImpossibleToGenerateSearchSummaryUrl;
        summaryListService.filterByMood('');
        expect(summaryListService['summaryUrl']).toEqual(summaryListService.baseUrl + '');
    });

});
