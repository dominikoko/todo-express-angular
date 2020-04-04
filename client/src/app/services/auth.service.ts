import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AuthLoginInfo } from '../helpers/auth-login-info';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:3000/auth/signin';
  private signupUrl = 'http://localhost:3000/auth/signup';

  constructor(private http: HttpClient) { }

  login(credentials: AuthLoginInfo): Observable<any>{
    return this.http.post(this.loginUrl,{
      username: credentials.username,
      password: credentials.password
    },httpOptions)
  }

  registration(user): Observable<any>{
    return this.http.post(this.signupUrl,{
      username: user.username,
      email: user.email,
      password: user.password
    },httpOptions)
  }
}
