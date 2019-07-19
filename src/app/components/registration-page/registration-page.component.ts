import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

    constructor(private router: Router) { }

    toHomeTop(): void {
        this.router.navigate(['/']);
    }
    ngOnInit() {
    }

}
