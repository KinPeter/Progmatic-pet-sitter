import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PetType, PlaceOfService, KeyValue, SearchData } from 'src/app/interfaces/search-data';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';
import { PettypeService } from 'src/app/services/pettype.service';
import { ServicePlaceService } from 'src/app/services/service-place.service';
import { FieldValidatorService } from 'src/app/services/field-validator.service';
import { SearchedSitter } from 'src/app/interfaces/searchedSitter';

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.scss']
})
export class SearchDataComponent implements OnInit {

  @Output()
  eventSearched: EventEmitter<SearchedSitter[]> = new EventEmitter();

  petTypes: KeyValue[];
  placeTypes: KeyValue[];
  searchDataFromMainPage: SearchData;
  isPostcodeValid: boolean;
  selectedPetType: any;
  selectedPlaceType: any;

  constructor(public dataTrService: SearchDataTransferService,
              public petTypeService: PettypeService,
              public placeService: ServicePlaceService,
              public fieldValidator: FieldValidatorService,
              private router: Router,
              private route: ActivatedRoute) {

      this.searchDataFromMainPage = {
        name: '',
        postcode: '',
        place: null,
        petType: null,
      }

      this.petTypes = this.petTypeService.getPetTypeArray();
      this.petTypes.unshift( {key: "NONE", value: "Kedvenced típusa"} );
      if(!this.dataTrService.searchData) {
        this.selectedPetType = "NONE";
      }
      this.placeTypes = this.placeService.getServicePlaceTypeArray();
      this.placeTypes.unshift( {key: "NONE", value: "Helyszín típusa"} );
      if(!this.dataTrService.searchData) {
        this.selectedPlaceType = "NONE";
      }
      this.isPostcodeValid = true;
  }

  ngOnInit() {
      this.searchDataFromMainPage = this.dataTrService.searchData;
      if(this.searchDataFromMainPage === undefined){
          this.searchDataFromMainPage = {
            name: '',
            postcode: '',
            place: this.selectedPlaceType,
            petType: this.selectedPetType,
          }
      }
      this.search();
  }
  search(): void {
    //spinner

    this.dataTrService.searchSitter(this.searchDataFromMainPage).then(values => {
      this.eventSearched.emit(values);
    });
  }


}
