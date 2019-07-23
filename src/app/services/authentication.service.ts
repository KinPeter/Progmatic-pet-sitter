import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/user';
import { LoginData } from '../interfaces/login-data';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private URL = 'http://192.168.1.237:8080/signin';
    public currentUser: User;
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        if (localStorage.getItem('currentUser')) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.isUserLoggedIn.next(true);
        }
    }

    login(data: LoginData) {

        // login details in Form Data format
        const formData = new FormData();
        formData.append('username', data.email);
        formData.append('password', data.password);

        // send POST request with form data
        return this.http.post(this.URL, formData).toPromise()
            .then((response: any) => {
                // for debugging
                console.log('%c@AuthenticationService --> login().then() : ', 'color:darkorange;font-weight:bold;');
                console.log('logged in: ' + response.user.name);
                // ----------------
                this.currentUser = response.user;
                localStorage.setItem('currentUser', JSON.stringify(response.user));
                this.isUserLoggedIn.next(true);
                return response;
            })
            .catch((error) => {
                this.currentUser = null;
                // for debugging
                console.log('%c@AuthenticationService --> login().catch() : ', 'color:darkorange;font-weight:bold;');
                console.log(error);
                // --------------
                throw error; // throw forward to login-modal-component
            });
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.isUserLoggedIn.next(false);
        this.currentUser = null;
        location.reload(true);//tslint:disable-line
    }
}
