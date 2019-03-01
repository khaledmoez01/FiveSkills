import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  ID: any;

  setid(id) {
    this.ID = id;
  }
  getid() {
    return this.ID;
  }

  constructor(private http: HttpClient) { }
  addcomment(Comment,ID,id_user): Observable<any> {
    console.log('cccc',id_user) ;
     return this.http.post(`http://localhost:3000/user/comment/create/${ID}/${id_user}`,Comment);
  }
  editComment(id_comment,Comment){
    return this.http.post(`http://localhost:3000/user/comment/update/${id_comment}`,Comment)
  }
  deleteComment(id_Course,id_comment){
    return this.http.get(`http://localhost:3000/user/comment/delete/${id_Course}/${id_comment}`)
  }
}
