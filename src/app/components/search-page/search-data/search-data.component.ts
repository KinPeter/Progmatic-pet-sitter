import { Component, OnInit } from '@angular/core';
import { PetType, PlaceOfService, KeyValue, SearchData } from 'src/app/interfaces/search-data';
import { SearchDataTransferService } from 'src/app/search-data-transfer.service';
import { PettypeService } from 'src/app/pettype.service';
import { ServicePlaceService } from 'src/app/service-place.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.scss']
})
export class SearchDataComponent implements OnInit {

  petTypes: KeyValue[];
  placeTypes: KeyValue[];
  searchDataFromMainPage: SearchData;

  constructor(public dataTrService: SearchDataTransferService,
              public petTypeService: PettypeService,
              public placeService: ServicePlaceService,
              private router: Router,) {

      this.petTypes = this.petTypeService.getPetTypeArray();
      this.placeTypes = this.placeService.getServicePlaceTypeArray();
  }

  ngOnInit() {
      this.searchDataFromMainPage = this.dataTrService.searchData;
      if(this.searchDataFromMainPage === undefined){
          this.searchDataFromMainPage = {
            name: '',
            postcode: null,
            place: null,
            petType: null,
          }
      }
  }

}
