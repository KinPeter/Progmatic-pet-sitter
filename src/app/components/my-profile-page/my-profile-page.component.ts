import { Component, OnInit, Input } from '@angular/core';
import {User, Sitter, Owner} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import { PettypeService } from '../../services/pettype.service';
import { ServicePlaceService } from '../../services/service-place.service';
import { SearchData, PetType, PlaceOfService, KeyValue} from '../../interfaces/search-data';
import { FieldValidatorService } from 'src/app/services/field-validator.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient, HttpEventType} from '@angular/common/http';

@Component({
    selector: 'app-my-profile-page',
    templateUrl: './my-profile-page.component.html',
    styleUrls: ['./my-profile-page.component.scss']
})
export class MyProfilePageComponent implements OnInit {

    selectedFile: File = null;



    user: User;
    sitter: Sitter;
    owner: Owner;
    passwordConfirm: '';

    // OWNER DATA fieldsb
    currentPetName = '';
    currentPetType = null;

    // SITTER DATA fields
    currentPlaceOfService = PlaceOfService.OWNERS_HOME;
    currentServicePetType = PetType.DOG;
    currentWage = 0;

    errors: string[];
    showNetworkAlert: boolean;
    isEmailValid: boolean;
    isPasswordValid: boolean;


    petTypes: KeyValue[];
    servicePlaces: KeyValue[];
  //  sercivePlaceType: KeyValue[];





    constructor(private pettypeService: PettypeService, private servicePlaceService: ServicePlaceService,
      private userService: UserService, private validator: FieldValidatorService, private auth: AuthenticationService,
      private http: HttpClient) {
      this.errors = [];
      this.showNetworkAlert = false;
      this.isEmailValid = true;
      this.isPasswordValid = true;
      this.petTypes = [];
      for(let type in PetType) {
        this.petTypes.push({"key": type, "value": PetType[type]});
      }

      this.servicePlaces= [];
      for(let place in PlaceOfService) {
        this.servicePlaces.push({"key": place, "value": PlaceOfService[place]});
      }



    //  this.petType = this.pettypeService.getPetTypeArray();
    //  this.sercivePlaceType = this.servicePlaceService.getServicePlaceTypeArray();

      this.user = {
          userId: 1,
          name: 'Gina',
          email: 'abc@gmai.com',
        //  ownerData: null,
          ownerData: {
            pets: [{
              petName: 'Cirmi',
              petType: PetType.CAT
          }]
        },
          sitterData: {
            address: 'Csemete utca 10.',
            postCode: '1036',
            city: 'Budapest',
            intro: 'string',
            services: [{
              placeOfService: PlaceOfService.OWNERS_HOME,
              petType: PetType.DOG,
              pricePerHour: 5000,
            }]
          }
      };

      // this.user = this.auth.currentUser;
    }

    ngOnInit() {
    }

    onFileSelected(event){
      this.selectedFile = <File>event.target.file[0];
    }

    onUpload() {
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      this.http.post('', fd, {
        reportProgress: true,
        observe: 'events'
      })
      .subscribe(event =>{
        if (event.type === HttpEventType.UploadProgress){
          console.log('Uplouad progress: ' + Math.round(event.loaded / event.total) * 100 + '%')
        } else if(event.type === HttpEventType.Response){
          console.log(event)
        }

      })
    }

    save(): void {
    this.showNetworkAlert = false;
    this.userService.modifyUser(this.user).catch(() => {
      showNetworkAlert: true;

    });

    }

    addToMyPets(): void {
        this.currentPetType = PetType[this.currentPetType];
        this.user.ownerData.pets.push({petName: this.currentPetName, petType: this.currentPetType});
        this.currentPetName = '';
        this.currentPetType = null;
        console.log(this.user.ownerData.pets);
    }

    addToMyServices(): void {
      this.currentPetType = PetType[this.currentPetType];
      this.currentPlaceOfService = PlaceOfService[this.currentPlaceOfService];
        this.user.sitterData.services.push({
            placeOfService: this.currentPlaceOfService,
            petType: this.currentServicePetType,
            pricePerHour: this.currentWage
        });
        this.currentPlaceOfService = null;
        this.currentServicePetType = null;
        this.currentWage = 0;
        console.log(this.user.sitterData.services);
    }

    showSitterData(): boolean{
      if (this.user.sitterData != null) {
        return true;
      }
    }

    showOwnerData(): boolean{
      if (this.user.ownerData != null) {
        return true;
      }
    }


}
