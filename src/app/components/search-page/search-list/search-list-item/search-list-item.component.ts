import { Component, OnInit, Input } from '@angular/core';
import { SearchedSitter } from 'src/app/interfaces/searchedSitter';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';
import { herokuURL } from 'src/app/app-settings';

@Component({
  selector: '[app-search-list-item]',
  templateUrl: './search-list-item.component.html',
  styleUrls: ['./search-list-item.component.scss']
})
export class SearchListItemComponent implements OnInit {

  @Input()
  sitter: SearchedSitter;
  private imgUrl: any = null;

  constructor(private searchDataService: SearchDataTransferService) {
  }

  ngOnInit() {
    this.imgUrl = herokuURL + "/user/" + this.sitter.id + "/image";

      if(!this.imgUrl){
          this.imgUrl = 'assets/images/defaultAvatar.png';
      }


  }

}
