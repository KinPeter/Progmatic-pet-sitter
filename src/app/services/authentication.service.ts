import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/user';
import { LoginData } from '../interfaces/login-data';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private URL = 'http://192.168.1.210:8080';
    public currentUser: User;
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor( private http: HttpClient ) {
        this.getUserIfLoggedIn();
    }

    getUserIfLoggedIn() {
        this.http.post(this.URL + '/checkuser', {}, { withCredentials: true }).toPromise()
        .then((response: any) => {
            this.currentUser = response;
            this.isUserLoggedIn.next(true);
            // for debugging
            // console.log('%c@AuthenticationService --> getUserIfLoggedIn().then() : ', 'color:darkorange;font-weight:bold;');
            // console.log(response);
            // console.log('logged in: ' + response.name);
            // ----------------
        })
        .catch((error) => {
            this.currentUser = null;
            // for debugging
            // console.log('%c@AuthenticationService --> getUserIfLoggedIn().catch() : ', 'color:darkorange;font-weight:bold;');
            // console.log(error);
            // ----------------
        });
    }

    login(data: LoginData) {
        // login details in Form Data format
        const formData = new FormData();
        formData.append('username', data.email);
        formData.append('password', data.password);

        // send POST request with form data
        return this.http.post(this.URL + '/signin', formData, { withCredentials: true }).toPromise()
            .then((response: any) => {
                // for debugging
                // console.log('%c@AuthenticationService --> login().then() : ', 'color:darkorange;font-weight:bold;');
                // console.log('logged in: ' + response.user.name);
                // ----------------
                this.currentUser = response.user;
                this.isUserLoggedIn.next(true);
                return response;
            })
            .catch((error) => {
                this.currentUser = null;
                // for debugging
                // console.log('%c@AuthenticationService --> login().catch() : ', 'color:darkorange;font-weight:bold;');
                // console.log(error);
                // --------------
                throw error; // throw forward to login-modal-component
            });
    }

    logout() {
        this.http.post(this.URL + '/logout', {}, { withCredentials: true }).toPromise()
        .then((response: any) => {
            // console.log('%c@AuthenticationService --> logout().then() : SUCCESSFUL', 'color:darkorange;font-weight:bold;');
            // console.log(response);
        })
        .catch((error) => {
            // console.log('%c@AuthenticationService --> logout().catch() : ERROR', 'color:darkorange;font-weight:bold;');
            // console.log(error);
        })
        .finally(() => {
            this.isUserLoggedIn.next(false);
            this.currentUser = null;
            // location.reload(true);//tslint:disable-line
        });
    }
}
