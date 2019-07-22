import { Component, OnInit } from '@angular/core';
import { PetType, PlaceOfService, KeyValue, SearchData } from 'src/app/interfaces/search-data';
import { Router } from '@angular/router';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';
import { PettypeService } from 'src/app/services/pettype.service';
import { ServicePlaceService } from 'src/app/services/service-place.service';

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.scss']
})
export class SearchDataComponent implements OnInit {

  petTypes: KeyValue[];
  placeTypes: KeyValue[];
  searchDataFromMainPage: SearchData;
  selectedValue: any;

  constructor(public dataTrService: SearchDataTransferService,
              public petTypeService: PettypeService,
              public placeService: ServicePlaceService,
              private router: Router,) {

      this.petTypes = this.petTypeService.getPetTypeArray();
      this.petTypes.unshift( {key: "NONE", value: "Kedvenced típusa"} );
      this.selectedValue = "NONE";
      this.placeTypes = this.placeService.getServicePlaceTypeArray();
      this.placeTypes.unshift( {key: "NONE", value: "Helyszín típusa"} );
      this.selectedValue = "NONE";
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
