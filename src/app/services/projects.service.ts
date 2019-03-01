import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  ID: any;
  IDp:any;

  setid(id) {
    this.ID = id;
  }
  getid() {
    return this.ID;
  }


  constructor(private http: HttpClient) { }

  addproject(ID,id_user,Project): Observable<any> {
    console.log('cccc',id_user) ;
     return this.http.post(`http://localhost:3000/student/project/create/${ID}/${id_user}`,Project);
  }

  getApiproject(){
    return this.http.get('http://localhost:3000/student/projets');
  }

  getApiprojectbyid(ID){
    return this.http.get(`http://localhost:3000/student/projets/${ID}`);
  }
  StudentVoteProject(id_user,id_project){
    return this.http.get(`http://localhost:3000/student/project/vote/${id_user}/${id_project}`)
  }
  UnfollowCourse(id_user){
    return this.http.get(`http://localhost:3000/student/course/unfollow/${id_user}`)
  }
  studentdeleteVote(id_user,id_project){
    return this.http.get(`http://localhost:3000/student/project/unvote/${id_user}/${id_project}`)
  }
}
