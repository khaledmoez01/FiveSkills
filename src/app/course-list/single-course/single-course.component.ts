import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {
  ID:any;
  result;
  CommentForm: FormGroup;
  constructor(private apiService: CoursesService) {
    // this.CommentForm = new FormGroup({
    //   title: new FormControl('', [Validators.required]),
    //   writer: new FormControl('', [Validators.required]),
    //  contenet: new FormControl('', [Validators.required]),
    // })
   }

  ngOnInit() {
    this.ID = this.apiService.getid();
    this.apiService.getApiatriclebyid(this.ID).subscribe(doc => {
       console.log(doc);
       this.result = [doc];
    
    });

  }

}
