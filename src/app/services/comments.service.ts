import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  ID: any;
  id:any;
  constructor(private http: HttpClient) { }
  addarticle(Comment,ID,id): Observable<any> {
    return this.http.post(`http://localhost:3000/user/comment/create/${ID}${id}`,Comment);
  }
}
