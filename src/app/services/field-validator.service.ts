import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FieldValidatorService {

    private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //tslint:disable-line

    constructor() { }

    validateEmail(emailAddress: string): boolean {
        return this.emailRegex.test(emailAddress);
    }
}
