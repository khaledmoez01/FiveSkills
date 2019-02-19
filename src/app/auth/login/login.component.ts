import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  result;
  constructor(private apiService: AuthService) {
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
      
      });
    

  }

}
