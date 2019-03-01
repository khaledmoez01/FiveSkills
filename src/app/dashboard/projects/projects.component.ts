import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { async } from 'q';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  allProjects:any;
 contentP:any;
  srcr='x';
  constructor(private DasboardService:DashboardService, private modalService: NgbModal) { }

  ngOnInit() {
    this.DasboardService.getProjects().subscribe(async resultP =>{
      this.allProjects=resultP;
      console.log(this.allProjects);

    })

  }

  deleteP(project){
    console.log(project);

    var r = confirm("Are you sure you want to delete this course?");
   if (r == true) {
   this.DasboardService.deleteP(project._id).subscribe(async resultD =>{
    
   })
   
   } 
   this.ngOnInit();
  }

  openWindowCustomClass(content,project) {
    this.contentP=project.project_content;
    this.modalService.open(content, { windowClass: 'dark-modal'});
  }
  openImage(project){
    this.srcr=project.project_image
  }
  closeimg(){
    this.srcr='x';
    
  }

}
