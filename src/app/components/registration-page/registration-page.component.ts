import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldValidatorService } from 'src/app/services/field-validator.service';
import { PetType, PlaceOfService } from '../../interfaces/search-data';
import { UserService } from 'src/app/services/user.service';
import { User, Owner, Sitter } from '../../interfaces/user';
import { trigger, state, style, transition, animate } from '@angular/animations';


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
    private currentPetType = null;

    // SITTER DATA fields
    private sitterDataOpen = false;
    private sitterData: Sitter;
    private currentPlaceOfService = PlaceOfService.OWNERS_HOME;
    private currentServicePetType = PetType.DOG;
    private currentWage = 0;
    private errors: any;

    constructor(
        private router: Router,
        private userService: UserService,
        private validator: FieldValidatorService
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
            postCode: '',
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
            postCode: {'empty': false, 'not_valid': false},
            city: false,
            intro: false,
            servicePlace: false,
            servicePetType: false,
            currentWage: false

        };
    }

    addToMyPets(): void {
        if (this.currentPetType != null && this.currentPetName != '') {
        this.ownerData.pets.push({petName: this.currentPetName, petType: this.currentPetType});
        }
        this.currentPetName = '';
        this.currentPetType = null;
        console.log(this.ownerData.pets);
    };

    addToMyServices(): void {
        if (this.currentPlaceOfService != null && this.currentServicePetType != null && this.currentWage != 0) {

        this.sitterData.services.push({
            place: this.currentPlaceOfService,
            petType: this.currentServicePetType,
            pricePerHour: this.currentWage

        })};
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
            postCode: {'empty': false, 'not_valid': false},
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

        this.errors.petType = this.validator.validateName(this.user.name);

        this.errors.petsname = this.validator.validateName(this.user.name);

        this.errors.city = this.validator.validateName(this.sitterData.city);

        this.errors.address = this.validator.validateName(this.sitterData.address);

        this.errors.intro = this.validator.validateName(this.sitterData.intro);

        this.errors.postCode.empty = this.validator.validateName(this.sitterData.postCode);
        this.errors.postCode.not_valid = !this.validator.validatePostcode(this.sitterData.postCode);

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

        this.errors.currentWage = this.validator.validateName(this.sitterData.postCode);

        this.errors.servicePlace = this.validator.validateName(this.user.name);

        this.errors.servicePetType = this.validator.validateName(this.user.name);


        // ha le van nyitva - ergo kitöltötte az OWNER adatokat, adja hozzá a user-hez
        if (this.ownerDataOpen) {
            this.user.ownerData = this.ownerData;
        }


        // ha le van nyitva - ergo kitöltötte a SITTER adatokat, adja hozzá a user-hez
        if (this.sitterDataOpen) {
            this.user.sitterData = this.sitterData;
        }


        // végül:
        console.log(this.user);
        this.userService.registerUser(this.user)
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
