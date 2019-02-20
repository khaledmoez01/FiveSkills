import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  ID: any;
  results: any[];

  constructor( private apiService : UsersService ,  private cookieService :CookieService) { }

  ngOnInit() {
    this.ID = jwt_decode(this.cookieService.get('token')).id._id;
    this.apiService.getUser(this.ID).subscribe(async file => {
      console.log(file);
      this.results =[file];

    })
  }

}
