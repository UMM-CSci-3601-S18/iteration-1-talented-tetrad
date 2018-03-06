/*
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Emoji} from './emoji';
import {EmojiListService} from './emoji-list.service';

describe('Emoji list service: ', () => {
    // A small collection of test emojis
    const testEmojis: Emoji[] = [
        {
            emotion: 'Radiant',
        },
        {
            emotion: 'Sad',
        },
        {
            emotion: 'Anxious',
        }
    ];
    const mEmojis: Emoji[] = testEmojis.filter(emoji =>
        emoji.emotion.toLowerCase().indexOf('m') !== -1
    );

    // We will need some url information from the userListService to meaningfully test company filtering;
    // https://stackoverflow.com/quEmotionestions/35987055/how-to-write-unit-testing-for-angular-2-typescript-for-private-methods-with-ja
    let emojiListService: EmojiListService;
    let currentlyImpossibleToGenerateSearchEmojiUrl: string;

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
        emojiListService = new EmojiListService(httpClient);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('getUsers() calls api/users', () => {
        // Assert that the users we get from this call to getUsers()
        // should be our set of test users. Because we're subscribing
        // to the result of getUsers(), this won't actually get
        // checked until the mocked HTTP request "returns" a response.
        // This happens when we call req.flush(testUsers) a few lines
        // down.
        emojiListService.getEmojis().subscribe(
            emojis => expect(emojis).toBe(testEmojis)
        );

        // Specify that (exactly) one request will be made to the specified URL.
        const req = httpTestingController.expectOne(emojiListService.baseUrl);
        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');
        // Specify the content of the response to that request. This
        // triggers the subscribe above, which leads to that check
        // actually being performed.
        req.flush(testEmojis);
    });

    it('getEmojis(emojiEmotion) adds appropriate param string to called URL', () => {
        emojiListService.getEmojis('m').subscribe(
            emojis => expect(emojis).toEqual(mEmojis)
        );

        const req = httpTestingController.expectOne(emojiListService.baseUrl + '?company=m&');
        expect(req.request.method).toEqual('GET');
        req.flush(mEmojis);
    });
/!*
    it('filterByCompany(userCompany) deals appropriately with a URL that already had a company', () => {
        currentlyImpossibleToGenerateSearchUserUrl = userListService.baseUrl + '?company=f&something=k&';
        userListService['userUrl'] = currentlyImpossibleToGenerateSearchUserUrl;
        userListService.filterByCompany('m');
        expect(userListService['userUrl']).toEqual(userListService.baseUrl + '?something=k&company=m&');
    });

    it('filterByCompany(userCompany) deals appropriately with a URL that already had some filtering, but no company', () => {
        currentlyImpossibleToGenerateSearchUserUrl = userListService.baseUrl + '?something=k&';
        userListService['userUrl'] = currentlyImpossibleToGenerateSearchUserUrl;
        userListService.filterByCompany('m');
        expect(userListService['userUrl']).toEqual(userListService.baseUrl + '?something=k&company=m&');
    });

    it('filterByCompany(userCompany) deals appropriately with a URL has the keyword company, but nothing after the =', () => {
        currentlyImpossibleToGenerateSearchUserUrl = userListService.baseUrl + '?company=&';
        userListService['userUrl'] = currentlyImpossibleToGenerateSearchUserUrl;
        userListService.filterByCompany('');
        expect(userListService['userUrl']).toEqual(userListService.baseUrl + '');
    });
*!/
    it('getEmojiByEmotion() calls api/emojis/id', () => {
        const targetEmoji: Emoji = testEmojis[1];
        const targetId: string = targetEmoji.emotion;
        emojiListService.getEmojiByEmotion(targetId).subscribe(
            emoji => expect(emoji).toBe(targetEmoji)
        );

        const expectedUrl: string = emojiListService.baseUrl + '/' + targetId;
        const req = httpTestingController.expectOne(expectedUrl);
        expect(req.request.method).toEqual('GET');
        req.flush(targetEmoji);
    });
/!*
    it('adding a user calls api/users/new', () => {
        const jesse_id = { '$oid': 'jesse_id' };
        const newUser: User = {
            _id: '',
            name: 'Jesse',
            age: 72,
            company: 'Smithsonian',
            email: 'jesse@stuff.com'
        };

        userListService.addNewUser(newUser).subscribe(
            id => {
                expect(id).toBe(jesse_id);
            }
        );

        const expectedUrl: string = userListService.baseUrl + '/new';
        const req = httpTestingController.expectOne(expectedUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(jesse_id);
    });
    *!/
});

*/