import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Emoji} from './emoji';
import {environment} from '../../environments/environment';


@Injectable()
export class EmojiListService {
    readonly baseUrl: string = environment.API_URL + 'emojis';
    private emojiUrl: string = this.baseUrl;

    constructor(private http: HttpClient) {
    }

    getEmojis(emojiEmotion?: string): Observable<Emoji[]> {
        this.filterByEmotion(emojiEmotion);
        return this.http.get<Emoji[]>(this.emojiUrl);
    }

    getEmojiByEmotion(emotion: string): Observable<Emoji> {
        return this.http.get<Emoji>(this.emojiUrl + '/' + emotion);
    }


    filterByEmotion(emojiEmotion?: string): void {
        if (!(emojiEmotion == null || emojiEmotion === '')) {
            if (this.parameterPresent('emotion=') ) {
                // there was a previous search by company that we need to clear
                this.removeParameter('emotion=');
            }
            if (this.emojiUrl.indexOf('?') !== -1) {
                // there was already some information passed in this url
                this.emojiUrl += 'emotion=' + emojiEmotion + '&';
            } else {
                // this was the first bit of information to pass in the url
                this.emojiUrl += '?emotion=' + emojiEmotion + '&';
            }
        } else {
            // there was nothing in the box to put onto the URL... reset
            if (this.parameterPresent('emotion=')) {
                let start = this.emojiUrl.indexOf('emotion=');
                const end = this.emojiUrl.indexOf('&', start);
                if (this.emojiUrl.substring(start - 1, start) === '?') {
                    start = start - 1;
                }
                this.emojiUrl = this.emojiUrl.substring(0, start) + this.emojiUrl.substring(end + 1);
            }
        }
    }

    private parameterPresent(searchParam: string) {
        return this.emojiUrl.indexOf(searchParam) !== -1;
    }

    // remove the parameter and, if present, the &
    private removeParameter(searchParam: string) {
        const start = this.emojiUrl.indexOf(searchParam);
        let end = 0;
        if (this.emojiUrl.indexOf('&') !== -1) {
            end = this.emojiUrl.indexOf('&', start) + 1;
        } else {
            end = this.emojiUrl.indexOf('&', start);
        }
        this.emojiUrl = this.emojiUrl.substring(0, start) + this.emojiUrl.substring(end);
    }

    addNewEmoji(newEmoji: Emoji): Observable<{'$oid': string}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        // Send post request to add a new user with the user data as the body with specified headers.
        return this.http.post<{'$oid': string}>(this.emojiUrl + '/new', newEmoji, httpOptions);
    }
}

