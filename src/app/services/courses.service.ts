import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  result: any;
  ID: any;
  setid(id) {
    this.ID = id;
  }
  getid() {
    return this.ID;
  }
  constructor(private http: HttpClient) { }

 getApiatricle() {
    return this.http.get('http://localhost:3000/user/courses');
  }

  getApiatriclebyid(ID) {
    return this.http.get(`http://localhost:3000/user/course/${ID} `);

  }
}
