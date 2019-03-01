import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  students:any;
  teachers:any;
  res:any;
  srcr='x'
  constructor(private DashboardService:DashboardService) { }

  ngOnInit() {
    this.DashboardService.getUsersStudents().subscribe(async resultU=>{
      this.students=resultU;
    })
    this.DashboardService.getUsersTeachers().subscribe(async resultU=>{
      this.teachers=resultU;


    })

  }
  suppT(teacher){
    console.log(teacher);
    var r = confirm("Are you sure you want to delete this user?");
    if (r == true) {
    this.DashboardService.deleteUser(teacher._id).subscribe(async rf=>{
        this.res=rf;
    })
  } 
  this.ngOnInit();
  }


  suppS(student){
    console.log(student);
    var r = confirm("Are you sure you want to delete this user?");
    if (r == true) {
    this.DashboardService.deleteUser(student._id).subscribe(async rf=>{
        this.res=rf;
    })
  } 
  this.ngOnInit();
  }


  openImage(teacher){
    this.srcr=teacher.user_image
  }
  closeimg(){
    this.srcr='x';
    
  }

}
