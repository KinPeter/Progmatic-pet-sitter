import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    private scrolled: boolean;
    private loginModalNeeded: boolean;

    // dummy
    private userLoggedIn: boolean;

    constructor() {
        this.userLoggedIn = false;
        this.scrolled = false;
        this.loginModalNeeded = false;
    }

    openLoginModal(): void {
        this.loginModalNeeded = true;
    }

    closeLoginModal(): void {
        this.loginModalNeeded = false;
    }

    logMeOut(): void {
        // TODO log out
    }

    ngOnInit(): void {
        window.addEventListener('scroll', () => { this.scrollCheck(); }, false);
    }

    private scrollCheck(): void {
        this.scrolled = window.scrollY > 0;
    }

}
