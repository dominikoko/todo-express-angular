import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const ID_KEY = "userIdentity"


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken():string{
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username:string){
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,username);
  }

  public getUsername(): string{
    return window.sessionStorage.getItem(USERNAME_KEY);
  }
  public saveUserId(id:string){
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY,id);
  }

  public getUserId(): string{
    return window.sessionStorage.getItem(ID_KEY);
  }
}
