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

 getCourses() {
    return this.http.get('http://localhost:3000/user/courses');
  }

  getCoursesById(ID) {
    return this.http.get(`http://localhost:3000/user/course/${ID}`);

  }

  followcourse(id_user,ID)
  {
    return this.http.get(`http://localhost:3000/student/course/follow/${id_user}/${ID}`);
  }


  draftcourse(id_teacher,Course){
    return this.http.post(`http://localhost:3000/user/course/createdraft/${id_teacher}`,Course);   
  }
  publishecourse(id_teacher,Course){
    return this.http.post(`http://localhost:3000/user/course/createpublished/${id_teacher}`,Course);   
  }
  editCourse(id_course,Course){
    return this.http.post(`http://localhost:3000/user/course/update/${id_course}`,Course)
  }
  deleteCourse(id_course,id_user,i){
    return this.http.get(`http://localhost:3000/user/course/delete/${id_course}/${id_user}/${i}`)
  }
  studentCreateDraftCourse(id_user,Course){
    return this.http.post(`http://localhost:3000/student/course/addtodraft/${id_user}`,Course)
  }
  studentSendCoursetoValidate(id_user,Course){
    return this.http.post(`http://localhost:3000/student/course/sendtovalidate/${id_user}`,Course)
  } 
}
