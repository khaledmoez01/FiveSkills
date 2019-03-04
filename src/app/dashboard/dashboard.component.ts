import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
route="";

  constructor() { }

  ngOnInit() {
      
  
  }
  changeRoute(){
    this.route="Courses";
  }

  logout(){
    console.log("fffff")
  }

}
