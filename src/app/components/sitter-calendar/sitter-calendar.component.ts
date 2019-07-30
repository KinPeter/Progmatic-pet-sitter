import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';
import { Day } from '../../interfaces/user';
import { SitterView } from 'src/app/interfaces/sitterView';

@Component({
    selector: 'app-sitter-calendar',
    templateUrl: './sitter-calendar.component.html',
    styleUrls: ['./sitter-calendar.component.scss']
})
export class SitterCalendarComponent implements OnInit {

    // flag, ami azt állítja, hogy mely funckiók működjenek:
    // TRUE: ha keresés után egy Sitter profilját nézegetjük
    // FALSE: ha a Sitter a saját profilját -> naptárját szerkeszti épp
    @Input() isComingFromSitterProfile = false;

    @Input() viewedSitter: SitterView;

    private availabilities: Day[];

    constructor(
        private auth: AuthenticationService,
        private data: SearchDataTransferService
    ) {}

    ngOnInit() {
        this.availabilities = this.viewedSitter.availabilities;
        this.setBlankDays();
        // console.log(this.availabilities);
    }

    // a template-en az *ngFor-ban használja, eszerint kapja meg, milyen színű legyen
    getMyClass(day: Day): string {
        switch (day.availability) {
            case 'FREE':
                return 'free';
            case 'LIMITED':
                return 'limited';
            case 'BUSY':
                return 'busy';
            default:
                return 'blank';
        }
    }

    // a listában megadott napok előtti és utáni napokat tölti ki, hogy a naptrában "eltolja" őket
    // a megfelelő kezdőnapra
    private setBlankDays(): void {
        // megnézi, milyen napra esik az első nap a listában
        const firstDayInList: number = new Date(this.availabilities[0].date).getDay();
        // Day objektum a szürke töltelék napoknak
        const blankDay: Day = {id: -1, availability: 'BLANK', date: '1970.01.01'};

        // ha az első nap vasárnap, 6 üres nap kell előre és hátra is
        if (firstDayInList === 0) {
            for (let i = 0; i < 6; i++) {
                this.availabilities.unshift(blankDay);
                this.availabilities.push(blankDay);
            }

        // ha hétfő, akkor előre semmi, végére 5
        } else if (firstDayInList === 1) {
            for (let i = 0; i < 5; i++) { this.availabilities.push(blankDay); }

        // egyébként meg elejére firstDayInList-1 üres nap, végére 6-firstDayInList nap
        } else {
            for (let i = 0; i < firstDayInList - 1; i++) { this.availabilities.unshift(blankDay); }
            for (let i = 0; i < 6 - firstDayInList; i++) { this.availabilities.push(blankDay); }
        }
    }

    // kiszedi a BLANK napokat, hogy szerkesztés után anélkül küldhessük vissza a szerverre
    private removeBlankDays(): Day[] {
        const availabilities: Day[] = this.availabilities.filter((day) => {
            return day.availability !== 'BLANK';
        });
        return availabilities;
    }

    clickMe(day: Day): void {
        // csak akkor csináljon bármit, ha nem "szürke töltelék" napra kattintott
        if (day.availability !== 'BLANK') {
            // ha a sitter-profile oldalon vagyunk épp, és a felhasználó be van jelentkezve:
            if (this.isComingFromSitterProfile && this.auth.currentUser) {
                // üzenet küldése a Sitternek
                this.data.sendMessageToSitterWithDay(day)
                .then((response) => {
                    // üzenet elküldve!
                })
                .catch((error) => {
                    // hiba történt
                });

            // ha a profilszerkesztő oldalon vagyunk épp:
            } else if (!this.isComingFromSitterProfile && this.auth.currentUser) {
                // az adott nap szerkesztése a naptárban
                this.setAvailability(day);
                // kiszedi a BLANK napokat, hogy szerkesztés után anélkül küldhessük vissza a szerverre
                const newAvailabilities = this.removeBlankDays();
                // console.log(newAvailabilities);
            }
        }
    }

    private setAvailability(day: Day): void {
        switch (day.availability) {
            case 'FREE':
                day.availability = 'LIMITED';
                break;
            case 'LIMITED':
                day.availability = 'BUSY';
                break;
            case 'BUSY':
                day.availability = 'FREE';
                break;
            default:
                return;
        }
    }

}
