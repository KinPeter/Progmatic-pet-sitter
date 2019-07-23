import { Component, OnInit, Input } from '@angular/core';
import {User, Sitter, Owner} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import { PettypeService } from '../../services/pettype.service';
import { ServicePlaceService } from '../../services/service-place.service';
import { SearchData, PetType, PlaceOfService, KeyValue} from '../../interfaces/search-data';
import { FieldValidatorService } from 'src/app/services/field-validator.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-my-profile-page',
    templateUrl: './my-profile-page.component.html',
    styleUrls: ['./my-profile-page.component.scss']
})
export class MyProfilePageComponent implements OnInit {

    user: User;
    sitter: Sitter;
    owner: Owner;

    errors: string[];
    showNetworkAlert: boolean;
  //  petType: KeyValue[];
  //  sercivePlaceType: KeyValue[];

    constructor(private pettypeService: PettypeService, private servicePlaceService: ServicePlaceService,
      private userService: UserService, private validator: FieldValidatorService, private auth: AuthenticationService) {
      this.errors = [];
      this.showNetworkAlert = false;
  //    this.petType = this.pettypeService.getPetTypeArray();
  //    this.sercivePlaceType = this.servicePlaceService.getServicePlaceTypeArray();
      this.user = {
          userId: 1,
          name: "Gina",
          email: "abc@gmai.com",
          ownerData: {
            pettype: PetType.CAT
          },
          sitterData: {
            address: "Csemete utca 10.",
            postcode: "1036",
            city: "Budapest",
            introductionText: "string",
            place: PlaceOfService.OWNERS_HOME,
            petType: PetType.DOG,
            wage: 5000,
          }

      }
      //this.user = this.auth.currentUser;


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
