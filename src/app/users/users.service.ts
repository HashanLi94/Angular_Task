import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiBaseURL: any = 'https://reqres.in/api/users/';


  constructor(private http: HttpClient) {}

  loadPage() {
    return this.http.get( this.apiBaseURL +'?page=1').pipe(map((result:any)=>result));
  }

  saveNewUser(User) {
    return this.http.post( this.apiBaseURL,User).pipe(map((result:any)=>result));
  }

  deleteUser(user) {
    return this.http.delete( this.apiBaseURL+user.id).pipe(map((result:any)=>result));
  }

  updateUser(user, id) {
     return this.http.put(this.apiBaseURL+id, user).pipe(map((result:any)=>result));
  }
}
