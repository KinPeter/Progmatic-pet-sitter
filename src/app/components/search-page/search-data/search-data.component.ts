import { Component, OnInit } from '@angular/core';
import { PetType, PlaceOfService, KeyValue, SearchData } from 'src/app/interfaces/search-data';
import { SearchDataTransferService } from 'src/app/search-data-transfer.service';
import { PettypeService } from 'src/app/pettype.service';
import { ServicePlaceService } from 'src/app/service-place.service';

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.scss']
})
export class SearchDataComponent implements OnInit {

  petTypes: KeyValue[];
  placeTypes: KeyValue[];
  searchData: SearchData;

  constructor(public dataService: SearchDataTransferService,
              public petTypeService: PettypeService,
              public placeService: ServicePlaceService) {

      this.searchData = {
        name: '',
        postcode: null,
        place: PlaceOfService.OWNERS_HOME,
        petType: PetType.BIRD,
      }

      this.petTypes = this.petTypeService.getPetTypeArray();
      this.placeTypes = this.placeService.getServicePlaceTypeArray();
  }

  ngOnInit() {
  }

}
