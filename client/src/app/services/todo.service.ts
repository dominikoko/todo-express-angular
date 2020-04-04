import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getAll(id){
    return this.http.get(`${this.url}/get-todo-list/${id}`);
  } 
  get(id){
    return this.http.get(this.url + `/get-task-by-id/${id}`);
  }
  create(data){
    return this.http.post(this.url + "/create-task", data);
  }
  update(id, data){
    return this.http.put(this.url + `/update-task/${id}`, data);
  }
  delete(id){
    return this.http.delete(this.url + `/delete-task/${id}`);
  }
  
}
