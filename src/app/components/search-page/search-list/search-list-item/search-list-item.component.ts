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

  private defaultPic = '/assets/images/defaultAvatar.png';
  private imgUrl = 'http://192.168.1.209:8080/user/{{sitter.id}}/image';

  constructor(private searchDataService: SearchDataTransferService) { }

  ngOnInit() {
  }

  onError(): void{
      this.imgUrl = this.defaultPic;
  }
}
