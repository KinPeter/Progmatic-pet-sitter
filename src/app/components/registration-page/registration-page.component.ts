import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldValidatorService } from 'src/app/services/field-validator.service';
import { PetType, PlaceOfService, KeyValue } from '../../interfaces/search-data';
import { UserService } from 'src/app/services/user.service';
import { User, Owner, Sitter } from '../../interfaces/user';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PettypeService } from 'src/app/services/pettype.service';
import { ServicePlaceService } from 'src/app/services/service-place.service';


@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss'],
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
export class RegistrationPageComponent implements OnInit {

    private user: User;
    private passwordConfirm = '';

    // OWNER DATA fields
    private ownerDataOpen = false;
    private ownerData: Owner;
    private currentPetName = '';
    private currentPetType: any;

    // SITTER DATA fields
    private sitterDataOpen = false;
    private sitterData: Sitter;
    private currentPlaceOfService : any;
    private currentServicePetType : any;
    private currentWage = 0;
    private errors: any;

    private petTypes: KeyValue[];
    private servicePlaces: KeyValue[];

    constructor(
        private router: Router,
        private userService: UserService,
        private validator: FieldValidatorService,
        private pettypeService: PettypeService,
        private servicePlaceService: ServicePlaceService

    ) {
        this.user = {
            name: '',
            email: '',
            password: '',
            ownerData: null,
            sitterData: null
        };
        this.ownerData = {
            pets: []
        };
        this.sitterData = {
            address: '',
            postalCode: '',
            city: '',
            intro: '',
            services: []
        };
        this.errors = {
            name: false,
            email: {'empty': false, 'not_valid': false},
            password: {'empty': false, 'not_same': false},
            passwordConfirm: {'empty': false, 'not_same': false},
            petType: false,
            petsname: false,
            address: false,
            postalCode: {'empty': false, 'not_valid': false},
            city: false,
            intro: false,
            servicePlace: false,
            servicePetType: false,
            currentWage: false

        };
        this.petTypes = this.pettypeService.getPetTypeArray();
        this.servicePlaces = this.servicePlaceService.getServicePlaceTypeArray();
        this.servicePlaces.unshift( {key: "NONE", value: "Helyszín típusa"} );
        this.petTypes.unshift( {key: "NONE", value: "Kisállat típusa"} );
        this.currentPetType = "NONE";
        this.currentPlaceOfService = "NONE";
        this.currentServicePetType = "NONE";
    }

    addToMyPets(): void {
        if (this.currentPetType != "NONE" && this.currentPetName != '') {
            this.currentPetType = PetType[this.currentPetType];
            this.ownerData.pets.push({petName: this.currentPetName, petType: this.currentPetType});
        }
        this.errors.petType = this.validator.validateName(this.user.name);
        this.errors.petsname = this.validator.validateName(this.user.name);
        this.currentPetName = '';
        this.currentPetType = "NONE";
        console.log(this.ownerData.pets);
    };

    addToMyServices(): void {
        if (this.currentPlaceOfService != null && this.currentServicePetType != null && this.currentWage != 0) {

        this.sitterData.services.push({
            place: this.currentPlaceOfService,
            petType: this.currentServicePetType,
            pricePerHour: this.currentWage

        })};
        this.errors.city = this.validator.validateName(this.sitterData.city);
        this.errors.address = this.validator.validateName(this.sitterData.address);
        this.errors.postalCode.empty = this.validator.validateName(this.sitterData.postalCode);
        this.errors.postalCode.not_valid = !this.validator.validatePostcode(this.sitterData.postalCode);
        this.errors.intro = this.validator.validateName(this.sitterData.intro);
        this.errors.servicePlace = this.validator.validateName(this.sitterData.services.length[0]);
        this.errors.servicePetType = this.validator.validateName(this.sitterData.services.length[1]);
        this.errors.currentWage = this.validator.validateName(this.sitterData.postalCode);
        this.currentPlaceOfService = null;
        this.currentServicePetType = null;
        this.currentWage = 0;
        console.log(this.sitterData.services);
    }


    submitRegistration() {
        this.errors = {
            name: false,
            email: {'empty': false, 'not_valid': false},
            password: {'empty': false, 'not_same': false},
            passwordConfirm: {'empty': false, 'not_same': false},
            petType: false,
            petsname: false,
            address: false,
            postalCode: {'empty': false, 'not_valid': false},
            city: false,
            intro: false,
            servicePlace: false,
            servicePetType: false,
            currentWage: false
        };
        // név validáládsa
        this.errors.name = this.validator.validateName(this.user.name);
        // email validáládsa
        this.errors.email.empty = this.validator.validateName(this.user.email);
        this.errors.email.not_valid != this.validator.validateEmail(this.user.email);

        if (this.errors.email.empty) {
            this.errors.email.empty = true;
            this.errors.email.not_valid = true;
        }
        if (!this.errors.email.empty && !this.validator.validateEmail(this.user.email)) {
            this.errors.email.empty = false;
            this.errors.email.not_valid = true;
        }
        if (this.validator.validateEmail(this.user.email)) {
            this.errors.email.empty = false;
            this.errors.email.not_valid = false;
        }
        // jelszó validáládsa
        this.errors.password.empty = this.validator.validateName(this.user.password);
        this.errors.passwordConfirm.empty = this.validator.validateName(this.passwordConfirm);

        if (!this.errors.password.empty && this.user.password !== this.passwordConfirm) {
            this.errors.password.not_same = true;
            this.errors.passwordConfirm.not_same = true;
        }
        if (!this.errors.passwordConfirm.empty && this.user.password !== this.passwordConfirm) {
            this.errors.password.not_same = true;
            this.errors.passwordConfirm.not_same = true;
        }






        // ha le van nyitva - ergo kitöltötte az OWNER adatokat, adja hozzá a user-hez
        if (this.ownerDataOpen) {
            this.user.ownerData = this.ownerData;
        }
        let u = JSON.parse(JSON.stringify(this.user));
        if (u.ownerData) {
            for (let i = 0; i < u.ownerData.pets.length; i++) {
                u.ownerData.pets[i].petType = this.userService.getEnumKey( PetType, u.ownerData.pets[i].petType );
            }
        }


        // ha le van nyitva - ergo kitöltötte a SITTER adatokat, adja hozzá a user-hez
        if (this.sitterDataOpen) {
            this.user.sitterData = this.sitterData;
        }
        if (u.sitterData) {
          for (let i = 0; i < u.sitterData.services.length; i++) {
              u.sitterData.services[i].petType = this.userService.getEnumKey( PetType, u.sitterData.services[i].petType );
              u.sitterData.services[i].place = this.userService.getEnumKey( PlaceOfService, u.sitterData.services[i].place );
              u.sitterData.services[i].pricePerHour = parseInt(u.sitterData.services[i].pricePerHour);
              u.sitterData.services[i].pricePerDay = parseInt(u.sitterData.services[i].pricePerHour) * 8;
          }
        }

        var s = Object.values(this.errors).find((e) => {
            if (Object.values(e).length) {
                Object.values(e).find(elem => {return elem === true});
            } else {
                return e === true;
            }
        });
        console.log(s);
        // végül:
        console.log(u);
        this.userService.registerUser(u)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    ngOnInit() {
    }

}
