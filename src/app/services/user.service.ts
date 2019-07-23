import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { UserDTO } from '../interfaces/user-dto';
import { UserError } from '../errors/user-error';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly URL = '/my-profile-page';

    constructor(private http: HttpClient) {}

    private transformUserDTO(serverData: UserDTO ): User[]{
      if (!serverData.success){
        throw new UserError(serverData['error-infos']);
      }
      return serverData.users;
    }

    // register(user: User) {
    //     return this.http.post(`${config.apiUrl}/users/register`, user);
    // }

    // delete(id: number) {
    //     return this.http.delete(`${config.apiUrl}/users/${id}`);
    // }

    modifyUser (user: User): Promise<User []> {
    return this.http.put(this.URL + '?id=' + user.id, {user}, {withCredentials: true})
    .toPromise().then(this.transformUserDTO);
    }

}
