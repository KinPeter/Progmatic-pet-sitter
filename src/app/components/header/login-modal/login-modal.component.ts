import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { LoginData } from 'src/app/interfaces/login-data';
import { FieldValidatorService } from 'src/app/services/field-validator.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

    @Output() closeThis = new EventEmitter();
    loginData: LoginData;
    isEmailValid: boolean;
    isPasswordValid: boolean;

    constructor( private validator: FieldValidatorService ) {
        this.loginData = {
            email: '',
            password: ''
        };
        this.isEmailValid = true;
        this.isPasswordValid = true;
     }

    closeMe() {
        this.closeThis.emit();
    }

    sendLoginData(): void {
        this.isEmailValid = this.validator.validateEmail(this.loginData.email);
        this.isPasswordValid = this.loginData.password !== '';

        if (this.isEmailValid && this.isPasswordValid) {
            console.log(this.loginData);
            this.closeMe();
        }
    }

    ngOnInit() {
    }

}
