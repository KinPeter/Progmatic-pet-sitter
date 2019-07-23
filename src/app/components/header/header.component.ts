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
        console.log('%c@FrontPageComponent.OnInit()', 'color:darkorange;font-weight:bold');
        console.log('userLoggedIn: ', this.userLoggedIn);
        if (this.userLoggedIn) { console.log(this.auth.currentUser); }
    }

    private scrollCheck(): void {
        this.scrolled = window.scrollY > 200;
    }

}
