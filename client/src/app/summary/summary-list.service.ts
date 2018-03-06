import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Summary} from './summary';
import {environment} from '../../environments/environment';


@Injectable()
export class SummaryListService {
    readonly baseUrl: string = environment.API_URL + 'summarys';
    private summaryUrl: string = this.baseUrl;

    constructor(private http: HttpClient) {
    }

    getSummarys(summaryEmotion?: string): Observable<Summary[]> {
        this.filterByEmotion(summaryEmotion);
        return this.http.get<Summary[]>(this.summaryUrl);
    }


    /*
    //This method looks lovely and is more compact, but it does not clear previous searches appropriately.
    //It might be worth updating it, but it is currently commented out since it is not used (to make that clear)
    getUsersByCompany(userCompany?: string): Observable<User> {
        this.userUrl = this.userUrl + (!(userCompany == null || userCompany == "") ? "?company=" + userCompany : "");
        console.log("The url is: " + this.userUrl);
        return this.http.request(this.userUrl).map(res => res.json());
    }
    */

    filterByEmotion(summaryEmotion?: string): void {
        if (!(summaryEmotion == null || summaryEmotion === '')) {
            if (this.parameterPresent('emotion=') ) {
                // there was a previous search by company that we need to clear
                this.removeParameter('emotion=');
            }
            if (this.summaryUrl.indexOf('?') !== -1) {
                // there was already some information passed in this url
                this.summaryUrl += 'emotion=' + summaryEmotion + '&';
            } else {
                // this was the first bit of information to pass in the url
                this.summaryUrl += '?emotion=' + summaryEmotion + '&';
            }
        } else {
            // there was nothing in the box to put onto the URL... reset
            if (this.parameterPresent('emotion=')) {
                let start = this.summaryUrl.indexOf('emotion=');
                const end = this.summaryUrl.indexOf('&', start);
                if (this.summaryUrl.substring(start - 1, start) === '?') {
                    start = start - 1;
                }
                this.summaryUrl = this.summaryUrl.substring(0, start) + this.summaryUrl.substring(end + 1);
            }
        }
    }

    private parameterPresent(searchParam: string) {
        return this.summaryUrl.indexOf(searchParam) !== -1;
    }

    // remove the parameter and, if present, the &
    private removeParameter(searchParam: string) {
        const start = this.summaryUrl.indexOf(searchParam);
        let end = 0;
        if (this.summaryUrl.indexOf('&') !== -1) {
            end = this.summaryUrl.indexOf('&', start) + 1;
        } else {
            end = this.summaryUrl.indexOf('&', start);
        }
        this.summaryUrl = this.summaryUrl.substring(0, start) + this.summaryUrl.substring(end);
    }
}

