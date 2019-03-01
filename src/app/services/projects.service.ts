import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http : HttpClient) { }
  UserEditProject(id_project,Project){
    return this.http.post(`http://localhost:3000/user/project/${id_project}`,Project)
  }
  UserDeleteProject(id_project,id_user,index){
    return this.http.get(`http://localhost:3000/user/project/${id_project}/${id_user}/${index}`)
  }
}
