import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/user';
import { LoginData } from '../interfaces/login-data';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private URL = 'http://192.168.1.237:8080/signin';
    public currentUser: User;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    login(data: LoginData) {
        return this.http.post(this.URL, {email: data.email, password: data.password}).toPromise()
        .then((response: User) => {
            this.currentUser = response;
            localStorage.setItem('currentUser', JSON.stringify(response));
        })
        .catch((error) => {
            this.currentUser = null;
            console.log(error);
            // HANDLE ERROR
        });
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }
}
