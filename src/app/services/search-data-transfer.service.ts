import { Injectable } from '@angular/core';
import {SearchData, PlaceOfService, PetType} from '../interfaces/search-data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchedSitter } from '../interfaces/searchedSitter';
//import { SearchError } from '../errors/search-error';

@Injectable({
  providedIn: 'root'
})
export class SearchDataTransferService {

  public searchData: SearchData;
  private readonly URL = 'http://192.168.1.210:8080/sitter/search';
  public sitters: SearchedSitter[];
  public sitter: SearchedSitter;

  constructor(private http: HttpClient) { }

  searchSitter(searchData: SearchData): Promise<SearchedSitter[]> {
      let sd = JSON.parse(JSON.stringify(searchData));
      let httpParams = new HttpParams();
      Object.keys(sd).forEach(function (key) {
        if(sd[key] == 'NONE'){
          sd[key] = '';
        }
        httpParams = httpParams.append(key, sd[key]);
      });

      return this.http.get<SearchedSitter[]>(this.URL, {params: httpParams, withCredentials: true})
        .toPromise();
  }
}
