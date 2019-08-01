import { Component, OnInit, Input } from '@angular/core';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';
import { SearchedSitter } from 'src/app/interfaces/searchedSitter';
import { PlaceOfService, PetType, SearchData } from 'src/app/interfaces/search-data';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input()
  sitters: SearchedSitter[];
  numberOfSittersToShow = 10;
  @Input()
  isLoading: boolean;

  constructor(private searchDataService: SearchDataTransferService) {}

  ngOnInit() {
  }

  showMoreSitters(): void {
      this.numberOfSittersToShow += 10;
  }

  hasMoreSitters(): void {
    this.sitters.length - this.numberOfSittersToShow > 0
  }
}
