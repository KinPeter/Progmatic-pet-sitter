import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchData, PetType, PlaceOfService} from 'search-data';
import { SearchDataTransferService} from '../../../search-data-transfer.service'

@Component({
    selector: 'app-main-search',
    templateUrl: './main-search.component.html',
    styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {

  currentSlide: number;
  searchData: SearchData

  constructor(private router: Router, private searchDataTransferService: SearchDataTransferService) {
    this.currentSlide = 0;

    this.searchData = {
    name: '',
    postcode: null,
    place: PlaceOfService.OWNERS_HOME,
    petType: PetType.BIRD,
    }
  }


    ngOnInit() {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % 3;
      }, 4000);

    }

  //  btnClick(): void {
  //    this.router.navigate(['/search-page']);
  //  };

  store (): void {
   this.searchDataTransferService.searchData = this.searchData;
 }



}
