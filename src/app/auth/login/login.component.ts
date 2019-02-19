import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  result;
  token: any;
  constructor(private apiService: AuthService , private router:Router, private cookieService : CookieService ) {
    this.loginForm = new FormGroup({
      user_email: new FormControl('', [Validators.required, Validators.email]),
      user_password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit() {

  }

  loginBtn() {
    
      this.apiService.login(this.loginForm.value).subscribe(doc => {
        console.log(doc);
        alert(doc.lvl)
        this.token = doc.token
        this.cookieService.set('token',this.token);
        console.log(this.token)
        const User_role = jwt_decode(this.token).id.user_role;
        if(User_role=== 1)
        {
          this.router.navigate(['/dashboard'])
        }
        else {
          this.router.navigate(['/home'])
        }
      });

  }

}
