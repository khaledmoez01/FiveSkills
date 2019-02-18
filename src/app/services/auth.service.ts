import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // import http
  constructor(private http: HttpClient) { }

  signup(user): Observable<any>  {
  
      return this.http.post('http://localhost:3000/signup', user);
   
  }
}
