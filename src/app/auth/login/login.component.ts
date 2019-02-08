import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
<<<<<<< HEAD
  constructor(private authService: AuthService) { }
=======
  constructor(private authservice:AuthService) { }
>>>>>>> 11ad6028910171c0df814b447de472ba25225efa

  ngOnInit() {
  }

  loginBtn() {
    // qsdqsd
    // qsdqsd
    // qsdqs

  }

}
