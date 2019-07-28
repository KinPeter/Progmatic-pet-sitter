import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Day } from '../../interfaces/user';

@Component({
    selector: 'app-sitter-calendar',
    templateUrl: './sitter-calendar.component.html',
    styleUrls: ['./sitter-calendar.component.scss']
})
export class SitterCalendarComponent implements OnInit {

    // DUMMY lista olyan formátumban, ahogy majd a szerverről jön
    private availabilities: Day[] = [
        { id: 31, availability: 'FREE', date: '2019.07.23' }, // próbáld ki átírni az első napot, és aszerint
        { id: 32, availability: 'FREE', date: '2019.07.24' }, // tologatja el a napokat :) cooool :D
        { id: 33, availability: 'FREE', date: '2019.07.25' },
        { id: 34, availability: 'LIMITED', date: '2019.07.26' },
        { id: 35, availability: 'FREE', date: '2019.07.27' },
        { id: 36, availability: 'FREE', date: '2019.07.28' },
        { id: 37, availability: 'FREE', date: '2019.07.29' },
        { id: 38, availability: 'FREE', date: '2019.07.30' },
        { id: 39, availability: 'FREE', date: '2019.07.31' },
        { id: 40, availability: 'FREE', date: '2019.08.01' },
        { id: 41, availability: 'LIMITED', date: '2019.08.02' },
        { id: 42, availability: 'FREE', date: '2019.08.03' },
        { id: 43, availability: 'FREE', date: '2019.08.04' },
        { id: 44, availability: 'LIMITED', date: '2019.08.05' },
        { id: 45, availability: 'FREE', date: '2019.08.06' },
        { id: 46, availability: 'FREE', date: '2019.08.07' },
        { id: 47, availability: 'BUSY', date: '2019.08.08' },
        { id: 48, availability: 'BUSY', date: '2019.08.09' },
        { id: 49, availability: 'BUSY', date: '2019.08.10' },
        { id: 50, availability: 'LIMITED', date: '2019.08.11' },
        { id: 51, availability: 'FREE', date: '2019.08.12' },
        { id: 52, availability: 'FREE', date: '2019.08.13' },
        { id: 53, availability: 'FREE', date: '2019.08.14' },
        { id: 54, availability: 'FREE', date: '2019.08.15' },
        { id: 55, availability: 'FREE', date: '2019.08.16' },
        { id: 56, availability: 'FREE', date: '2019.08.17' },
        { id: 57, availability: 'BUSY', date: '2019.08.18' },
        { id: 58, availability: 'BUSY', date: '2019.08.19' },
        { id: 59, availability: 'FREE', date: '2019.08.20' },
        { id: 60, availability: 'FREE', date: '2019.08.21' },
    ];


    constructor(private auth: AuthenticationService) {
        // ha majd összeáll a rendszer, innen szedi le a listát:
        // if (auth.currentUser.sitterData) {
        //     this.availabilities = auth.currentUser.sitterData.availabilities;
        // }
    }

    ngOnInit() {
        this.setBlankStartingDays();
    }

    // a template-en az *ngFor-ban használja, eszerint kapja meg, milyen színű legyen
    getMyClass(day: Day): string {
        if (day.availability === 'FREE') {
            return 'free';
        } else if (day.availability === 'LIMITED') {
            return 'limited';
        } else if (day.availability === 'BUSY') {
            return 'busy';
        } else {
            return 'blank';
        }
    }

    // a listában megadott napok előtti és utáni napokat tölti ki, hogy a naptrában "eltolja" őket
    // a megfelelő kezdőnapra
    setBlankStartingDays(): void {
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

    // ez történik majd kattintásra, itt kéne megváltoztatni az "availability"-t
    changeMe(day: Day): void {
        // csak akkor csináljon bármit, ha nem "szürke töltelék" napra kattintott
        if (day.availability !== 'BLANK') {
            console.log(day);
            // TODO
        }

    }

    // FONTOS lesz majd, mielőtt elküldjük a változtatást a szerverre, hogy
    // kiszedjük a "BLANK" napokat a listából!


}
