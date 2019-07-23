import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-wannabe-sitter-page',
    templateUrl: './wannabe-sitter-page.component.html',
    styleUrls: ['./wannabe-sitter-page.component.scss']
})
export class WannabeSitterPageComponent implements OnInit {
    private userLoggedIn: boolean;

    constructor( private auth: AuthenticationService ) {
        this.auth.isUserLoggedIn.subscribe(value => {
            this.userLoggedIn = value;
        });
    }

    ngOnInit() {
    }

}
