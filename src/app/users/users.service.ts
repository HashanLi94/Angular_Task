import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiBaseURL: any = 'https://reqres.in/api/';


  constructor(private http: HttpClient) { 
  }

  saveNewUser(User) {
    return this.http.post( this.apiBaseURL+'users', User).pipe(map((result:any)=>result));
  }

  deleteUser(user) {
    return this.http.delete( this.apiBaseURL+'users/'+user.id).pipe(map((result:any)=>result));
  }

  loadPage(page) {
    return this.http.get( this.apiBaseURL +  `users?page=${page}`).pipe(map((result:any)=>result));
  }

  updateUser(user, id) {
     return this.http.put(this.apiBaseURL+'users/'+id, user).pipe(map((result:any)=>result));
  }
}
