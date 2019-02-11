import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // import http
  constructor(private http: HttpClient) { }

  login(form) {
    // login to consume API call
    //
  }
}
