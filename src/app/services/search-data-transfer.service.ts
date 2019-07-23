import { Injectable } from '@angular/core';
import {SearchData} from '../interfaces/search-data';
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

  constructor(private http: HttpClient) { }

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


}
