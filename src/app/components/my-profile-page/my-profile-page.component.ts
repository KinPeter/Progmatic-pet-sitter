import { Component, OnInit, Input } from '@angular/core';
import {User, Sitter, Owner} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import { PettypeService } from '../../services/pettype.service';
import { ServicePlaceService } from '../../services/service-place.service';
import { SearchData, PetType, PlaceOfService, KeyValue} from '../../interfaces/search-data';
import { FieldValidatorService } from 'src/app/services/field-validator.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient, HttpEventType} from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-my-profile-page',
    templateUrl: './my-profile-page.component.html',
    styleUrls: ['./my-profile-page.component.scss'],
    animations: [
        trigger('dropdownForm', [
            state('in', style({
                opacity: 1,
                transform: 'scaleY(1)'
            })),
            transition('void => *', [ // fade-in animation
                style({ // initial style, before added to the DOM
                    opacity: 0,
                    transform: 'scaleY(0)'
                }),
                animate(300)
            ]),
            transition('* => void', [ // fade-out animation
                animate(300, style({
                    opacity: 0,
                    transform: 'scaleY(0)'
                }))
            ])
        ])
    ]
})
export class MyProfilePageComponent implements OnInit {

    selectedFile: File = null;



    user: User;
    sitter: Sitter;
    owner: Owner;
    passwordConfirm: '';

    // OWNER DATA fieldsb
    currentPetName = '';
    currentPetType : any;

    // SITTER DATA fields
    currentPlaceOfService : any;
    currentServicePetType : any;
    currentWage = 0;

    errors: string[];
    showNetworkAlert: boolean;
  //  isEmailValid: boolean;
    isPasswordValid: boolean;


    petTypes: KeyValue[];
    servicePlaces: KeyValue[];
  //  sercivePlaceType: KeyValue[];


    addPetOpen = false;
    addServiceOpen = false;





    constructor(private pettypeService: PettypeService, private servicePlaceService: ServicePlaceService,
      private userService: UserService, private validator: FieldValidatorService, private auth: AuthenticationService,
      private http: HttpClient) {
      this.errors = [];
      this.showNetworkAlert = false;
  //    this.isEmailValid = true;
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
/*
      this.user = {
          userId: 1,
          name: 'Gina',
          email: 'abc@gmai.com',
          ownerData: null,
          ownerData: {
            pets: [{
              petName: 'Cirmi',
              petType: PetType.CAT
            }]
          }
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
      }; */

      this.petTypes = this.pettypeService.getPetTypeArray();
      this.servicePlaces = this.servicePlaceService.getServicePlaceTypeArray();
      this.servicePlaces.unshift( {key: "NONE", value: "Helyszín típusa"} );
      this.petTypes.unshift( {key: "NONE", value: "Kedvenced típusa"} );
      this.currentPetType = "NONE";
      this.currentPlaceOfService = "NONE";
      this.currentServicePetType = "NONE";

      this.user = this.auth.currentUser;
      for (let i = 0; i < this.user.sitterData.services.length; i++) {
          this.user.sitterData.services[i].place = PlaceOfService[this.user.sitterData.services[0].place];
          this.user.sitterData.services[i].petType = PetType[this.user.sitterData.services[0].petType];
      }

    console.log(this.user);
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
        if (!this.user.ownerData) {
          this.user.ownerData = {
            pets: []
          }
        }
        this.user.ownerData.pets.push({petName: this.currentPetName, petType: this.currentPetType});
        this.currentPetName = '';
        this.currentPetType = "NONE";
        console.log(this.user.ownerData.pets);
    }

    addToMyServices(): void {
      this.currentServicePetType = PetType[this.currentServicePetType];
      this.currentPlaceOfService = PlaceOfService[this.currentPlaceOfService];
        this.user.sitterData.services.push({
            place: this.currentPlaceOfService,
            petType: this.currentServicePetType,
            pricePerHour: this.currentWage
        });
        this.currentPlaceOfService = "NONE";
        this.currentServicePetType = "NONE";
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
