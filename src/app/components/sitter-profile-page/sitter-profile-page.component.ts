import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';
import { SitterView } from 'src/app/interfaces/sitterView';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { herokuURL } from 'src/app/app-settings';

@Component({
    selector: 'app-sitter-profile-page',
    templateUrl: './sitter-profile-page.component.html',
    styleUrls: ['./sitter-profile-page.component.scss']
})
export class SitterProfilePageComponent implements OnInit {
    private isLoading = true;
    private isUserLoggedIn = false;
    private sitter: SitterView;
    private sitterNotFound = false;
    private ratingToSend = 5;
    private showRatingSuccess = false;
    private showRatingError = false;
    private ratingFullStars: any[]; // üres helyek lesznek benne, csak *ngFor-hoz kell, hogy legyen hossza
    private ratingHalfStars: any[];
    private ratingEmptyStars: any[];
    private profilePicUrl: string;

    constructor(
        private searchData: SearchDataTransferService,
        private route: ActivatedRoute,
        private auth: AuthenticationService ) {}

    getPlaceOfService(place: string): string {
        switch (place) {
            case 'OWNERS_HOME':
                return 'Házhoz megyek';
            case 'SITTERS_HOME':
                return 'Az én otthonomban';
            default:
                return '';
        }
    }
    getPetType(type: string): string {
        switch (type) {
            case 'DOG':
                return 'Kutya';
            case 'CAT':
                return 'Macska';
            case 'BIRD':
                return 'Madár';
            case 'RODENT':
                return 'Rágcsáló';
            case 'REPTILE':
                return 'Hüllő';
            default:
                return '';
        }
    }

    setProfilePicUrl(): void {
        this.profilePicUrl = herokuURL + '/user/' + this.sitter.id + '/image';
    }

    setRatingStars() {
        const roundedRating = +(Math.round(this.sitter.averageRating * 2) / 2).toFixed(1);
        this.ratingFullStars = new Array( Math.floor(roundedRating) );
        this.ratingHalfStars = new Array( (roundedRating % 1 === 0 ? 0 : 1) );
        this.ratingEmptyStars = new Array( 5 - (this.ratingFullStars.length + this.ratingHalfStars.length) );
    }

    sendRating() {
        this.searchData.sendSitterRating(this.sitter.id, this.ratingToSend)
        .then((response) => {
            this.showRatingSuccess = true;
            setTimeout(() => {this.showRatingSuccess = false; }, 2000);
        })
        .catch((error) => {
            this.showRatingError = true;
            setTimeout(() => { this.showRatingError = false; }, 2000);
        });
    }

    ngOnInit() {
        const sitterId = this.route.snapshot.params.sitter_id;
        this.searchData.getSitterProfile(sitterId)
        .then((response) => {
            this.sitter = response;
            console.log(this.sitter);
            this.setRatingStars();
            this.setProfilePicUrl();
        })
        .catch((error) => {
            this.sitter = null;
            this.sitterNotFound = true;
        })
        .finally(() => {
            this.isLoading = false;
        });
        this.auth.isUserLoggedIn.subscribe(value => {
            this.isUserLoggedIn = value;
        });
    }

}
