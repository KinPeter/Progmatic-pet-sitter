import { Injectable } from '@angular/core';
import {SearchData, PlaceOfService, PetType} from '../interfaces/search-data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchedSitterDTO } from '../interfaces/searchedSitter-dto';
import { SearchedSitter } from '../interfaces/searchedSitter';
//import { SearchError } from '../errors/search-error';

@Injectable({
  providedIn: 'root'
})
export class SearchDataTransferService {

  public searchData: SearchData;
  private readonly URL = 'http://192.168.1.237:8080/search/sitters';
  sitters: SearchedSitter[];

  constructor(private http: HttpClient) {
    // this.sitters = [
    //   {
    //     id: 1,
    //     name: "Wincs Eszter",
    //     postalCode: "4032",
    //     city: "Debrecen",
    //     services: {
    //       place: PlaceOfService.SITTERS_HOME,
    //       petType: PetType.DOG
    //     }
    //   },
    //   {
    //     id: 2,
    //     name: "Citad Ella",
    //     postalCode: "1111",
    //     city: "Budapest",
    //     services: {
    //       place: PlaceOfService.OWNERS_HOME,
    //       petType: PetType.CAT
    //     }
    //   }
    // ];
  }


  getSitters(): Promise<SearchedSitter[]> {
      return this.http.get(this.URL, {withCredentials: true}).toPromise()
      .then( );
  }

  // getSitter(userId: number): Promise<SearchedSitter> {
  //     return this.http.get(this.URL + '?id=' + userId, {withCredentials: true})
  //     .toPromise().then(this.transformSitterDTO).then( values => values[0]);
  // }

  searchSitter(searchData: SearchData): Promise<SearchedSitter[]> {
      let httpParams = new HttpParams();
      Object.keys(searchData).forEach(function (key) {
        httpParams = httpParams.append(key, searchData[key]);
      });

      return this.http.get<SearchedSitter[]>(this.URL, {params: httpParams, withCredentials: true})
        .toPromise();
  }

}
