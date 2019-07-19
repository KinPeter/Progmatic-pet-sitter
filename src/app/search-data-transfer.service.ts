import { Injectable } from '@angular/core';
import {SearchData} from './components/front-page/main-search/search-data';

@Injectable({
  providedIn: 'root'
})
export class SearchDataTransferService {

  public searchData: SearchData;

  constructor() { }
}
