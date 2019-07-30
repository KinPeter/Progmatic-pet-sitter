import { Injectable } from '@angular/core';
import { SearchData, PlaceOfService, PetType } from '../interfaces/search-data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchedSitter } from '../interfaces/searchedSitter';
import { SitterView } from '../interfaces/sitterView';
import { User, Day } from '../interfaces/user';
import { herokuURL } from '../app-settings';
// import { SearchError } from '../errors/search-error';

@Injectable({
    providedIn: 'root'
})
export class SearchDataTransferService {

    public searchData: SearchData;
    private readonly URL = herokuURL;
    public sitters: SearchedSitter[];
    public sitter: SearchedSitter;

    constructor(private http: HttpClient) { }

    searchSitter(searchData: SearchData): Promise<SearchedSitter[]> {
        const sd = JSON.parse(JSON.stringify(searchData));
        let httpParams = new HttpParams();
        Object.keys(sd).forEach((key) => {
            if (sd[key] === 'NONE') {
                sd[key] = '';
            }
            httpParams = httpParams.append(key, sd[key]);
        });

        return this.http.get<SearchedSitter[]>(this.URL + '/search/sitters', { params: httpParams, withCredentials: true })
            .toPromise();
    }

    getSitterProfile(userId: number): Promise<SitterView> {
        return this.http.get<SitterView>(this.URL + `/sitter/${userId}`, { withCredentials: true }).toPromise();
        // return this.http.get<SitterView>('../../../assets/sitterview.json', { withCredentials: true }).toPromise();
    }

    sendMessageToSitterWithDay(day: Day): Promise<any> {
        return this.http.post(this.URL + '/requestsitting', { id: day.id }, { withCredentials: true }).toPromise();
    }

    sendSitterRating(sitterId: number, rating: number): Promise<any> {
        return this.http.post(this.URL + '/', {userId: sitterId, newRating: rating}).toPromise();
    }
}
