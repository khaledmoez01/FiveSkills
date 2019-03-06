import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
route="";

  constructor( private cookiesService : CookieService) { }

  ngOnInit() {
      
  
  }
  changeRoute(){
    this.route="Courses";
  }

  logout(){
    console.log("fffff")
    this.cookiesService.deleteAll();
  }

}
