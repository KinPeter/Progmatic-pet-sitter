import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    scrolled: boolean;

    // dummy
    private userLoggedIn: boolean;

    constructor() {
        this.userLoggedIn = true;
        this.scrolled = false;
    }

    openLoginModal(): void {
        // TODO login modal
    }

    logMeOut() {
        // TODO log out
    }

    ngOnInit(): void {
        window.addEventListener('scroll', () => { this.scrollCheck(); }, false);
    }

    private scrollCheck(): void {
        this.scrolled = window.scrollY > 0;
    }

}
