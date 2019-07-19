import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { LoginData } from 'src/app/interfaces/LoginData';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

    @Output() closeThis = new EventEmitter();
    loginData: LoginData;

    private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //tslint:disable-line

    constructor() {
        this.loginData = {
            email: '',
            password: ''
        };
     }

    closeMe() {
        this.closeThis.emit();
    }

    isEmailValid(): boolean {
        return this.emailRegex.test(this.loginData.email);
    }


    ngOnInit() {
    }

}
