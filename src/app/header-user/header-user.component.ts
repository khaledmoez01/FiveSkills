import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  constructor(private router:Router, private cookiesService : CookieService) { }

  ngOnInit() {
  }
logout() : void{
this.cookiesService.deleteAll();
this.router.navigateByUrl('/home');
window.location.reload();

}
}
