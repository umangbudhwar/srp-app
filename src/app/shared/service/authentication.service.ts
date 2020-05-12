import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorsHandler } from '../common/errors-handler';
import { map } from 'rxjs/operators';
import { UserAuth } from '../model/user-auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private errorHandler: ErrorsHandler) { }

  authenticateLogin(userName, password) {

    return this.http.post<any>(`${environment.apiUrl.UserUrl.authenticate}`, { userName, password })
      .pipe(map((user: UserAuth) => {
        // login successful if there's a jwt token in the response
        if (user && user.jwt) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        return userName;
      }));
  }

  getAuthUser(): UserAuth {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  logOut() {
    sessionStorage.removeItem('currentUser');
  }
}
