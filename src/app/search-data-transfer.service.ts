import { Injectable } from '@angular/core';
import {SearchData} from './interfaces/search-data';

@Injectable({
  providedIn: 'root'
})
export class SearchDataTransferService {

  public searchData: SearchData;

  constructor() { }
}
