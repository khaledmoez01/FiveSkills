import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from 'src/app/services/dashboard.service';
import { async } from 'q';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  closeResult: string;
  courses: any;
  coursesInv: any;
  course:any;
  srcr='x';



  constructor(private modalService: NgbModal,private dasboardService:DashboardService ) { }

  open(content,course) {
   this.dasboardService.getCorse(course._id).subscribe(async res=>{
   this.course=res;
   })
   
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }


  openInv(content,coursesInv) {
    this.dasboardService.getCorse(coursesInv._id).subscribe(async resultInv=>{
    this.course=resultInv;
    
    })
    
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
     
   }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  

  ngOnInit() {
    this.dasboardService.getValidCourses().subscribe(async result =>{
      this.courses=result;
      console.log(this.courses)
    })

    this.dasboardService.getInvalidCorses().subscribe(async resultInv =>{
      this.coursesInv=resultInv;
      console.log(this.coursesInv)
    })

  }
  deleteCourse(course){

    var r = confirm("Are you sure you want to delete this course?");
   if (r == true) {
   this.dasboardService.deleteCourse(course._id).subscribe(async resultD =>{
    
   })
   
   } 
   this.ngOnInit();
  }
  validateCourse(course){
    console.log(course)
   this.dasboardService.validateC(course._id,course.course_teacher).subscribe(async res =>{
   })
   this.ngOnInit()
  }
  rejectCourse(course){
    this.dasboardService.rejectC(course._id).subscribe(async res =>{
    })
    this.ngOnInit()
  }


  openImage1(course){
    this.srcr=course.course_image
  }
  closeimg1(){
    this.srcr='x';
    
  }

  openImage2(courseInv){
    this.srcr=courseInv.course_image
  }
  closeimg2(){
    this.srcr='x';
    
  }

}
