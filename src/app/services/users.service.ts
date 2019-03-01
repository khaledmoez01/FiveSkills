import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  ID: any;
  constructor(private http: HttpClient) { }
  getUser(ID): Observable<any> {
    return this.http.get(`http://localhost:3000/user/user/${ID}`);
  }
  updateUser(iD,User){
    return this.http.post(`http://localhost:3000/user/user/update/${iD}`,User)
  }
}
