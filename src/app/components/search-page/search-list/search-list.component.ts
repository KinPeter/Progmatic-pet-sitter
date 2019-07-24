import { Component, OnInit } from '@angular/core';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';
import { SearchedSitter } from 'src/app/interfaces/searchedSitter';
import { PlaceOfService, PetType, SearchData } from 'src/app/interfaces/search-data';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  sitters: SearchedSitter[];
  isLoading: boolean;


  constructor(private searchDataService: SearchDataTransferService) {
    this.sitters = this.searchDataService.sitters;
  }

  ngOnInit() {
      // this.searchDataService.getSitters().then( sitters => {
      //   this.sitters = sitters;
      //   this.isLoading = false;
      // });
  }
  refreshSitters(sitters: SearchedSitter[]){
      this.sitters = sitters;
  }

}
