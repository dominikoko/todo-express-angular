import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:3000/test/user'

  constructor(private http: HttpClient) { }

  getUserContent():Observable<any>{
    return this.http.get(this.url);
  }
}
