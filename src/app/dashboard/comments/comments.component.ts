import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  allComments: any;

  constructor(private DasboadService:DashboardService) { }

  ngOnInit() {
    this.DasboadService.getComments().subscribe(async resultC =>{

      this.allComments=resultC;
      console.log(this.allComments);
    })
  }

  
  deleteComment(comment){
    console.log(comment);

    var r = confirm("Are you sure you want to delete this comment?");
   if (r == true) {
   this.DasboadService.deleteC(comment._id).subscribe(async resultD =>{
    
   })
   
   } 
   this.ngOnInit();
  }

}
