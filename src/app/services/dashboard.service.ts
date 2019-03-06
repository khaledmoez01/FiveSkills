import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }


  getValidCourses(): Observable<any> {
      return this.http.get('http://localhost:3000/admin/courses');
  }

  getInvalidCorses(){
    return this.http.get('http://localhost:3000/admin/coursesInvalid')

  }

  getCorse(id){
    return this.http.get('http://localhost:3000/admin/course/'+id)

  }

  
  getProjects(): Observable<any> {
    return this.http.get('http://localhost:3000/admin/projects');
}

getComments(): Observable<any> {
  return this.http.get('http://localhost:3000/admin/comments');
}

getUsersStudents(): Observable<any> {
  return this.http.get('http://localhost:3000/admin/users/students');
}

getUsersTeachers(): Observable<any> {
  return this.http.get('http://localhost:3000/admin/users/teachers');
}

deleteCourse(courseID): Observable<any> {
  return this.http.get('http://localhost:3000/admin/course/delete/'+courseID);
}
validateC(courseID,userID){
  return this.http.get('http://localhost:3000/admin/course/validated/'+userID+'/'+courseID);
}
rejectC(courseID){
 return this.http.get('http://localhost:3000/admin/course/rejected/'+courseID);
}

deleteP(projectID): Observable<any> {
  return this.http.get('http://localhost:3000/admin/project/delete/'+projectID);
}

deleteC(commentID): Observable<any> {
  return this.http.delete('http://localhost:3000/admin/comment/delete/'+commentID);
}

nombre(): Observable<any> {
  return this.http.get('http://localhost:3000/admin');
}

deleteUser(userID): Observable<any> {
  return this.http.get('http://localhost:3000/admin/user/delete/'+userID);
}



  
}
