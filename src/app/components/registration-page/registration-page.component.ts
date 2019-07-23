import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldValidatorService } from 'src/app/services/field-validator.service';


@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

    constructor(private router: Router) { }

    toHomeTop(): void {
        if (this.router.url === '/') {
            document.querySelector('app-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            this.router.navigate(['/']);
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
    }


    ngOnInit() {
    }

}
