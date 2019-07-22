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

    testUser: User = {
        name: 'Petike',
        email: 'kinp@xy.com'
    };

    constructor(private http: HttpClient) {
        if (localStorage.getItem('currentUser')) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.isUserLoggedIn.next(true);
        }
    }

    login(data: LoginData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.testUser);
                // reject('HIBA');
            }, 1500);
        })
        .then((response: User) => {
            this.currentUser = response;
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.isUserLoggedIn.next(true);
            return response;
        });
        console.log(data);
        // return this.http.post(this.URL, {email: data.email, password: data.password}).toPromise()
        // .then((response: User) => {
        //     this.currentUser = response;
        //     localStorage.setItem('currentUser', JSON.stringify(response));
        //     this.isUserLoggedIn.next(true);
        //     return response;
        // })
        // .catch((error) => {
        //     this.currentUser = null;
        //     console.log('authService error: ', error);
        //     // HANDLE ERROR
        //     return error;
        // });
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.isUserLoggedIn.next(false);
        this.currentUser = null;
        location.reload(true);//tslint:disable-line
    }
}
