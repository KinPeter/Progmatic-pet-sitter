import { Injectable } from '@angular/core';
import {SearchData, PlaceOfService, PetType} from '../interfaces/search-data';
import { HttpClient } from '@angular/common/http';
import { SearchedSitterDTO } from '../interfaces/searchedSitter-dto';
import { SearchedSitter } from '../interfaces/searchedSitter';
import { SearchError } from '../errors/search-error';

@Injectable({
  providedIn: 'root'
})
export class SearchDataTransferService {

  public searchData: SearchData;
  private readonly URL = '?';
  sitters: SearchedSitter[];

  constructor(private http: HttpClient) {
    this.sitters = [
      {
        id: 1,
        name: "Wincs Eszter",
        postalCode: "4032",
        city: "Debrecen",
        services: {
          place: PlaceOfService.SITTERS_HOME,
          petType: PetType.DOG
        }
      },
      {
        id: 2,
        name: "Citad Ella",
        postalCode: "1111",
        city: "Budapest",
        services: {
          place: PlaceOfService.OWNERS_HOME,
          petType: PetType.CAT
        }
      }
    ];
  }

  private transformSitterDTO(serverData: SearchedSitterDTO ): SearchedSitter[]{
    if (!serverData.success){
      throw new SearchError(serverData['error-infos']);
    }
    return serverData.searchedSitter;
  }


  getSitters(): Promise<SearchedSitter[]> {
      return this.http.get(this.URL, {withCredentials: true}).toPromise()
      .then( this.transformSitterDTO );
  }

  getSitter(userId: number): Promise<SearchedSitter> {
      return this.http.get(this.URL + '?id=' + userId, {withCredentials: true})
      .toPromise().then(this.transformSitterDTO).then( values => values[0]);
  }

  searchSitter(searchData: SearchData): void {
      this.http.post(this.URL, {searchData}, {withCredentials: true})
      .toPromise().then(this.transformSitterDTO).then(values => {
        this.sitters = values;
      });
  }


}
