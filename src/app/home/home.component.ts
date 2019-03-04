import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode'
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token;
  results = [];
  constructor(private cookiesService: CookieService, private UserService: UsersService) { }

  ngOnInit() {
    if (this.cookiesService.get('token')) {
      this.token = jwt_decode(this.cookiesService.get('token'))
    }
    this.UserService.getAllUsers().subscribe((data: any) => {
      console.log(data)
      let compteur = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].user_role === 2 && compteur < 3){
        compteur++;
          this.results.push(data[i])
        }
      }
      console.log(compteur)
    })
  }
  logout() {
    this.cookiesService.deleteAll();
  }
}
