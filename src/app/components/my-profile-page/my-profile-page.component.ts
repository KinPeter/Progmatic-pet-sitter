import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import { PettypeService } from '../../services/pettype.service';
import { ServicePlaceService } from '../../services/service-place.service';
import { SearchData, PetType, PlaceOfService, KeyValue} from '../../interfaces/search-data';
import { FieldValidatorService } from 'src/app/services/field-validator.service';

@Component({
    selector: 'app-my-profile-page',
    templateUrl: './my-profile-page.component.html',
    styleUrls: ['./my-profile-page.component.scss']
})
export class MyProfilePageComponent implements OnInit {

    @Input()
    user: User;

    errors: string[];
    showNetworkAlert: boolean;
    petType: KeyValue[];
    sercivePlaceType: KeyValue[];

    constructor(private pettypeService: PettypeService, private servicePlaceService: ServicePlaceService,
      private userService: UserService, private validator: FieldValidatorService) {
      this.errors = [];
      this.showNetworkAlert = false;
      this.petType = this.pettypeService.getPetTypeArray();
      this.sercivePlaceType = this.servicePlaceService.getServicePlaceTypeArray();

    //  this.isPostcodeValid = true;

    }

    ngOnInit() {
    }

    save(): void {
    this.showNetworkAlert = false;
    this.userService.modifyUser(this.user).catch(() =>{
      showNetworkAlert: true;

    });
  }

}
