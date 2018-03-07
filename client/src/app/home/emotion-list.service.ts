import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Emotion} from './emotion';
import {environment} from '../../environments/environment';


@Injectable()
export class EmotionListService {
    readonly baseUrl: string = environment.API_URL + 'emotions';
    private emotionUrl: string = this.baseUrl;

    constructor(private http: HttpClient) {
    }

    addNewEmotion(newEmotion: Emotion): Observable<{'$oid': string}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        // Send post request to add a new user with the user data as the body with specified headers.
        return this.http.post<{'$oid': string}>(this.emotionUrl + '/new', newEmotion, httpOptions);
    }
}
