import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    private scrolled: boolean;
    private loginModalNeeded: boolean;
    private userLoggedIn: boolean;

    constructor( private auth: AuthenticationService ) {
        // this.userLoggedIn = !!auth.currentUser;
        this.auth.isUserLoggedIn.subscribe(value => {
            this.userLoggedIn = value;
        });
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
        this.auth.logout();
    }

    ngOnInit(): void {
        window.addEventListener('scroll', () => { this.scrollCheck(); }, false);
    }

    private scrollCheck(): void {
        this.scrolled = window.scrollY > 200;
    }

    // getter/setter for Unit tests
    getUserLoggedIn(): boolean {
        return this.userLoggedIn;
    }
    setUserLoggedIn(status: boolean) {
        this.userLoggedIn = status;
    }
}
