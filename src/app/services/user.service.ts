import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { UserDTO } from '../interfaces/user-dto';
import { UserError } from '../errors/user-error';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // private readonly URL = '/my-profile-page';

    private URL = 'https://petsitter-backend.herokuapp.com';

    constructor(private http: HttpClient) { }

    private transformUserDTO(serverData: UserDTO): User[] {
        if (!serverData.success) {
            throw new UserError(serverData['error-infos']);
        }
        return serverData.users;
    }

    registerUser(user: User) {
        return this.http.post(this.URL + '/newregistration', user, { withCredentials: true }).toPromise()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // delete(id: number) {
    //     return this.http.delete(`${config.apiUrl}/users/${id}`);
    // }

    modifyUser(user: User): Promise<User[]> {
        return this.http.post<User[]>(this.URL + '/modifyprofile', user, { withCredentials: true }).toPromise();
    }

    getEnumKey(en: any, enumValue: string): string {
      let values = Object.values(en);
      let keys = Object.keys(en);
      for (let i = 0; i < values.length; i++) {
          if (values[i] == enumValue) {
            return keys[i];
          }
      }
    }

}
