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
    private sitterData: Sitter;
    private ownerData: Owner;
    private passwordConfirm: '';
    private isOwnersHomeChecked = false;
    private isSittersHomeChecked = false;
    private ownerDataOpen = false;
    private sitterDataOpen = false;

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
            petType: null,
            petName: ''
        };
        this.sitterData = {
            address: '',
            postcode: '',
            city: '',
            intro: '',
            place: [],
            petType: [],
            wage: 0
        };
    }

    checkPlaceForSitter(): boolean {
        if (this.isSittersHomeChecked) {
            this.sitterData.place.push(PlaceOfService.SITTERS_HOME);
        }
        if (this.isOwnersHomeChecked) {
            this.sitterData.place.push(PlaceOfService.OWNERS_HOME);
        }
        return !!this.sitterData.place.length; // FALSy lesz ha üres
    }



    submitRegistration() {
        // ha le van nyitva - ergo kitöltötte az OWNER adatokat, adja hozzá a user-hez
        if (this.ownerDataOpen) { this.user.ownerData = this.ownerData; }


        // ha le van nyitva - ergo kitöltötte a SITTER adatokat, adja hozzá a user-hez
        if (this.sitterDataOpen) {
            // // bejelölt-e legalább egy helyszínt
            // if (!this.checkPlaceForSitter()) {
            //     // csinálni valamit ha NEM jelölt meg egyet sem!
            // }

            this.user.sitterData = this.sitterData;
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
