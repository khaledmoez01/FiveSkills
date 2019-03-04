import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  id_user = jwt_decode(this.CookieService.get('token')).id._id
  constructor(private router: Router, private CookieService : CookieService) { }

  canActivate():  boolean {
    
    if ( this.id_user) {
      return true;
    } else {
  this.router.navigateByUrl('/login');
  return false;
}
;
 
  }
}
