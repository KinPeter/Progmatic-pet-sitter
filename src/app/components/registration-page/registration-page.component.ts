import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldValidatorService } from 'src/app/services/field-validator.service';
import { PetType, PlaceOfService } from '../../interfaces/search-data';
import { UserService } from 'src/app/services/user.service';
import { User, Owner, Sitter } from '../../interfaces/user';
import { trigger, state, style, transition, animate } from '@angular/animations';

// TEMPORARY
export interface OwnersPet {
    petName: string;
    petType: PetType;
}
export interface OwnerDataTemp {
    pets: OwnersPet[];
}
export interface SitterService {
    placeOfService: PlaceOfService;
    petType: PetType;
    pricePerHour: number;
}
export interface SitterDataTemp {
    address: string;
    postCode: number;
    city: string;
    intro: string;
    services: SitterService[];
}
// ---------

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
    private passwordConfirm: '';

    // OWNER DATA fields
    private ownerDataOpen = false;
    private ownerData: OwnerDataTemp; // <<<--- TEMP.
    private currentPetName = '';
    private currentPetType = null;

    // SITTER DATA fields
    private sitterDataOpen = false;
    private sitterData: SitterDataTemp; // <<<--- TEMP.
    private currentPlaceOfService = PlaceOfService.OWNERS_HOME;
    private currentServicePetType = PetType.DOG;
    private currentWage = 0;

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
        // this.ownerData = {
        //     petType: null,
        //     petName: ''
        // };
        this.sitterData = {
            address: '',
            postCode: null,
            city: '',
            intro: '',
            services: []
        };
    }

    addToMyPets(): void {
        this.ownerData.pets.push({petName: this.currentPetName, petType: this.currentPetType});
        this.currentPetName = '';
        this.currentPetType = null;
        console.log(this.ownerData.pets);
    }

    addToMyServices(): void {
        this.sitterData.services.push({
            placeOfService: this.currentPlaceOfService,
            petType: this.currentServicePetType,
            pricePerHour: this.currentWage
        });
        this.currentPlaceOfService = null;
        this.currentServicePetType = null;
        this.currentWage = 0;
        console.log(this.sitterData.services);
    }

    // checkPlaceForSitter(): boolean {
    //     if (this.isSittersHomeChecked) {
    //         this.sitterData.place.push(PlaceOfService.SITTERS_HOME);
    //     }
    //     if (this.isOwnersHomeChecked) {
    //         this.sitterData.place.push(PlaceOfService.OWNERS_HOME);
    //     }
    //     return !!this.sitterData.place.length; // FALSy lesz ha üres
    // }



    submitRegistration() {
        // ha le van nyitva - ergo kitöltötte az OWNER adatokat, adja hozzá a user-hez
        // if (this.ownerDataOpen) { this.user.ownerData = this.ownerData; }


        // ha le van nyitva - ergo kitöltötte a SITTER adatokat, adja hozzá a user-hez
        if (this.sitterDataOpen) {
            // // bejelölt-e legalább egy helyszínt
            // if (!this.checkPlaceForSitter()) {
            //     // csinálni valamit ha NEM jelölt meg egyet sem!
            // }

            // this.user.sitterData = this.sitterData;
        }


        // ha a jelszó és az ismétlése nem egyezik
        if (this.user.password !== this.passwordConfirm) {
            // csinálj valamit!
            throw new Error();
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
