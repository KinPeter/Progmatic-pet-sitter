import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    // dummy
    private userLoggedIn: boolean;

    constructor() {
        this.userLoggedIn = true;
    }

    openLoginModal(): void {
        // TODO login modal
    }

    logMeOut() {
        // TODO log out
    }

    ngOnInit() {

    }

}
