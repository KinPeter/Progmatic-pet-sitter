import { Component, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchData, PetType, PlaceOfService, KeyValue} from '../../../interfaces/search-data';
import { SearchDataTransferService} from '../../../services/search-data-transfer.service'
import { PettypeService} from '../../../services/pettype.service';
import { ServicePlaceService} from '../../../services/service-place.service';
import { FieldValidatorService } from 'src/app/services/field-validator.service';

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
  isPostcodeValid: boolean;
  selectedPetType: any;
  selectedPlace: any;

  constructor(private router: Router, private searchDataTransferService: SearchDataTransferService, private pettypeService: PettypeService, private servicePlaceService: ServicePlaceService, private validator: FieldValidatorService) {
    this.currentSlide = 0;

    this.searchData = {
    name: '',
    postcode: null,
    place: null,
    petType: null,
    }

    this.petType = this.pettypeService.getPetTypeArray();
    this.sercivePlaceType = this.servicePlaceService.getServicePlaceTypeArray();
    this.sercivePlaceType.unshift( {key: "NONE", value: "Helyszín típusa"} );
    this.petType.unshift( {key: "NONE", value: "Kedvenced típusa"} );
    this.selectedPetType = "NONE";
    this.selectedPlace = "NONE";

    this.isPostcodeValid = true;

  }


    ngOnInit() {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % 3;
      }, 4000);
    }

    validatePostcodeNumber() : boolean {
      if ( this.searchData.postcode == null ) {
        return false;
      } else {
        this.isPostcodeValid = this.validator.validatePostcode( this.searchData.postcode );
        return !this.isPostcodeValid;
      }
    }

    store (): void {
      this.searchDataTransferService.searchData = Object.assign({}, this.searchData);
    }


}
