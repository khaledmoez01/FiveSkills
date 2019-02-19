import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  result;
  getpara;
  constructor(private apiService: CoursesService,private router: Router) { }

  ngOnInit() {
    this.apiService.getApiatricle().subscribe(doc => {
      console.log(doc);
      this.result = doc;
   });
  }

  gotoarticle(id){
    console.log(id);
    this.apiService.setid(id);
    this.router.navigate(['/simpleuser/course/:id']); 
  }
  slice(f){
  this.getpara = f.slice(0, -500)
  return this.getpara;
  } 
}
