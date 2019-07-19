import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchData, PetType, PlaceOfService, KeyValue} from '../../../interfaces/search-data';
import { SearchDataTransferService} from '../../../search-data-transfer.service'
import { PettypeService} from '../../../pettype.service';

@Component({
    selector: 'app-main-search',
    templateUrl: './main-search.component.html',
    styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {

  currentSlide: number;
  searchData: SearchData
  petType: KeyValue[];

  constructor(private router: Router, private searchDataTransferService: SearchDataTransferService, private pettypeService: PettypeService) {
    this.currentSlide = 0;

    this.searchData = {
    name: '',
    postcode: null,
    place: PlaceOfService.OWNERS_HOME,
    petType: PetType.BIRD,
    }

    this.petType = this.pettypeService.getPetTypeArray();
  }


    ngOnInit() {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % 3;
      }, 4000);

    }

  store (): void {
   this.searchDataTransferService.searchData = Object.assign({}, this.searchData);
  }



}
