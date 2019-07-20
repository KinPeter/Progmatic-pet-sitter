import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private URL = 'http://localhost/login';
    public currentUser: User;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    login(username: string, password: string) {
        return this.http.post(this.URL, {username, password}).toPromise()
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
