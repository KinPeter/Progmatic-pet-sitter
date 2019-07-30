import { Component, OnInit, Input } from '@angular/core';
import { SearchedSitter } from 'src/app/interfaces/searchedSitter';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';

@Component({
  selector: '[app-search-list-item]',
  templateUrl: './search-list-item.component.html',
  styleUrls: ['./search-list-item.component.scss']
})
export class SearchListItemComponent implements OnInit {

  @Input()
  sitter: SearchedSitter;
  private imgUrl: string;

  constructor(private searchDataService: SearchDataTransferService) { }

  ngOnInit() {
      if(this.imgUrl === ''){
          this.imgUrl = 'assets/images/defaultAvatar.png';
      }
  }

}
