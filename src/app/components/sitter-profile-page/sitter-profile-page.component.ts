import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';
import { SitterView } from 'src/app/interfaces/sitterView';
import { PlaceOfService } from 'src/app/interfaces/search-data';

@Component({
    selector: 'app-sitter-profile-page',
    templateUrl: './sitter-profile-page.component.html',
    styleUrls: ['./sitter-profile-page.component.scss']
})
export class SitterProfilePageComponent implements OnInit {
    private isLoading = true;
    private sitter: SitterView;

    constructor( private searchData: SearchDataTransferService, private route: ActivatedRoute ) {}

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

    ngOnInit() {
        const userId = this.route.snapshot.params.sitter_id;
        // console.log(userId);
        this.searchData.getSitterProfile(userId)
        .then((response) => {
            this.sitter = response;
            this.isLoading = false;
            console.log(this.sitter);
        });
    }

}
