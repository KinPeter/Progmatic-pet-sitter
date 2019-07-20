import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchData, PetType, PlaceOfService, KeyValue} from '../../../interfaces/search-data';
import { SearchDataTransferService} from '../../../services/search-data-transfer.service'
import { PettypeService} from '../../../services/pettype.service';
import { ServicePlaceService} from '../../../services/service-place.service';

@Component({
    selector: 'app-main-search',
    templateUrl: './main-search.component.html',
    styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {

  currentSlide: number;
  searchData: SearchData
  petType: KeyValue[];
  sercivePlaceType: KeyValue[];

  constructor(private router: Router, private searchDataTransferService: SearchDataTransferService, private pettypeService: PettypeService, private servicePlaceService: ServicePlaceService) {
    this.currentSlide = 0;

    this.searchData = {
    name: '',
    postcode: null,
    place: PlaceOfService.OWNERS_HOME,
    petType: PetType.BIRD,
    }

    this.petType = this.pettypeService.getPetTypeArray();
    this.sercivePlaceType = this.servicePlaceService.getServicePlaceTypeArray();
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
